function MouseOverRadarChart(event, d){
    d3.select(this)
                    .attr("r",9)
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip
                    .html( Math.round(d * 1000) / 10+"%")
                    .style("left",(event.pageX - 34) + "px")
                    .style("top",(event.pageY - 34) + "px" )
}

function MouseLeaveRadarChart(event, d){
    d3.select(this)
        .attr("r",2.5)
        tooltip.transition().duration(200).style("opacity",0);
    }
/*
function MouseOverLineChart(event,d){
    d3.select(this)
        .attr("r",4.5)
        .style("fill","pink");
    tooltip.transition().duration(200).style("opacity", 1);
    if( d % 1 == 0){
    tooltip
        .html("Covid Cases: " +Math.round(d))
        .style("left",(event.pageX - 34) + "px")
        .style("top",(event.pageY - 34) + "px" )}
    else{
    tooltip
        .html("Passengers: " +Math.round(d))
        .style("left",(event.pageX - 34) + "px")
        .style("top",(event.pageY - 34) + "px" )
    }
}

function MouseLeaveLineChart(event,d){
    if( d % 1 == 0){
        d3.select(this)
        .attr("r", 3)
        .style("fill","#950000");}
    else{
        d3.select(this)
        .attr("r", 3)
        .style("fill","#20c1af");
    }
    tooltip.transition().duration(200).style("opacity", 0);
}*/

function MouseOverTransitMap(event, d){
    d3.select(this)
        .attr("r",8)
        .style("fill","pink");
 
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip
                    .html("Station:" +d.Origin)
                    .style("left",(event.pageX - 34) + "px")
                    .style("top",(event.pageY - 34) + "px" );
}

function MouseLeaveTransitMap(event,d){
    var circle=d3.select(this);
    if(circle.attr("class")=="non-grey-stations"){
        circle
            .attr("r", 5)
            .style("fill",color_transit_red);
    }else if(circle.attr("class")=="corners"){
       circle 
        .attr("r", 7)
        .style("fill",color_transit_corners);
    }else if(circle.attr('class')=="greys"){
        circle 
        .attr("r", 5)
        .style("fill",color_transit_grey);
    }else{
        circle 
        .attr("r", 5)
        .style("fill",color_transit_red);
    }
    tooltip.transition().duration(200).style("opacity", 0);
}

function MouseOverSankeyNode(event,d){
    d3.select(this)
        .style("fill","#ff3300");
    tooltip.transition().duration(200).style("opacity", 1);
    if( d.index <= 3){
    tooltip
        .html("Year " + d.name)
        .style("left",(event.pageX - 34) + "px")
        .style("top",(event.pageY - 34) + "px" )
    } else {
    tooltip
        .html("Hours " + d.name)
        .style("left",(event.pageX - 34) + "px")
        .style("top",(event.pageY - 34) + "px" )
    }
}

var colorscale_nodes = d3.scaleOrdinal()
        .domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
        .range(["#99ccff", "#99ccff", "#99ccff", "#99ccff", 
        "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", 
        "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0"])
        
function MouseLeaveSankeyNode(event,d){
    d3.select(this)
    .style("fill", function(d) { return colorscale_nodes(d.index);})
    tooltip.transition().duration(200).style("opacity", 0);
}

function MouseOverSankeyLink(event,d){
    d3.select(this)
        .style("stroke", sankey_over_links)
        .style("stroke-opacity", 0.4)
    tooltip.transition().duration(200).style("opacity", 1);
    tooltip
        .html(d.source.name + " - " + d.target.name + "<br>Passengers: " + d.value)
        .style("left",(event.pageX - 34) + "px")
        .style("top",(event.pageY - 34) + "px" )
}

function MouseLeaveSankeyLink(event,d){
    d3.select(this)
        .style("stroke", color_sankey_link)
        .style("stroke-opacity", 0.2)
    tooltip.transition().duration(200).style("opacity", 0);
}

function MouseOverInfo(event, d){
    d3.select(this)
        .style("opacity", 0.7)
}

function MouseLeaveInfo(event, d){
    d3.select(this)
        .style("opacity", 1)
}

