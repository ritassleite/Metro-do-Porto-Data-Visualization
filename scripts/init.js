// STATIC DATA
const covid_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,240,321,288,224,584,2121,5226,3730,9898,3002]
const passengers_all = [22512.519897304235, 20639.263157894737, 22963.98267008986, 22514.63029525032, 26199.90115532734, 23643.94030808729, 22267.31129653402, 19291.856867779203, 23414.813863928113, 27446.694480102695, 25251.356225930682, 21962.000641848525, 22721.03401797176, 22757.32413350449, 25483.560333761234, 25715.426829268294, 30510.720154043647, 25952.950577663672, 27547.275994865213, 23734.452503209242, 28296.78947368421, 32951.62066752247, 29365.76572528883, 27724.231707317074, 28321.162387676508, 27678.5, 12347.851732991014, 6320.806161745828, 10946.757381258023, 14817.309370988447, 14092.903722721438, 16345.589858793324, 17537.111039794607, 14270.96084724005, 12806.95378690629, 10861.937740693196, 6387.4390243902435]
const tramtrain_all = [0.03392433898864636, 0.03109785633516313, 0.05924056866136738, 0.06936354887896479, 0.0674881881038937, 0.059458707690427486, 0.05545969055604819, 0.055883667914030405, 0.0563875998229096, 0.05622729392433701, 0.05700590840323322, 0.06357825184632021, 0.0690703160595461, 0.07019682211411934, 0.06421114270825903, 0.04782541973411243, 0.031878256399563244, 0.025983344256817986, 0.025719077602240393]
const eurotram_all = [0.03372815399427592, 0.03357579525499809, 0.05773213866920179, 0.06867388080807205, 0.06829233541252626, 0.05956149119394923, 0.056815791150192245, 0.05689880521114781, 0.057126295666651054, 0.05791213550329295, 0.05905592358954795, 0.06507703719823155, 0.06934642441128239, 0.06995401350285563, 0.06756152232422209, 0.04512871844000216, 0.02615381936768928, 0.02377978684443649, 0.023625931457425087]
const allGroupMonths = ["Jan 2018", "Feb 2018", "Mar 2018", "Apr 2018", "May 2018", "Jun 2018", "Jul 2018", "Aug 2018", "Sep 2018", "Oct 2018", "Nov 2018", "Dec 2018", "Jan 2019", "Feb 2019", "Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020", "Mar 2020", "May 2020", "Jun 2020", "Jul 2020", "Aug 2020", "Sep 2020", "Oct 2020", "Nov 2020", "Dec 2020", "Jan 2021", "Feb 2021"]
const data_sankey_all = [[6078999, 8286024, 30849124, 42609837, 28723552, 21382729, 19916798, 22357919, 26801747, 24781422, 25010184, 29040683, 39674134, 42321646, 27122356, 14662615, 9043597, 8057050, 6572270],
                         [6921547, 10035902, 35836786, 47820707, 32339864, 24560430, 22809756, 25381259, 30883494, 29730471, 30736417, 35208824, 47077537, 48757829, 30738382, 16694812, 10290483, 9312128, 7725247],
                         [2973068, 7221406, 20932932, 24873773, 17354853, 13595288, 12801141, 14722566, 17543934, 16991721, 17479022, 19390427, 25510153, 25240324, 15440835, 8184427, 4933387, 4611580, 3606205],
                         [197788, 1069771, 2506558, 2523431, 1670065, 1351883, 1307871, 1602378, 1873855, 1618580, 1656633, 1884815, 2553320, 2288092, 1204411, 632427, 359031, 365593, 208027]]
