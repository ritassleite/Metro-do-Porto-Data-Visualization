listings=[];
selected_dots=[];

var color_scale =d3.scaleOrdinal()
.domain([0,1])
.range([current_passengers, current_covid]);

// Input data as [passengers_array, covid_data]
function myLineChart(data, newQ){

  // Define margins, width and height
  var margin = {top: 0, bottom: 20, left: 50, right: 20};
  var width = 700;
  var height = 280;

  if (newQ) {
    d3.select("div#lineChart")
      .append("svg")
      .attr("width", width + 100 + margin.left + margin.right)
      .attr("height", height + 200 + margin.top + margin.bottom);
  }

  const svg = d3
    .select("#lineChart")
    .select("svg");
  
  if (newQ) {
    svg.append("g").attr("class", "lineXAxis");
    svg.append("g").attr("class", "lineYAxis");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "covid_line").append("path");
    svg.append("g").attr("class", "passengers_line").append("path")
    svg.append("g").attr("class", "info_line")

    //Append info tooltip
    svg.selectAll("g.info_line")
      .append("image")
      .attr("class", "help")
      .attr('x', 683)
      .attr('y', 33)
      .attr("height", 25)
      .attr("width", 25)
      .attr("xlink:href", "I_light.png")
      .on("mouseover", MouseOverInfo)
      .on("mouseleave", MouseLeaveInfo)
      .on("click", ClickLineInfo)
      .transition()
      .duration(1000)
      .style("opacity", "100%");

    svg
      .append("g")
      .attr("class", "title")
      .append("text")
      .text("Evolution of passengers through time")
      .style("font-size", 30)
      .style("font-family", "Trebuchet MS")
      .attr("font-weight", 900)
      .attr('x', 150)
      .attr('y', 55)
      .style("fill", current_axis);


    // Append axis labels
    svg.select("g.labels")
      .append('text')
      .attr('x', -300)
      .attr('y', 30)
      .attr('fill', current_axis)
      .attr("transform", "rotate(-90)")
      .text("Passengers").style("font-size", 25)

    svg.select("g.labels")
      .append('text')
      .attr('x', 400)
      .attr('y', 475)
      .text("Months").style("font-size", 25)
      .attr('fill', current_axis)

    // Append color labels
    svg.select("g.labels")
      .append('rect')
      .attr('x', 150)
      .attr('y', 90)
      .attr('width', 20)
      .attr('height', 20)
      .attr('stroke', 'black')
      .attr('fill', "#20c1af")
      .attr('class','passengers_label');

    svg.select("g.labels")
      .append('text')
      .attr('x', 180)
      .attr('y', 107)
      .text("Number of Passengers").style("font-size", 20)
      .attr('fill', 'black')  

    svg.select("g.labels")
      .append('rect')
      .attr('x', 450)
      .attr('y', 90)
      .attr('width', 20)
      .attr('height', 20)
      .attr('stroke', 'black')
      .attr('fill',"#950000")
      .attr('class','covid_label');

    svg.select("g.labels")
      .append('text')
      .attr('x', 480)
      .attr('y', 107)
      .text("COVID-19 Cases").style("font-size", 20)
      .attr('fill', 'black')  

  }

  // Change label colours
