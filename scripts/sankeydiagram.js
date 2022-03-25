// Data inputed as only ABSOLUTE VALUE OF PASSENGERS.
// year_hour_matrix -> by row: years, by column: hours
// Must be preprocessed to a node/link format
function mySankey(data_matrix, newQ){
    
    function preprocessData(data_matrix){

        year_list = ["2018", "2019", "2020", "2021"]
        hour_list = ["0h-6h", "6h-7h", "7h-8h", "8h-9h", "9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h", "17h-18h", "18h-19h", "19h-20h", "20h-21h", "21h-22h", "22h-23h", "23h-24h"]
        sankeydata = {"nodes": [], "links": []}
        i = 0
        for (item of year_list.concat(hour_list)){
            sankeydata.nodes.push({"node": i, "name": item})
            i++
        }
        var yr = 0;
        for (year of data_matrix) {
            var hr = 0;
            for (hour of year) {
                sankeydata.links.push({"source": yr, "target": hr+year_list.length, "value": data_matrix[yr][hr]})
                hr++
            }
            yr++
        }
        return sankeydata
    }

    data = preprocessData(data_matrix)
    //console.log(data) // CHECK

    // Define margins, width and height
    var margin = {top: 20, bottom: 60, left: 50, right: 20};
    var width = 800;
    var height = 420;

    if (newQ) {
        d3.select("div#sankeyDiagram")
            .append("svg").attr("class", "chart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    //var color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select("#sankeyDiagram").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //.attr("transform", "translate(65,95)")

    if (newQ) {
        svg.append("g").attr("class", "node");
        svg.append("g").attr("class", "link");
        svg.select("g").attr("transform", "translate(0,0)")
        svg.append("g").attr("class", "title").append("text")
        svg.append("g").attr("class", "year_label").append("text")
        svg.append("g").attr("class", "hour_label").append("text")
        svg.append("g").attr("class", "info_sankey")

        svg.select("g.title")
            .select("text")
            .text("Number of passengers per year and per time slot")
            .style("font-size", 30)
            .style("font-family", "Trebuchet MS")
            .attr("font-weight", 900)
            .attr('x', 65)
            .attr('y', 55)

        svg.select("g.year_label")
            .select("text")
            .text("Years")
            .style("font-size", 25)
            .style("font-family", "Trebuchet MS")
            //.attr("transform", "rotate(-90)")
            .attr('x', -240)
            .attr('y', 45)
            .attr("transform", "rotate(-90)")
            .transition()
            .duration(1000) 
            .style("opacity", "100%");


        svg.select("g.hour_label")
            .select("text")
            .text("Hours")
            .style("font-size", 25)
            .style("font-family", "Trebuchet MS")
            .attr('x', 220)
            .attr('y', -820)
            .attr("transform", "rotate(90)")
            .transition()
            .duration(1000) 
            .style("opacity", "100%");

        svg.selectAll("g.info_sankey")
            .append("image")
            .attr("class", "help")
            .attr('x', 764)
            .attr('y', 33)
            .attr("height", 25)
            .attr("width", 25)
            .attr("xlink:href", "I_light.png")
            .on("mouseover", MouseOverInfo)
            .on("mouseleave", MouseLeaveInfo)
            .on("click", ClickSankeyInfo)
            .transition()
            .duration(1000)
            .style("opacity", "100%");

    }

    // Maybe make this a bit more efficient?
    var colorscale_nodes = d3.scaleOrdinal()
        .domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
        .range(["#99ccff", "#99ccff", "#99ccff", "#99ccff", 
        "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", 
        "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0", "#2069e0"])

    var sankey = d3.sankey()
        .nodeWidth(20)
        .nodePadding(5)
        .size([width-margin.left-margin.right, height-margin.top-margin.bottom]);

    //var path = sankey.links()

    data = sankey(data)

    svg.selectAll("g.node").selectAll("rect")
    .data(data.nodes)
    .join(
        (enter) => {
            return enter.append("rect")
                .attr("x", function(d) { return d.x0; })
                .attr("y", function(d) { return d.y0; })
                .attr("height", function(d) { return d.y1 - d.y0;})
                .attr("width", sankey.nodeWidth())
                .attr("transform", "translate(65,95)")
                .style("fill", function(d,i) { return colorscale_nodes(i); })
                .style("stroke", sankey_node_stroke)
                .on("mouseover", MouseOverSankeyNode)  
                .on("mouseleave", MouseLeaveSankeyNode)
                .transition()
                .duration(1000) 
                .style("opacity", "100%");
        },
        (update) => {
            return update
            .style("fill",  function(d,i) { return colorscale_nodes(i);})
            .style("stroke", sankey_node_stroke)
            .attr("width", sankey.nodeWidth())
            .on("mouseover", MouseOverSankeyNode)  
            .on("mouseleave", MouseLeaveSankeyNode)
            .transition()
            .duration(1000)   
            .attr("height", function(d) { return d.y1 - d.y0;})
            .attr("x", function(d) { return d.x0; })
            .attr("y", function(d) { return d.y0; })    
        }
    )

    svg.selectAll("g.link").selectAll("path")
        .data(data.links)
        .join(
            (enter) => {
                return enter.append("path")
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("stroke-width", (d) => d.width)
                .attr("transform", "translate(65,95)")
                .style("stroke", color_sankey_link)
                .style("stroke-opacity", 0.2)
                .style("fill", "none")
                .on("mouseover", MouseOverSankeyLink)    
                .on("mouseleave", MouseLeaveSankeyLink)
                .transition()
                .duration(1000) 
                .style("opacity", "100%")
            },
            (update) => {
                return update
                .attr("stroke-width", (d) => d.width)
                .on("mouseover", MouseOverSankeyLink)   
                .on("mouseleave", MouseLeaveSankeyLink)
                .transition()
                .duration(1000)  
                .style("stroke", color_sankey_link)
                .style("stroke-opacity", 0.2)
                .style("fill", "none")
                .attr("d", d3.sankeyLinkHorizontal())
            }
        )
}

var info_click_sankey = 0;
