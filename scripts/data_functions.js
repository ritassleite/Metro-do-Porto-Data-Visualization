/* GRAPH FUNCTIONS */ 

// Find stationd ID by name
function findID(graph, station){
  for (let n of graph['nodes']){
    if (n.Origin == station){
      return n.id
    }
  }
}

// Check if a link is a special edge or not
function specialEdgeQ (edges,link) {
  for (e of edges){
    if (e[0] == link[0] && e[1] == link[1]) {return true;}
  }
  return false;
}

// Find which stations are connected to a certain station
function offspring(edges,o){
  var offs = new Array;
  var rem_edges = new Array;
  for (e of edges){
    if (e[0]==o || e[1]==o){
      e[0]==o ? offs.push(e[1]) : offs.push(e[0])
      rem_edges.push(e)
    }
  }
  for (r of rem_edges)
    edges.splice(edges.indexOf(r),1)
  return offs;
}

// Create a directed tree starting on a certain station
function createDirectedTree(graph, origin){
  var edges = new Array;
  for (let e of graph['links']){
    edges.push([e.source,e.target])
  }
  var res = new Array;
  var queue = [origin];
  while (queue.length != 0){
    current = queue.shift()
    offs = offspring(edges,current);
    for (n of offs){
      res.push([current,n])
      queue.push(n)
    }
  }
  return res;
}

// Find the (directed) path between stations A and B
function findPath(graph,stA,stB){
  o = findID(graph,stA)
  d = findID(graph,stB)
  var tree = createDirectedTree(graph,o)
  var path = new Array;
  n = d;
  while (n!=o){
    edge = tree.filter((e) => e[1]==n)[0]
    n = edge[0]
    path.unshift(edge)
  }
  return path
}

// Find the stations that lie in the path between A and B (including)
function findStations(graph,stA,stB){
  path = findPath(graph,stA,stB)
  ids = new Array;
  for (p of path){
    ids.push(p[0])
  }
  ids.push(findID(graph,stB))
  return ids
}

// Formats the path in order to match the links in graph.json
function formatPath(path){
  for (p=0; p<path.length; p++){
    if (path[p][0]>path[p][1]){
      path[p] = [path[p][1],path[p][0]]
    }
  }
  return path
}


/* DATASET FUNCTIONS */

// Ideal scenario: input month/year as an (int) id; if stA/stB/months are not selected, input as "null"
// Gets the observations according to our filtering
// Output: SINGLE ARRAY WITH ALL RELEVANT LINES
function getObservations(data, graph, stA, stB, months){
  
  var use = data

  // Filter per month
  if (months != "null"){
    var res = new Array;
    // Divide data per months
    var month = new Array;
    var div_year = d3.group(use, (d) => d.Year)  
    for (let value of div_year.values()){
      var div_month = d3.group(value, (d) => d.Month)
      for (let m of div_month.values()) {month.push(m)}  
    }
    var sep = months.map((d) => month[d])
    for (m of sep) {
      for (line of m) {
        res.push(line)
      }
    }
    use = res
  }

  // Filter per stations
  if (stA != "null" && stB != "null"){
    var res = new Array;
    var path_ids = findPath(graph, stA, stB)
    var div_sta = d3.group(use, (d) => d.A) 
      for (p of path_ids) {
        to_add = Array.from(div_sta.values()).filter((d) => {
          d = d[0];
          return (findID(graph, d.A) == p[0] && findID(graph, d.B) == p[1]) || (findID(graph, d.B) == p[0] && findID(graph, d.A) == p[1]);})[0]
        if (to_add){
          for (line of to_add) {
            res.push(line)
          }
        }
      }  
  }
  return res;
}

// Gets data to chart about passengers
function getData_lineChart(data, path){
  var passengers_data = new Array;
  var ABorBA = new Array;
  for (link of path){
    if (link[0]>link[1]) {
      ABorBA.push('BA')
    } else {
      ABorBA.push('AB')
    }
  }
  var div_sta = d3.group(data, (d) => d.A)
  var path = 0;
  var byMonth = Array.from(Array(37), () => new Array);
  for (let sta of div_sta.values()){
    var month = 0;
    var div_year = d3.group(sta, (d) => d.Year)
    for (let y of div_year.values()){
      var div_month = d3.group(y, (d) => d.Month)
      for (let m of div_month.values()){
        if (ABorBA[path]=='AB'){
          for (let line of m) {
            byMonth[month].push(parseInt(line.Passengers_AB))
          }
        } else {
          for (let line of m) {
            byMonth[month].push(parseInt(line.Passengers_BA))
          }
        }
        month++
      }
    }
    path++
  }
  for (let i=0; i<byMonth.length; i++){
    passengers_data.push(d3.mean(byMonth[i]))
  }
  return passengers_data
}

