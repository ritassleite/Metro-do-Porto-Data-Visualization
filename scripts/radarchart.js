var color_scale_radar = d3.scaleOrdinal()
.domain([0,1])
.range([current_euro, current_tram])

//Input data as [eurotram_plot, tramtrain_plot]
function myRadarChart(data, newQ){

    // Define margins, width and height
    var margin = {top: 0, bottom: 0, left: 0, right: 0};
    var width = 400;
    var height = 250;
    var xcenter = 135;
    var ycenter = 150;

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return [xcenter + x, ycenter - y]
    }

    // Retrieves the polar coordinates for each data subset
    function getPathCoordinates(data_point, i){
        let angle = (Math.PI / 2) - (2 * Math.PI * i / features.length);
        return angleToCoordinate(angle, data_point);
    }

    let features = ["6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","0"];
    let ticks = get_ticks(data);
    const max = ticks[4];

    let radialScale = d3
        .scaleLinear()
        .domain([0,max])
        .range([0,80]);  // Shifting the range will increase or decrease size of svg
    
    if(newQ){ // Create svg
        d3
            .select("div#radarChart")
            .append("svg")
            .append("g")
        }

    const svg = d3
        .select("#radarChart")
        .select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    
    if (newQ) {
        svg.append("g").attr("class", "outer_circles");
        svg.append("g").attr("class", "radii_lines");
        svg.append("g").attr("class", "data_circles");
        svg.append("g").attr("class", "labels");
        svg.append("g").attr("class", "euro_line").append("path");
        svg.append("g").attr("class", "tram_line").append("path");
        svg.append("g").attr("class", "info_radar");

        //Append info tooltip
        svg.selectAll("g.info_radar")
            .append("image")
            .attr("class", "help")
            .attr('x', 325)
            .attr('y', 15)
            .attr("height", 23)
            .attr("width", 23)
            .attr("xlink:href", "I_light.png")
            .on("mouseover", MouseOverInfo)
            .on("mouseleave", MouseLeaveInfo)
            .on("click", ClickRadarInfo)
            .transition()
            .duration(1000)
            .style("opacity","100%")
            ;

        svg
            .append("g")
            .attr("class", "title")
            .append("text")
            .text("Train Models Distribution")
            .style("font-size", 25)
            .style("font-family", "Trebuchet MS")
            .attr("font-weight", 900)
            .attr('x', 25)
            .attr('y', 35)
            .style("fill", current_axis);

        // Circles labels
        ticks.forEach(t => {
            /*svg 
                .select("g.outer_circles")
                .append("text")
                .attr("class", "texto")
                .attr("x", xcenter)
                .attr("y", ycenter)
                .text((Math.round(t*1000)/10).toString()+"%")
                .style("font-size", 7);*/
            
            svg
                .select("g.outer_circles")
                .append("circle")
                .attr("class", "outer circle")
                .attr("r", radialScale(t))
                .attr("cx", xcenter)
                .attr("cy", ycenter)
                .style("fill", "none")
                .style("stroke", "gray")
                .attr("stroke-opacity", 0.2);
        });
    
        for (var i = 0; i < features.length; i++) {
            let angle = (Math.PI / 2) - (2 * Math.PI * i / features.length);
            let line_coordinate = angleToCoordinate(angle, max);
            let label_coordinate = angleToCoordinate(angle - 0.16, max + 0.015);

            svg // Radii lines (time slot separator)
                .select("g.radii_lines")
                .append("line")
                .attr("x1", xcenter)
                .attr("y1", ycenter)
                .attr("x2", line_coordinate[0])
                .attr("y2", line_coordinate[1])
                .attr("stroke","gray")
                .attr("stroke-opacity", 0.4);
   
            svg // Appends the features
                .select("g.radii_lines")
                .append("text")
                .attr("x", label_coordinate[0])
                .attr("y", label_coordinate[1])
                .text(features[i]+"h")
                .style("font-size", 8)
                .style("font-weight",900);
        }

        // Append the labels
        svg.select("g.labels")
            .append('rect')
            .attr('x', xcenter + 130)
            .attr('y', ycenter + 10)
            .attr('width', 20)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('class','euro_label')
            .attr('fill', "#ffa600");

        svg.select("g.labels")
            .append('rect')
            .attr('x', xcenter + 130)
            .attr('y', ycenter - 30)
            .attr('width', 20)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('class','tram_label')
            .attr('fill', "#003f5c");

        svg.select("g.labels")
            .append('text')
            .attr('x', xcenter+160)
            .attr('y', ycenter-12)
            .text("EuroTram").style("font-size", 20);

        svg.select("g.labels")
            .append('text')
            .attr('x', xcenter+160)
            .attr('y', ycenter+29)
            .text("TramTrain").style("font-size", 20);
    }
    svg 
        .select("g.outer_circles").selectAll("text").remove();

    ticks.forEach(t => {
        svg
            .select("g.outer_circles")
            .append("text")
            .attr("class","texto")
            .attr("x", xcenter+5)
            .attr("y", ycenter-5-radialScale(t))
            .style("fill", current_axis)
            .text((Math.round(t*1000)/10).toString()+"%").style("font-size", 10)
            .style("font-size", 10);
        
    });
