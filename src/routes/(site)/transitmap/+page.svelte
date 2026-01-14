<script> 
import { onMount } from 'svelte'; 
import Papa from 'papaparse';
let { data } = $props();

// import { env } from "$env/statuc/private";
// const PUBLIC_GOOGLE_MAPS_API = env.PUBLIC_GOOGLE_MAPS_API
import { PUBLIC_GOOGLE_MAPS_API } from '$env/static/public';
let mapEl;
let map; 
let stops;
let routes; 
let businesses;
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Set the options for loading the API.

// Start loading the libraries needed for custom elements.

async function loadMap() {
    await fetch('timetable/routes.txt')
        .then(res => res.text())
        .then(text => Papa.parse(text))
        .then(json => {routes = json.data})
    let hi = await fetch('/transitmap', {
        method: 'POST'
    })
    setOptions({ key: PUBLIC_GOOGLE_MAPS_API });

    
    
    const {Map, Data, InfoWindow} = await importLibrary("maps"); // needed for <gmp-map>
    const {AdvancedMarkerElement} = await importLibrary("marker")
    let mapOptions = {
        center: { lat: 46.7, lng: 8.5 },
        zoom: 8.8,
        mapId: "d46717e38456575fbcd8e4e3"
    }
    try {
        map = new Map(mapEl, mapOptions);
        let colormap = {}
        await fetch('businesses.csv')
            .then(res => res.text())
            .then(data=>Papa.parse(data))
            .then(out => out.data.filter(x => x!=undefined && x.length ==23))
            .then(x => {
                x.forEach(element => {
                    element[18] = Number(element[18].substring(1))
                });
                return x
            }).then(x=>{businesses=x})
        await fetch('company-lines.geojson')
            .then(res => res.json())
            .then(json => {
                for (const feature of json.features) {
                    if (!(feature.properties.operator_number in colormap)) {
                        colormap[feature.properties.operator_number] = getRandomColor();
                    }
                }
                return json;
            })
            .then(data => {
                var infowindow = new InfoWindow();
                routes = new Data()
                routes.addGeoJson(data)
                routes.setStyle(feature => ({
                    strokeColor: colormap[feature.getProperty('operator_number')],
                    strokeWeight: 6,
                }));
                routes.setMap(map)
                routes.addListener('mouseover', (event)=>{
                    var id = event.feature.getProperty('operator_number');
                    let gauge = event.feature.getProperty('operator_gauge')
                    var myHTMLss = '<table>' +
                    '<tr><td>Abbr:</td><td>' + businesses.find(x=>x[18]==id)[10] + '</td></tr>' +
                    '<tr><td>Name:</td><td>' + businesses.find(x=>x[18]==id)[9]+ '</td></tr>' +
                    '<tr><td>ID:</td><td>' + id + '</td></tr>' +
                    '<tr><td>Gauge:</td><td>' + gauge + '</td></tr>' +
                    '</table>';
                    infowindow.setContent(myHTMLss);
                    infowindow.setPosition(event.latLng);
                    infowindow.open(map);
                });
                routes.addListener('mouseout', (event)=>{
                    infowindow.close()
                });
            });
    } catch (e) {
        console.error(e)
    }
}

// Wait for gmp-map to be upgraded and interact with it.
onMount(()=>{
    loadMap()
})
</script>
<div bind:this={mapEl}></div>

<style>
    div {
        height: 100vh;
        width: 100%;
    }
</style>