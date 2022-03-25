//Cores do Dark Mode
const dark_background="#242526"
const dark_axis = "#fde5bf"
const dark_eurotram = "#2069e0"
const dark_tramtrain ="#f4d47c"
const dark_covid="#ff7084"
const dark_passengers="#7b5be9"
const dark_body="#18191A"
const dark_title="#a1e2ff"
const dark_font="#BFBFBF"
const dark_red="#fe5757"
const dark_grey="#3a3b3c"
const dark_corners="#fe8181"
const dark_sankey_link="lightgrey"
const dark_sankey_over_link="#4ff0ff"
const dark_dash="dark grey"

//Cores Light Mode
const light_background="white"
const light_axis="#1f1f1f"
const light_eurotram="#003f5c"
const light_tramtrain="#ffa600"
const light_covid="#950000"
const light_passengers="#20c1af"
const light_body="#d6dae6"
const light_title="#00305f"
const light_font="#00305f"
const light_red="#ffaa4f"
const light_grey="#cccccc"
const light_corners="#ff8400"
const light_sankey_link="grey"
const light_sankey_over_link="#3640ff"
const light_dash="#ADB6D3"

//VARIAVEL DE CONTAGEM
var count=0;

//Variáveis de Cores- GERAIS
var color_transit_corners= light_corners;
var color_transit_red=light_red;
var color_transit_grey=light_grey;
var current_axis="black";
var current_euro=light_eurotram;
var current_tram=light_tramtrain
var current_covid=light_covid;
var current_passengers=light_passengers;
var color_sankey_link=light_sankey_link;
var sankey_over_links=light_sankey_over_link;
var sankey_node_stroke="black"

function Dark_Mode(){
    current_axis=dark_axis;

    d3.select("body").transition().duration(500).style("background-color",dark_body);
    d3.select("div#title").transition().duration(500).style("color",dark_title);
    d3.select("div#subtitle").transition().duration(500).style("color",dark_title);

    d3.select("img#imagem").transition().duration(250).style("opacity", "0%");
    d3.select("img#imagem").attr('src',"Porto_Metro_logo_dark.svg.png").transition().delay(250).duration(250).style("opacity", "100%");

    d3.selectAll("image.help").transition().duration(250).style("opacity", "0%");
    d3.selectAll("image.help").attr("href", "I_dark.png").transition().delay(250).duration(250).style("opacity", "100%");

    d3.selectAll("image.porto").transition().duration(250).style("opacity", "0%");
    d3.selectAll("image.porto").attr("href", "porto_dark.png").transition().delay(250).duration(250).style("opacity", "100%");
    
    Dark_LineChart();
    Dark_RadarChart();
    Dark_Transit();
    Dark_Buttons();
    Dark_Sankey();

    //updateVis();
}


function Dark_LineChart(){
    current_passengers=dark_passengers;
    current_covid=dark_covid;

    color_scale =d3.scaleOrdinal()
    .domain([0,1])
    .range([current_passengers, current_covid]);

    linechart = d3.select("div#lineChart");

    linechart.select("g.title").selectAll("text").transition().duration(500).style("fill", current_axis);

    linechart.transition().duration(500).style("background-color",dark_background);
    
    linechart.select(".lineXAxis").selectAll("path")
    .transition().duration(500).style("stroke",dark_axis)

    linechart.select(".lineXAxis").transition().duration(500)
    .style("stroke",dark_axis)
        .selectAll("text")
        .style("fill",dark_axis);

    linechart.select(".lineYAxis").selectAll("path")
    .transition().duration(500).style("stroke",dark_axis)

    linechart.select(".lineYAxis").selectAll("line")
    .transition().duration(500).style("stroke",dark_axis)
    linechart.select(".lineXAxis").selectAll("line")
    .transition().duration(500).style("stroke",dark_axis)

    linechart.select(".lineYAxis")
        .selectAll("text")
        .transition().duration(500).style("fill",dark_axis);

    linechart.select(".labels")
        .selectAll("text")
        .transition().duration(500).style("fill",dark_axis);

    linechart.select(".labels").select("rect.passengers_label")
    .transition().duration(500).style("fill", dark_passengers)


    linechart.select(".labels").select("rect.covid_label")
    .transition().duration(500).style("fill", dark_covid)

    linechart.select("g.passengers_line").selectAll("circle").transition().duration(500).style("fill", (d,i) => color_scale(Math.floor(i/37)));
    linechart.select("g.passengers_line").selectAll("path").transition().duration(500).attr("stroke", color_scale(0))
    linechart.select("g.covid_line").selectAll("path").transition().duration(500).attr("stroke", color_scale(1))

}