const data_transit_all = [[0, 1, 3.055028449502133], [1, 2, 5.314025604551918], [2, 3, 6.482432432432435], [3, 4, 7.568911806543388], [4, 5, 9.711699857752501], [5, 6, 11.138862019914649], [6, 7, 14.339694167852073], [7, 8, 14.861877667140805], [8, 9, 15.3172972972973], [9, 10, 17.886322901849216], [10, 11, 10.847425320056908], [11, 12, 14.43748221906116], [12, 13, 15.42027027027027], [13, 14, 19.14571834992889], [14, 15, 23.182254623044095], [15, 16, 27.35273115220485], [16, 17, 26.70486486486489], [17, 18, 25.4581507823613], [18, 19, 22.33110241820768], [19, 20, 20.82719061166427],
                          [20, 21, 19.93384779516357], [21, 22, 18.96822190611661], [22, 23, 16.91049075391181], [23, 24, 19.4293669985775], [24, 25, 18.725746799431015], [25, 26, 18.233349928876205], [26, 27, 16.97266714082503], [27, 28, 16.15317923186345], [28, 29, 12.153108108108114], [29, 30, 5.8250640113798005], [30, 31, 3.2166714082503547], [31, 82, 0.8490896159317218], [32, 33, 16.65953769559033], [33, 34, 16.091344238975818], [34, 35, 15.717724039829308], [35, 36, 15.52269559032719], [36, 37, 15.425170697012806], [37, 38, 18.33571123755334], [38, 39, 16.534815078236125], [39, 40, 15.940668563300171],
                          [40, 41, 15.437994310099596], [41, 42, 15.321251778093886], [42, 43, 15.179530583214795], [43, 44, 13.719338549075404], [44, 45, 13.18439544807965], [45, 46, 13.069907539118063], [46, 47, 12.32807965860598], [47, 48, 12.40422475106685], [48, 49, 12.23019914651493], [49, 50, 11.856145092460881], [50, 51, 9.04231863442389], [51, 52, 8.800512091038398], [52, 53, 7.082596017069699], [53, 83, 6.743641536273116], [54, 55, 18.310284495021328], [55, 56, 17.872389758179242], [56, 57, 17.079132290184905], [57, 58, 16.55175675675679], [58, 59, 15.968293029871953], [59, 60, 15.247688477951652],
                          [60, 61, 13.733684210526311], [61, 62, 9.30171408250355], [62, 63, 8.420490753911807], [63, 64, 7.771621621621622], [64, 84, 4.729772403982928], [65, 66, 8.21400426742532], [66, 67, 11.886159317211945], [67, 68, 18.833079658605985], [68, 69, 21.536109530583197], [69, 70, 23.816031294452365], [70, 71, 25.438001422475132], [71, 72, 30.616657183499267], [72, 73, 32.88595305832149], [73, 74, 25.986586059743953], [74, 75, 24.66514935988621], [75, 76, 19.429786628733975], [76, 77, 16.823833570412525], [77, 78, 15.026500711237558], [78, 79, 11.701721194879088], [79, 85, 6.31378378378378], [80, 81, 11.890000000000015], [81, 86, 10.680640113798011]]
const specialEdges = [[37,80],[33,55],[15,73],[23,54],[23,32]]

Promise.all([d3.json("data/graph.json"), d3.csv("data/G20_Dataset.csv")]).then(([tree, data_source]) => {
  
  var graph = tree;
  var allGroupStation = d3.map(graph.nodes, function(d){return(d.Origin)});
  var data = data_source;

  d3
    .select("#selectButton1")
    .style("background-color", "#e6ebe9")
    .selectAll('myOptions')
    .data(["Select station A"].concat(allGroupStation))
    .attr("width",1000)
    .enter()
    .append('option')
    .text((d) => d) 
    .attr("value", (d) => d);

  d3
    .select("#selectButton2")
    .style("background-color", "#e6ebe9")
    .selectAll('myOptions')
    .data(["Select station B"].concat(allGroupStation))
    .enter()
    .append('option')
    .text((d) => d) 
    .attr("value", (d) => d);

  d3
    .select("#Reset_Time")
    .style("background-color", "#e6ebe9")
    .text("Reset");

  d3
    .select("#Dark")
    .style("background-color", "#e6ebe9")
    .text("Theme");

  d3
    .select("#title")
    .text("METRO DO PORTO");
    
  d3
    .select("#subtitle")
    .text("Life in motion...");

  tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("left",300)
    .style("top",300 );

  info_tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "info_tooltip")
    .style("opacity", 0)
    .style("left",300)
    .style("top",300);

  startVis(graph, data);
})

function startVis(graph, data){
    createMap(graph);
    myRadarChart([eurotram_all,tramtrain_all], true);
    markPath(graph, data, data_transit_all, "null", "null", "null", true);
    mySankey(data_sankey_all, true)
    myLineChart([passengers_all,covid_data], true);
}