/*
  svg.selectAll("g.labels")
    .selectAll('text')
    .attr('fill', 'steelblue')*/

  // x axis
  var x = d3.scaleLinear()
    .domain([0,36])
    .range([50,width+50]);

  
  // y axis
  var y = d3.scaleLinear()
    .domain([0,1.1*d3.max([d3.max(data[0]),d3.max(data[1])])])
    .range([120+height,120]);


  // Appending both axis in one call actually doesn't work!
  svg.select("g.lineYAxis").attr("transform", `translate(100,0)`)
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y));
  svg.select("g.lineYAxis").selectAll("line").style('stroke',current_axis);
  svg.select("g.lineYAxis").selectAll("text").style('fill',current_axis);

  svg.select("g.lineXAxis")
    .attr("transform", `translate(50,${height+120})`)
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x)
      .ticks(37)
      .tickFormat((d) => allGroupMonths[d]))
    .selectAll("text")
      .attr("transform", "rotate(90) translate(30,-12)")
  
  /*var color_scale =d3.scaleOrdinal()
    .domain([0,1])
    .range([current_passengers, current_covid]);*/

  // Create the line method for each data subset
  var myPath = d3.line()
    .x((d,i) => x(i)+50)
    .y((d) => y(d))
      
  data.forEach(t => {
    
    if (data.indexOf(t)==0) {u = svg.select("g.passengers_line")}
    else {u = svg.select("g.covid_line")}

    u
      .select("path") 
      .datum(t)
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("stroke", color_scale(data.indexOf(t)))
      .attr("stroke-width", 1.5)
      .attr("d", myPath(t))  
  });

  // Append and update circles
  var merged = data[0].concat(data[1])
  svg
    .select("g.passengers_line")
    .selectAll("circle")
    .data(merged)
    .join(
      (enter) => {
        return enter                  
          .append("circle")
          .attr("cx", (d,i) => x(i%37)+50) 
          .attr("cy", (d) => y(d))
          .attr("r", 3)
          .style("fill", (d,i) => color_scale(Math.floor(i/37)))
          //.on("mouseover", MouseOverLineChart)
          //.on("mouseleave", MouseLeaveLineChart)
          .transition()
          .duration(1000) 
          .style("opacity", "100%");
      },
      (update) => {
        return update
          .style("opacity", "100%")
          //.on("mouseover", MouseOverLineChart)
          //.on("mouseleave", MouseLeaveLineChart)
          .transition()
          .duration(1000)
          .attr("cx", (d,i) => x(i%37)+50)
          .attr("cy", (d) => y(d))
          .attr("r", 3)
          .style("fill", (d,i) => color_scale(Math.floor(i/37)));
      },
      (exit) => {
        exit.remove();
      }
    );
  
  //svg.select("g.passengers_line").selectAll("circle").style("fill", "black")

  svg
    .call(d3.brushX()                     
    .extent( [ [90,120], [width+110, 120+height] ] ) 
    .on("start brush", Brushing)
    .on("end", CallUpdate)
  );

  function Brushing(event){
    selection=event.selection;
    if (selection == null) {
        svg.selectAll("circle").attr("stroke", null);
    } else {
        const [x0, x1] = selection;        
        svg.selectAll("circle")
          .filter(function(d){ 
            if(x0<=d3.select(this).attr('cx') && d3.select(this).attr('cx')<=x1)
              {listings.push(d3.select(this).attr('cx'))}
            return x0<=d3.select(this).attr('cx') && d3.select(this).attr('cx')<=x1})
          .style("stroke", "black").style("stroke-width",1.5);
        svg.selectAll("circle")
          .filter(function(d){return x0>=d3.select(this).attr('cx') || d3.select(this).attr('cx')>=x1})
          .style("stroke-width",0);
      get_selected_months(listings);
    }
  }
}

const xind = new Array;
for (i=0;i<37;i++){
  xind.push(parseFloat((0.8+i*0.874222).toFixed(6)))
}

function get_selected_months(xvalues){

  var indexes=[];
  var aux;

  for(i=0; i<xvalues.length; i++){
    var p = xind.filter((d)=>Math.abs(d-x.invert(xvalues[i]))<0.1)[0]
    aux=xind.indexOf(p);
    indexes.push(aux)
  }
  var unique = indexes.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
  })

  selected_dots=unique;
  listings=[];
}

function CallUpdate(event){
  if(selected_dots==[]){
      Brushing_Update([]);
  }
  else{
    Brushing_Update(selected_dots);
  }
}

var info_click_line = 0;