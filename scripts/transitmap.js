function createMap(data){

    // VARIÁVEIS //
    width = 1350;
    height = 250;

    x = d3
        .scaleLinear()
        .domain([0.8, 57])
        .range([100, width]);

    y = d3
        .scaleLinear()
        .domain([2.55, 3.3])
        .range([0, height]);

    // MAP SVG - Inicialização //

    const svg = d3
        .select("div#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Adicionar Titulo e Adicional Info //

    svg
        .append("g")
        .attr("class", "title")
        .append("text")
        .text("Transit Map of Metro do Porto")
        .style("font-size", 30)
        .style("font-family", "Trebuchet MS")
        .attr("font-weight", 900)
        .attr('x', 410)
        .attr('y', 35)
        .style("fill", current_axis);

    svg.append("g").attr("class", "additional_info_titles");
    svg.append("g").attr("class", "additional_info_image");
    svg.append("g").attr("class", "additional_info");
    svg.append("g").attr("class", "info_transit");

    svg
        .selectAll("g.additional_info_titles")
        .append("line")
        .attr("x1", 1150)
        .attr("y1", 20)
        .attr("x2", 1150 )
        .attr("y2", 235)
        .attr("stroke","#ADB6D3")
        .style("stroke-dasharray", ("3, 3"));

    svg.selectAll("g.additional_info_titles").append("text").text("A:").attr("x", 1160).attr("y", 50).attr("font-weight", 1000);
    svg.selectAll("g.additional_info_titles").append("text").text("Number of Stations:").attr("x", 1160).attr("y", 90).attr("font-weight", 1000);
    svg.selectAll("g.additional_info_titles").append("text").text("Trajectory Distance:").attr("x", 1160).attr("y", 130).attr("font-weight", 1000);
    svg.selectAll("g.additional_info_titles").append("text").text("Occupancy Rate:").attr("x", 1160).attr("y", 170).attr("font-weight", 1000);
    svg.selectAll("g.additional_info_titles").append("text").text("B:").attr("x", 1160).attr("y", 210).attr("font-weight", 1000);

    svg.selectAll("g.additional_info").append("g").attr("class", "Info_A").append("text").text("-").attr("x", 1180).attr("y", 65);
    svg.selectAll("g.additional_info").append("g").attr("class", "Info_NSt").append("text").text("-").attr("x", 1180).attr("y", 105);
    svg.selectAll("g.additional_info").append("g").attr("class", "Info_Dist").append("text").text("-").attr("x", 1180).attr("y", 145);
    svg.selectAll("g.additional_info").append("g").attr("class", "Info_Occ").append("text").text("-").attr("x", 1180).attr("y", 185);
    svg.selectAll("g.additional_info").append("g").attr("class", "Info_B").append("text").text("-").attr("x", 1180).attr("y", 225);

    svg.selectAll("g.info_transit")
        .append("image")
        .attr("class", "help")
        .attr('x', 838)
        .attr('y', 13)
        .attr("height", 25)
        .attr("width", 25)
        .attr("xlink:href", "I_light.png")
        .on("mouseover", MouseOverInfo)
        .on("mouseleave", MouseLeaveInfo)
        .on("click", ClickTransitInfo)
        .transition()
        .duration(1000)
        .style("opacity", "100%");

    svg
        .selectAll("g.additional_info_image")
        .append("image")
        .attr("class", "porto")
        .attr('x', 1110)
        .attr('y', 10)
        .attr('width', 270)
        .attr('height', 230)
        .attr("xlink:href", "porto_light.png");

    // MAP SVG - Append links //
    
    svg
        .append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("x1", calculateX1)
        .attr("y1", calculateY1)
        .attr("x2", calculateX2)
        .attr("y2", calculateY2)
        .style("stroke", color_transit_grey)
        .attr("stroke-width", 5)

    // MAP SVG - Append nodes // 
        
    svg 
        .append("g")
        .attr("class", "node")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("class","starter-stations")
        .on("mouseover", MouseOverTransitMap)
        .on("mouseleave", MouseLeaveTransitMap)
        .style("fill", color_transit_grey)
        .append("title")
        .text((d) => d.Origin); 
    
    makeScale("null", true);
    
    // FUNÇÕES AUXILIARES - Calcular posições //

    function calculateX1(dataItem, i) {  
        var p = data.nodes.filter(function (d) {
            if (d.id == dataItem.source) {return d;}
        });
        return x(p[0].x);
    }
    
    function calculateY1(dataItem, i) {  
        var p = data.nodes.filter(function (d) {
            if (d.id == dataItem.source) {return d;}
        });
        return y(p[0].y);
    }

    function calculateX2(dataItem, i) {  
        var p = data.nodes.filter(function (d) {
            if (d.id == dataItem.target) {return d;}
        });
        return x(p[0].x);
    }

    function calculateY2(dataItem, i) {  
        var p = data.nodes.filter(function (d) {
            if (d.id == dataItem.target) {return d;}
        });
        return y(p[0].y);
    } 
}
var current_select = ['null', 'null']
function markStations(graph, selection1, selection2) {

    map = d3.select("div#map").select("svg");
    if (selection1!='null'&&selection2!='null') {var st = findStations(graph, selection1, selection2)}
    var t = map.selectAll('circle').filter(function (c) {
        if(c.Origin == current_select[0] || c.Origin == current_select[1]) return c;
    })
    if (t) {
        if (selection1 == 'null' || selection2 =='null'){
            t.transition().duration(1000)
                .attr("r", 5)
                .style("fill", color_transit_red);
        /* se a estação deselecionada estiver no meio do caminho */ 
        } else if (t.filter((c) => {
            if (st.indexOf(c.id)>0 && st.indexOf(c.id)<st.length-1) return c;
        })
        ) {
            var p = t.filter((c) => {
                if (st.indexOf(c.id)>0 && st.indexOf(c.id)<st.length-1) {return c;}
            })
            p.transition().duration(1000)
                .attr("r", 5)
                .style("fill", color_transit_red);          
        } else {
            console.log("vai aqui?")
            t.transition().duration(1000)
                .attr("r", 5)
                .style("fill", color_transit_grey);  
        }
        
    }
    current_select = [selection1, selection2]

    if (selection1 != selection2){   
        map
            .selectAll("circle")
            .filter(function (c) {
                if(c.Origin == selection1) return c;
            }).transition().duration(1000)
            .attr("class", "corners")
            .attr("r", 7)
            .style("fill", color_transit_corners)
            ;
        map
            .selectAll("circle")
            .filter(function (c) {
                if(c.Origin == selection2) return c;
            }).transition().duration(1000)
            .attr("class", "corners")
            .attr("r", 7)
            .style("fill", color_transit_corners);
    }
}  

function makeScale(scale_domain, init){
    var svg = d3.select("div#map").select("svg");
    var color_scale =d3.scaleOrdinal()
        .domain([0,1])
        .range(["#86ecff","#00347a" ]);
    if (init){
        scale_width = 20;
        scale_height = 200;
        scale_left = 30;
        scale_top = 30;

        var grad = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "grad1")
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "100%")
            .attr("y2", "0%");

        grad.append("stop").attr("offset", "0%").style("stop-color", color_scale(0));
        grad.append("stop").attr("offset", "100%").style("stop-color", color_scale(1));

        svg
            .append("g")
            .attr("class", "scale")
            .append("polygon")
            .attr("class", "polygon")
            .style("fill", "url(#grad1)")
            .attr('points', [scale_left,scale_top, 
                            scale_left+scale_width+20,scale_top, 
                            scale_left+scale_width-10,scale_top+scale_height, 
                            scale_left,scale_top+scale_height]);    
    
        svg
            .select("g.scale")
            .append("text")
            .text("Occupancy Rate (%)")
            .attr('x', scale_left - 20)
            .attr('y', scale_top - 5);
        
        var Axis_label = d3
            .scaleLinear()
            .domain(0.8490896159317218, 32.88595305832149)
            .range([0, scale_height]);

        var Axis = d3
            .axisLeft()
            .scale(Axis_label);

        svg
            .select("g.scale")
            .append("g")
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (scale_left - 1) + ', ' + (scale_top) + ')')
            .transition()
            .duration(1000)
            .call(Axis);

    }else{

        var Axis_label = d3
            .scaleLinear()
            .domain(scale_domain)
            .range([0, scale_height]);
    
        var Axis = d3
            .axisLeft()
            .scale(Axis_label);

        svg
            .select("g.scale")
            .select("g")
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (scale_left - 1) + ', ' + (scale_top) + ')')
            .transition()
            .duration(1000)
            .call(Axis);
    }
}

