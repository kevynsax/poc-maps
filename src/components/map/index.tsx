import React, {Component} from "react";
import L, {LeafletEvent, Map} from "leaflet";
import 'leaflet-draw'
import './maps.scss';


export class Maps extends Component{
    myMap: Map | undefined;

    componentDidMount(): void {
        this.myMap = L.map('mapId').setView([-23.6013319,-46.622806], 12);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoia2V2eW5zYXgiLCJhIjoiY2pzbmRsMjBrMGI4ODQ5bzIydW5hODN0aSJ9.ZSuX8_0hz6ZNLFOLqWBjrw'
        }).addTo(this.myMap);

        // const drawnItems = new L.FeatureGroup();
        // this.myMap.addLayer(drawnItems);
        // const drawControl = new L.Control.Draw({
        //     draw: {
        //         polygon: false,
        //         circle: false,
        //         marker: false,
        //         circlemarker: false,
        //         rectangle: false
        //     },
        //     edit: {
        //         featureGroup: drawnItems
        //     }
        // });
        // this.myMap.addControl(drawControl);
        //
        // this.myMap.on(L.Draw.Event.CREATED, (e) => {
        //     const layer = e.layer;
        //
        //     drawnItems.clearLayers();
        //     drawnItems.addLayer(layer);
        //     console.log(layer);
        // });
        //
        // this.myMap.on(L.Draw.Event.EDITED, (e: any) => e.layers.eachLayer(console.log));
    }

    render = () => <div id="mapId" style={{height: '320px', width: '600px'}}/>
}