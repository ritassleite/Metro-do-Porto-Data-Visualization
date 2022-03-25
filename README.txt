# Metro do Porto Visualization 
 
The project Metro do Porto Visualization consists on a visualization about the traffic in Metro do Porto network between January 2018 and February 2021. It was created within the course Information Visualization at Instituto Superior Técnico.

This txt file contains instructions to utilize our visualization. 

## Folder's Structure

The structure of the project consists on 8 javascript files, 2 datasets (1 json file and 1 csv file), 1 style.css file and an external d3 library for the sankey diagram. The d3 version 7 was used to build visualization.
During the process of designing the visualization, the Visual Studio Code extension, Live Server (ritwickdey.liveserver) was used to create a local host and see the html file live.

## Instructions

This visualization was designed to be seen at 100% zoom at the browser.
Our dashboard have 4 implemented idioms and the way the user interact with them is pretty straightforward:

### Dropdown selection buttons 

We have 2 dropdown buttons where the user can filter the presented data. The 2 choices represent origin station A and destination station B. The cases considered are the following:

> 0 or 1 selected st.      < dashboard represents the data from the entire network; transit map is fully encoded;
> 2 equal selected st.     < window alert appear; dashboard similar to the previous case;
> 2 different selected st. < transit map is reduced to the path between stations; links and scale update to encode its occupancy rate; the remaining idioms are updated with the filtered data between stations;

Once 2 different stations have been selected, the user is able to go back to the entire network by unselecting them, i.e, select the options "select station A/B"

### Brushing 

The user is also able to select the interval of months he wants to filter. Brushing on Linechart was implemented and it allows o selected a time interval for the months on x Axis. The idioms that depend on time will also update (radarchart and transitmap link colors).

### Reset Time Button

To reset the selected time interval on Linechart brushing one just needs to click the "Reset Time" button. The interval of months will then be the default one (jan 2018 - feb 2021).

### Theme Button

This button functionalities are purely aesthetic. It changes the default color pallete (light mode) to a more eye friendly pallete (darkmode) and vice versa.

## Help Buttons

By clicking on this buttons, one can get specific additional information about the related idiom. Once it gets clicked, it needs another click to make the tooltip disappear

### Hovering

The user can also get information by hovering ite mouse on a large variety of marks across the dashboard

# Authors

Gonçalo Marques - 92630
João Fernandes - 92635
Rita Leite - 92646
                              