function ClickSankeyInfo(event, d){

    if (info_click_sankey==0){

        if (info_click_line==1 || info_click_transit == 1 || info_click_radar == 1) {
            info_tooltip.transition().duration(100).style("opacity", 0)

            info_tooltip.transition().delay(100).duration(20)//.style("opacity", 1)
                .style("left",(event.pageX - 330) + "px")
                .style("top",(event.pageY - 70) + "px")
                .transition().duration(350).style("opacity", 1)

            info_tooltip.html("Sankey Diagram <br><br>Hover over each rectangle to see the respective year or time slot.<br>Hover over each link to highlight it and see the flow of passengers of that year and time slot.")
        } else {
            info_tooltip
                .style("left",(event.pageX - 330 ) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(500).style("opacity", 1)

            info_tooltip.html("Sankey Diagram <br><br>Hover over each rectangle to see the respective year or time slot.<br>Hover over each link to highlight it and see the flow of passengers of that year and time slot.")

        }
        info_click_sankey = 1

        info_click_line = 0
        info_click_transit = 0
        info_click_radar = 0
        
    } else {
        info_tooltip.transition().duration(500).style("opacity", 0);
        info_click_sankey = 0
    }

}

function ClickLineInfo(event, d){

    if (info_click_line==0){

        if (info_click_sankey==1 || info_click_transit == 1 || info_click_radar == 1) {
            info_tooltip.transition().duration(100).style("opacity", 0)

            info_tooltip.transition().delay(100).duration(20)
                .style("left",(event.pageX - 330) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(350).style("opacity", 1)

            info_tooltip.html("Line Chart <br><br>Displays the average number of passengers and COVID-19 cases throughout all months. Select here the interval of months that will automatically update the other idioms.")


        } else {
            info_tooltip
                .style("left",(event.pageX -330) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(500).style("opacity", 1)

            info_tooltip.html("Line Chart <br><br>Displays the average number of passengers and COVID-19 cases throughout all months. Select here the interval of months that will automatically update the other idioms.")

        }

        info_click_line = 1

        info_click_sankey = 0
        info_click_transit = 0
        info_click_radar = 0
        
    } else {
        info_tooltip.transition().duration(500).style("opacity", 0);
        info_click_line = 0
    }

}

function ClickTransitInfo(event, d){

    if (info_click_transit==0){

        if (info_click_sankey==1 || info_click_radar == 1 || info_click_line == 1) {
            info_tooltip.transition().duration(100).style("opacity", 0)

            info_tooltip.transition().delay(100).duration(20)
                .style("left",(event.pageX - 330) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(350).style("opacity", 1)

            info_tooltip.html("Transit Map <br><br> Hover over each node to get the station name. Choose two stations to get the occupancy rate of that path and find more information about the trajectory.")


        } else {
            info_tooltip
                .style("left",(event.pageX -330) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(500).style("opacity", 1)

            info_tooltip.html("Transit Map <br><br> Hover over each node to get the station name. Choose two stations to get the occupancy rate of that path and find more information about the trajectory.")

        }

        info_click_transit = 1

        info_click_sankey = 0
        info_click_line = 0
        info_click_radar = 0
        
    } else {
        info_tooltip.transition().duration(500).style("opacity", 0);
        info_click_transit = 0
    }

}

function ClickRadarInfo(event, d){

    if (info_click_radar==0){

        if (info_click_sankey==1 || info_click_line == 1 || info_click_transit == 1) {
            info_tooltip.transition().duration(100).style("opacity", 0)

            info_tooltip.transition().delay(100).duration(20)
                .style("left",(event.pageX - 330) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(350).style("opacity", 1)

            info_tooltip.html("Radar Chart <br><br> Here there is information about the frequency of each type of train (TramTrain or EuroTram) throughout a day. Hover over each circle to get the percentage of vehicles in that time slot.")

        } else {
            info_tooltip
                .style("left",(event.pageX -330) + "px")
                .style("top",(event.pageY - 70) + "px" )
                .transition().duration(500).style("opacity", 1)

            info_tooltip.html("Radar Chart <br><br> Here there is information about the frequency of each type of train (TramTrain or EuroTram) throughout a day. Hover over each circle to get the percentage of vehicles in that time slot.")

        }

        info_click_radar = 1

        info_click_sankey = 0
        info_click_line = 0
        info_click_transit = 0
        
    } else {
        info_tooltip.transition().duration(500).style("opacity", 0);
        info_click_radar = 0
    }

}