function markPath(graph, data ,data_all, stationA, stationB, mon){

    // Select SVG
    map = d3.select("div#map").select("svg");

    // Get domain/data - General case
    if((stationA == "null" || stationB == "null") && mon == "null"){
        domain = data_all.map((d) => d[2]);

    // Get domain/data - General case with month selection
    } else if((stationA == "null" || stationB == "null") && mon != "null"){
        selected_data = getObservations(data, graph, "null", "null", mon);
        data_all = getData_All_transitMap (selected_data, graph);
        domain = data_all.map((d) => d[2]);

    // Get domain/data - Selected Stations and months
    } else {
        var path = findPath(graph, stationA, stationB); 
        selected_data = getObservations(data, graph, stationA, stationB, mon);
        data_all = getData_transitMap (selected_data, graph, path);
        domain = data_all.map((d) => d[2]);
    }

    // SCALE - Aqui para voltar ao que estava antes, trocar "0" por "d3.min(domain)"
    //makeScale([d3.max(domain), d3.min(domain)], false);
    makeScale([d3.max(domain), 0], false);
    var color_scale = d3.scaleOrdinal()
        .domain([0,1])
        .range(["#86ecff","#00347a" ]);
    // INFO - dar update a info adicional
    updateInfo(graph, stationA, stationB, domain);

    color = d3.scaleLinear().domain([0, d3.max(domain)]).range([color_scale(0), color_scale(1)]);
    espessura = d3.scaleLinear().domain([0, d3.max(domain)]).range([2, 7]);
        
    // GREY MAP
    map.select("g.link").selectAll("line").transition().duration(1000).attr("stroke-width", 5).style("stroke", color_transit_grey).attr("class", "greys");
    map.select("g.node").selectAll("circle").transition().duration(1000).style("fill", color_transit_grey).attr("class","greys").attr("r", 5);
    
    // DRAW PATH
    for(var i = 0; i < data_all.length; i++){
        map
            .select("g.link")
            .selectAll("line")
            .filter(function (c) {
                if((c.source == data_all[i][0] && c.target == data_all[i][1]) || (c.source == data_all[i][1] && c.target == data_all[i][0])){ return c; }    }).transition().duration(1000)
            .attr("stroke-width", espessura(domain[i]))
            .attr("class", "non-greys")
            .style("stroke", color(domain[i]));

        map
            .select("g.node")
            .selectAll("circle")
            .filter(function (c) {
                if(c.id == data_all[i][0] || c.id == data_all[i][1]){ return c; }    
            }).transition().duration(1000)
            .attr("class", "non-grey-stations")
            .style("fill", color_transit_red);
    }
}