// Gets data of Radar Chart: [tramtrain_plot, eurotram_plot]
function getData_radarChart (data, path) {
  var tramtrain_plot = new Array;
  var eurotrain_plot = new Array;
  var byHour_tram = new Array(19).fill(0) 
  var byHour_euro = new Array(19).fill(0) 
  var byHour_euroSum = 0
  var byHour_tramSum = 0
  if (path!="null") {
    var ABorBA = new Array;
    for (link of path){
      if (link[0]>link[1]) {
        ABorBA.push('BA')
      } else {
        ABorBA.push('AB')
      }
    }
    var div_sta = d3.group(data, (d) => d.A)
    var i = 0;
    for (let sta of div_sta.values()) {
      var hour = 0;
      var div_hour = d3.group(sta, (d) => d.Hours)
      for (let m of div_hour.values()){
        for (let line of m){
          if (ABorBA[i] == "AB"){
            byHour_tram[hour] += parseInt(line.TramTrain_AB)
            byHour_euro[hour] += parseInt(line.EuroTram_AB)
            byHour_tramSum += parseInt(line.TramTrain_AB)
            byHour_euroSum += parseInt(line.EuroTram_AB)
          } else {
            byHour_tram[hour] += parseInt(line.TramTrain_BA)
            byHour_euro[hour] += parseInt(line.EuroTram_BA)
            byHour_tramSum += parseInt(line.TramTrain_BA)
            byHour_euroSum += parseInt(line.EuroTram_BA)
          }
        }
        hour++
      }
      i++
    }
  } else {
    hour = 0;
    var div_hour = d3.group(data, (d) => d.Hours)
    for (let m of div_hour.values()){
      for (let line of m){
        byHour_tram[hour] += parseInt(line.TramTrain_Total)
        byHour_euro[hour] += parseInt(line.EuroTram_Total)
        byHour_tramSum += parseInt(line.TramTrain_Total)
        byHour_euroSum += parseInt(line.EuroTram_Total)
      }
      hour++;
    }
  }
  if (byHour_euroSum == 0) {
    eurotrain_plot = new Array(19).fill(0)
  } else {
    eurotrain_plot = byHour_euro.map((d) => d/byHour_euroSum)
  }
  if (byHour_tramSum == 0) {
    tramtrain_plot = new Array(19).fill(0)
  } else {
    tramtrain_plot = byHour_tram.map((d) => d/byHour_tramSum)
  }
  return [eurotrain_plot, tramtrain_plot]
}

// Gets the data for the initial transit map
// Output: Array with the length of links with 3 elements each: station A, station B and occupancy rate
function getData_All_transitMap (data, graph) {
  var res = new Array;
  var div_stations = d3.group(data, (d) => d.A)
  for (let station of div_stations.values()){
    add_to = [findID(graph, station[0].A),findID(graph, station[0].B)]
    var value = 0
    var n = 0
    for (let line of station) {
      value += parseFloat(line.Occupancy_AB) + parseFloat(line.Occupancy_BA)
      n += 2
    }
    res.push(add_to.concat([value/n]))
  }
  return res;
}

function getData_transitMap (data, graph, path) {
  var ABorBA = new Array;
    for (link of path){
      if (link[0]>link[1]) {
        ABorBA.push('BA')
      } else {
        ABorBA.push('AB')
      }
    }
  var res = new Array;
  var div_stations = d3.group(data, (d) => d.A)
  var i = 0;
  for (let station of div_stations.values()){
    add_to = [findID(graph, station[0].A),findID(graph, station[0].B)]
    var value = 0
    var n = 0;
    for (let line of station) {
      if (ABorBA[i]=='AB') {
        value += parseFloat(line.Occupancy_AB)
      } else {
        value += parseFloat(line.Occupancy_BA)
      }
      n++;
    }
    res.push(add_to.concat([value/n]))
    i++;
  }
  return res;
}

// Output: Matrix with number of passengers (abs value), rows represent years and columns repr hours
function getData_sankeyDiagram(data, path){
  var ABorBA = new Array;
  for (link of path){
    if (link[0]>link[1]) {
      ABorBA.push('BA')
    } else {
      ABorBA.push('AB')
    }
  }
  var year_hour_matrix = Array(4).fill().map(() => Array(19).fill(0));
  var p = 0;
  var div_sta = d3.group(data, (d) => d.A)
  for (sta of div_sta.values()){
    var div_year = d3.group(sta, (d) => d.Year)
    var y = 0
    for (year of div_year.values()){
      var div_hours = d3.group(year, (d) => d.Hours)
      var h = 0
      for (hour of div_hours.values()){
        for (line of hour){
          if (ABorBA[p] == "AB") {add = parseInt(line.Passengers_AB)}
          else {add = parseInt(line.Passengers_BA)}
          year_hour_matrix[y][h] += add
        }
        h++
      }
      y++
    }
  }
  return year_hour_matrix
}


function getData_All_sankeyDiagram(data){
  var year_hour_matrix = Array(4).fill().map(() => Array(19).fill(0));
  var div_sta = d3.group(data, (d) => d.A)
  for (sta of div_sta.values()){
    var div_year = d3.group(sta, (d) => d.Year)
    var y = 0
    for (year of div_year.values()){
      var div_hours = d3.group(year, (d) => d.Hours)
      var h = 0
      for (hour of div_hours.values()){
        for (line of hour){
          add = parseInt(line.Passengers_Total)
          year_hour_matrix[y][h] += add
        }
        h++
      }
      y++
    }
  }
  return year_hour_matrix
}