/*
    var color_scale = d3.scaleOrdinal()
        .domain([0,1])
        .range([current_euro, current_tram])
*/
    let line = d3
        .line()
        .x((d,i) => getPathCoordinates(d,i)[0])
        .y((d,i) => getPathCoordinates(d,i)[1]);

    data.forEach(t => {
        if (data.indexOf(t)==0) {u = svg.select("g.euro_line")}
        else {u = svg.select("g.tram_line")}
        
        // Adding the first element to the end of the list to ensure the line is closed
        t.push(t[0])

        u
          .select("path") 
          .datum(t)
          .transition()
          .duration(1000)
          .attr("fill", "none")
          .attr("stroke", color_scale_radar(data.indexOf(t)))
          .attr("stroke-width", 1.5)
          .attr("d", line(t))  

        t.pop()
    });

    var merged = data[0].concat(data[1])    
    svg.select("g.data_circles").selectAll("circle")
    .data(merged)
    .join(
      (enter) => {
        return enter                  
            .append("circle")
            .attr("cx", (d,i) => getPathCoordinates(d,(i%19))[0]) 
            .attr("cy", (d,i) => getPathCoordinates(d,(i%19))[1])
            .attr("r", 3)
            .style("fill", (d,i) => color_scale_radar(Math.floor(i/19)))
            .attr("stroke", (d,i) => "none")
            .on("mouseover", MouseOverRadarChart)
            .on("mouseleave", MouseLeaveRadarChart)
            .transition()
            .duration(1000)
            .style("opacity", "100%");
      },
      (update) => {
        return update
            .on("mouseover", MouseOverRadarChart)
            .on("mouseleave", MouseLeaveRadarChart)
            .transition()
            .duration(1000)
            .attr("cx", (d,i) => getPathCoordinates(d,(i%19))[0]) 
            .attr("cy", (d,i) => getPathCoordinates(d,(i%19))[1])
            .attr("r", 3)
            .style("fill", (d,i) => color_scale_radar(Math.floor(i/19)))
            .attr("stroke", "none");
          
      },
      (exit) => {
        exit.remove();
      }
    ); 
}

function get_ticks(data){
    var aux=data[0].concat(data[1]);
    var min=1;
    var max=0;
    for(i=0;i<aux.length;i++){
        if(aux[i]>=max){
            max=aux[i];
        }else{
            if(aux[i]<=min){
                min=aux[i];
            }
        }
    }
    var dif=(max-min)/4;
    var vector=[min];
    for(i=1;i<=4;i++){
        vector.push(min+i*dif);
    }
    return vector;
    
}

var info_click_radar = 0