function updateVis(){
  Promise.all([d3.json("data/graph.json"), d3.csv("data/G20_Dataset.csv")]).then(([tree, data_source]) => {
    var graph = tree;
    var data = data_source;
    var staA = d3.select("#selectButton1").property("value") != "Select station A" ? d3.select("#selectButton1").property("value") : "null";
    var staB = d3.select("#selectButton2").property("value") != "Select station B" ? d3.select("#selectButton2").property("value") : "null";
    var mon = selected_dots;
    if (staA!="null" && staB!="null"){
      var link = [findID(graph,staA),findID(graph,staB)].sort((a,b) => a-b)
      if (staA==staB || specialEdgeQ(specialEdges,link)){
        window.alert("They're the same station! Please select different stations!")
        return
      } else {
        var path = findPath(graph,staA,staB)
        myLineChart([getData_lineChart(getObservations(data,graph,staA,staB,"null"), path),covid_data],false);
        cleanMap()
        if (mon.length==0) {
          myRadarChart(getData_radarChart(getObservations(data,graph,staA,staB,"null"), path), false)
          markPath(graph, data, data_transit_all, staA, staB, "null", false);
          markStations(graph, staA, staB);
        } else {
          myRadarChart(getData_radarChart(getObservations(data,graph,staA,staB,mon), path), false);
          markPath(graph, data, data_transit_all, staA, staB, mon, false);
          markStations(graph, staA, staB);
        }
        
        mySankey(getData_sankeyDiagram(getObservations(data,graph,staA,staB,"null"), path), false);
      }
    } else {
      myLineChart([passengers_all, covid_data],false);
      cleanMap()
      if (mon.length==0){
        myRadarChart([eurotram_all,tramtrain_all], false)
        markPath(graph, data, data_transit_all, staA, staB, "null", false);
      } else {
        myRadarChart(getData_radarChart(getObservations(data,graph,"null","null",mon),"null"),false)
        markPath(graph, data, data_transit_all, staA, staB, mon, false);
      }
      markStations(graph, staA, staB);
      mySankey(data_sankey_all, false)
    }
  })
}

function Brushing_Update(month_list){
  Promise.all([d3.json("data/graph.json"), d3.csv("data/G20_Dataset.csv")]).then(([tree, data_source]) => {
    var graph = tree;
    var data = data_source;
    var staA = d3.select("#selectButton1").property("value") != "Select station A" ? d3.select("#selectButton1").property("value") : "null";
    var staB = d3.select("#selectButton2").property("value") != "Select station B" ? d3.select("#selectButton2").property("value") : "null";
    if (month_list.length!=0) {
      if (staA!="null" && staB!="null"){
        var link = [findID(graph,staA),findID(graph,staB)].sort((a,b) => a-b)
        if (staA==staB || specialEdgeQ(specialEdges,link)){
          window.alert("They're the same station! Please select different stations!")
          return
        } else {
          myRadarChart(getData_radarChart(getObservations(data,graph,staA,staB,month_list),findPath(graph,staA,staB), false));
          cleanMap()
          markPath(graph, data, data_transit_all, staA, staB, month_list, false);
          markStations(graph, staA, staB);
        }
      } else {
        myRadarChart(getData_radarChart(getObservations(data,graph,"null","null",month_list),"null"),false);
        cleanMap()
        markPath(graph, data, data_transit_all, staA, staB, month_list, false);
        markStations(graph, staA, staB);
      }
    } else {
      if (staA!="null" && staB!="null"){
        var link = [findID(graph,staA),findID(graph,staB)].sort((a,b) => a-b)
        if (staA==staB || specialEdgeQ(specialEdges, link)){
          window.alert("They're the same station! Please select different stations!")
          return
        } else {
          myRadarChart(getData_radarChart(getObservations(data,graph,staA,staB,"null"),findPath(graph,staA,staB)), false);
          cleanMap()
          markPath(graph, data, data_transit_all, staA, staB, "null", false);
          markStations(graph, staA, staB);
        }
      } else {
        myRadarChart([eurotram_all,tramtrain_all],false);
        cleanMap()
        markPath(graph, data, data_transit_all, "null", "null", "null", false);
        markStations(graph, staA, staB);
      }
    }
  })  
}

function ResetVis(){
  selected_dots=[];
  d3.select("div#lineChart").select(".selection").attr("width",0)
  d3.select("div#lineChart").selectAll("circle").style("stroke-width",0)
  Brushing_Update([]);
}