function cleanMap() {
    
    d3
        .select("div#map")
        .select("svg")
        .select("g.link")
        .selectAll("line")
        .transition().duration(1000)
        .attr("stroke-width", 5)
        .style("stroke", color_transit_grey);
    
    d3
        .select("div#map")
        .select("svg")
        .selectAll("circle")
        .transition().duration(1000)
        .attr("r", 5)
        .style("fill", color_transit_grey);
}

function updateInfo(graph, stationA, stationB, domain) {

    svg = d3.select("div#map").select("svg");
    
    if (stationA == "null" || stationB == "null"){

        svg.selectAll("g.additional_info").remove();
        d3.selectAll("g.additional_info_image").transition().duration(250).style("opacity", 1);
        d3.selectAll("g.additional_info_titles").style("opacity", 0);

        svg
            .selectAll("g.additional_info")
            .append("svg:image")
            .attr('x', 1160)
            .attr('y', -20)
            .attr('width', 300)
            .attr('height', 300)
            .attr("xlink:href", "cat.gif")

    } else {

        path = findPath(graph, stationA, stationB);
        nstations = 1;
        distance = 0;
        for(var i = 0; i < path.length; i++){
            link = graph.links.filter(function (d) {
                if((path[i][0] == d.source && path[i][1] == d.target) || (path[i][0] == d.target && path[i][1] == d.source)) return d;
            });
            distance = distance + parseFloat(link[0].distance);
            if (path[i][0]>path[i][1]) {path[i] = [path[i][1],path[i][0]]}
            if (!specialEdgeQ(specialEdges,path[i])) {nstations++}
        }
        
        nodeA = graph.nodes.filter(function (d) {
            if (d.Origin == stationA) return d;
        });

        nodeB = graph.nodes.filter(function (d) {
            if (d.Origin == stationB) return d;
        });

        svg.selectAll("g.additional_info").remove();
        d3.selectAll("g.additional_info_image").transition().duration(250).style("opacity", 0);
        d3.selectAll("g.additional_info_titles").style("opacity", 1);
        svg.append("g").attr("class", "additional_info");
        
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_A").append("text").text(stationA+",").attr("x", 1180).attr("y", 50);
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_A").append("text").text(nodeA[0].Municipality).attr("x", 1180).attr("y", 65);
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_NSt").append("text").text(nstations).attr("x", 1180).attr("y", 105);
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_Dist").append("text").text(distance+" m").attr("x", 1180).attr("y", 145);
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_Occ").append("text").text(Math.round(d3.mean(domain)*100)/100+"%").attr("x", 1180).attr("y", 185);
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_B").append("text").text(stationB+",").attr("x", 1180).attr("y", 210);
        svg.selectAll("g.additional_info").append("g").attr("class", "Info_B").append("text").text(nodeB[0].Municipality).attr("x", 1180).attr("y", 225);
        svg.selectAll("text").style("fill",current_axis);
    }

}

var info_click_transit = 0;