function Dark_RadarChart(){
    current_euro=dark_eurotram;
    current_tram=dark_tramtrain;

    color_scale_radar = d3.scaleOrdinal()
    .domain([0,1])
    .range([current_euro, current_tram])

    radarchart=d3.select("div#radarChart");
    radarchart.transition().duration(500).style("background-color",dark_background);
    radarchart.selectAll("circle.outer.circle").transition().duration(500).style("stroke",dark_axis);
    radarchart.selectAll("text").transition().duration(500).style("fill",dark_axis);
    radarchart.selectAll(".radii_lines.texto").transition().duration(500).style("fill",dark_axis);
    radarchart.select(".labels").select("rect.euro_label").transition().duration(500).style("fill",dark_eurotram).style("stroke",current_axis);
    radarchart.select(".labels").select("rect.tram_label").transition().duration(500).style("fill",dark_tramtrain).style("stroke",current_axis);

    radarchart.select("g.data_circles").selectAll("circle").transition().duration(500).style("fill", (d,i) => color_scale_radar(Math.floor(i/19)))
    radarchart.select("g.euro_line").selectAll("path").transition().duration(500).attr("stroke", color_scale_radar(0))
    radarchart.select("g.tram_line").selectAll("path").transition().duration(500).attr("stroke", color_scale_radar(1))
}

function Dark_Buttons(){
    d3
    .select("#selectButton1")
    .transition().duration(500)
    .style("background-color", "#242526")
    .style("color", dark_font);
    d3
    .select("#selectButton2")
    .transition().duration(500)
    .style("background-color", "#242526")
    .style("color", dark_font);
    
    d3
    .select("#Reset_Time")
    .transition().duration(500)
    .style("background-color", "#242526")
    .style("color", dark_font);

    d3
    .select("#Dark")
    .transition().duration(500)
    .style("background-color", "#242526")
    .style("color", dark_font);

    d3
    .select("#lightanddark")
    .transition().duration(500)
    .style("background-color", "#242526")
    
}

function Dark_Transit(){
    map=d3.select("div#map");

    color_transit_red=dark_red;
    color_transit_grey=dark_grey;
    color_transit_corners=dark_corners;

    map.selectAll("g.node").selectAll("circle.corners").transition().duration(500).style("fill", color_transit_corners)
    map.selectAll("g.node").selectAll("circle.greys").transition().duration(500).style("fill", color_transit_grey)
    map.selectAll("g.node").selectAll("circle.non-grey-stations").transition().duration(500).style("fill", color_transit_red)
    map.selectAll("g.link").selectAll("line.greys").transition().duration(500).style("stroke", color_transit_grey)
    
    map.transition().duration(500).style("background-color",dark_background);
    map.select(".scale").selectAll("text").transition().duration(500).style('fill',dark_axis);
    map.select(".scale").select(".axis").selectAll("line").transition().duration(500).style('stroke',dark_axis);
    map.select(".scale").select(".axis").selectAll("path").transition().duration(500).style('stroke',dark_axis);
    map.selectAll("text").transition().duration(500).style('fill',dark_axis);
    map.selectAll("g.additional_info_titles").selectAll("line").transition().duration(500).style("stroke",dark_dash);

}

function Dark_Sankey(){
    sankey=d3.select("div#sankeyDiagram");
    sankey_over_links=dark_sankey_over_link;
    color_sankey_link=dark_sankey_link;
    sankey_node_stroke=dark_axis
    sankey.transition().duration(500).style("background-color", dark_background);
    sankey.selectAll("text").transition().duration(500).style("fill",dark_axis);
    sankey.selectAll("g.link").selectAll("path").transition().duration(500).style("stroke", color_sankey_link)
    sankey.selectAll("g.node").selectAll("rect").transition().duration(500).style("stroke", sankey_node_stroke)

}

function SwitchTheme(){
    if(count==1){
        Light_Mode();
        count = 0;
    }else{
        Dark_Mode();
        count = 1;
    }
}

function Light_Mode(){

    d3.select("body").transition().duration(500).style("background-color",light_body);
    d3.select("div#title").transition().duration(500).style("color",light_title);
    d3.select("div#subtitle").transition().duration(500).style("color",light_title);
    current_axis=light_axis;

    /*d3.select("img#lightanddark").transition().duration(250).style("opacity", "0%");
    d3.select("img#lightanddark").attr('src',"moon.png").transition().delay(250).duration(250).style("opacity", "100%");*/
    
    d3.selectAll("img#imagem").transition().duration(250).style("opacity", "0%");
    d3.selectAll("img#imagem").attr('src',"Porto_Metro_logo.svg.png").transition().delay(250).duration(250).style("opacity", "100%");

    d3.selectAll("image.help").transition().duration(250).style("opacity", "0%");
    d3.selectAll("image.help").attr("href", "I_light.png").transition().delay(250).duration(250).style("opacity", "100%");

    d3.selectAll("image.porto").transition().duration(250).style("opacity", "0%");
    d3.selectAll("image.porto").attr("href", "porto_light.png").transition().delay(250).duration(250).style("opacity", "100%");

    Light_LineChart();
    Light_RadarChart();
    Light_Buttons();
    Light_Sankey();
    Light_Transit();

    //updateVis();
}


function Light_LineChart(){

    current_passengers=light_passengers;
    current_covid=light_covid;

    color_scale =d3.scaleOrdinal()
    .domain([0,1])
    .range([current_passengers, current_covid]);

    linechart=d3.select("div#lineChart");

    linechart.select("g.title").selectAll("text").transition().duration(500).style("fill", current_axis);

    linechart.transition().duration(500).style("background-color",light_background);
    
    linechart.select(".lineXAxis").selectAll("path")
    .transition().duration(500).style("stroke",light_axis)

    linechart.select(".lineXAxis")
    .transition().duration(500).style("stroke",light_axis)
        .selectAll("text")
            .style("fill",light_axis);

    linechart.select(".lineYAxis").selectAll("path")
    .transition().duration(500).style("stroke",light_axis)

    linechart.select(".lineYAxis").selectAll("line")
    .transition().duration(500).style("stroke",light_axis)
    linechart.select(".lineXAxis").selectAll("line")
    .transition().duration(500).style("stroke",light_axis)

    linechart.select(".lineYAxis")
        .selectAll("text")
        .transition().duration(500).style("fill",light_axis);

    linechart.select(".labels")
        .selectAll("text")
        .transition().duration(500).style("fill",light_axis);

    linechart.select(".labels").select("rect.passengers_label")
    .transition().duration(500).style("fill", light_passengers)


    linechart.select(".labels").select("rect.covid_label")
    .transition().duration(500).style("fill", light_covid)

    linechart.select("g.passengers_line").selectAll("circle").transition().duration(500).style("fill", (d,i) => color_scale(Math.floor(i/37)));
    linechart.select("g.passengers_line").selectAll("path").transition().duration(500).attr("stroke", color_scale(0))
    linechart.select("g.covid_line").selectAll("path").transition().duration(500).attr("stroke", color_scale(1))

}


function Light_RadarChart(){
    current_euro=light_eurotram;
    current_tram=light_tramtrain;

    color_scale_radar = d3.scaleOrdinal()
    .domain([0,1])
    .range([current_euro, current_tram])

    radarchart=d3.select("div#radarChart");
    radarchart.transition().duration(500).style("background-color",light_background);
    radarchart.selectAll("circle.outer.circle").transition().duration(500).style("stroke",light_axis);
    radarchart.selectAll("text").transition().duration(500).style("fill",light_axis)
    radarchart.selectAll(".radii_lines.texto").transition().duration(500).style("stroke",light_axis);
    radarchart.select(".labels").select("rect.euro_label").transition().duration(500).style("fill",light_eurotram).style("stroke",current_axis);
    radarchart.select(".labels").select("rect.tram_label").transition().duration(500).style("fill",light_tramtrain).style("stroke",current_axis);

    radarchart.select("g.data_circles").selectAll("circle").transition().duration(500).style("fill", (d,i) => color_scale_radar(Math.floor(i/19)))
    radarchart.select("g.passengers_line").selectAll("path").transition().duration(500).attr("stroke", color_scale(0))
    radarchart.select("g.covid_line").selectAll("path").transition().duration(500).attr("stroke", color_scale(1))
}


function Light_Buttons(){
    d3
    .select("#selectButton1")
    .transition().duration(500)
    .style("background-color", "white")
    .style("color",light_font);
    d3
    .select("#selectButton2")
    .transition().duration(500)
    .style("background-color", "white")
    .style("color",light_font);
    
    d3
    .select("#Reset_Time")
    .transition().duration(500)
    .style("background-color", "white")
    .style("color",light_font);

    d3
    .select("#Dark")
    .transition().duration(500)
    .style("background-color", "white")
    .style("color",light_font);

    d3
    .select("#lightanddark")
    .transition().duration(500)
    .style("background-color", "white")
    
}


function Light_Sankey(){
    sankey=d3.select("div#sankeyDiagram");
    sankey_over_links=light_sankey_over_link;
    color_sankey_link=light_sankey_link;
    sankey_node_stroke="black"
    sankey.transition().duration(500).style("background-color", light_background);
    sankey.selectAll("text").transition().duration(500).style("fill",light_axis);
    sankey.selectAll("g.link").selectAll("path").transition().duration(500).style("stroke", color_sankey_link)
    sankey.selectAll("g.node").selectAll("rect").transition().duration(500).style("stroke", sankey_node_stroke)

}

function Light_Transit(){
    map=d3.select("div#map");

    color_transit_red=light_red;
    color_transit_grey=light_grey;
    color_transit_corners=light_corners;

    map.selectAll("g.node").selectAll("circle.corners").transition().duration(500).style("fill", color_transit_corners)
    map.selectAll("g.node").selectAll("circle.greys").transition().duration(500).style("fill", color_transit_grey)
    map.selectAll("g.node").selectAll("circle.non-grey-stations").transition().duration(500).style("fill", color_transit_red)
    map.selectAll("g.link").selectAll("line.greys").transition().duration(500).style("stroke", color_transit_grey)

    map.transition().duration(500).style("background-color",light_background);
    map.select(".scale").selectAll("text").transition().duration(500).style('fill',light_axis);
    map.select(".scale").select(".axis").selectAll("line").transition().duration(500).style('stroke',light_axis);
    map.select(".scale").select(".axis").selectAll("path").transition().duration(500).style('stroke',light_axis);
    map.selectAll("text").transition().duration(500).style('fill',light_axis);
    map.selectAll("g.additional_info_titles").selectAll("line").transition().duration(500).style("stroke",light_dash);

}