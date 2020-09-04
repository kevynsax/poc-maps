import React, {Component} from "react";
import L, {Control, Layer, LayerGroup, LeafletEvent, Map, Polygon} from "leaflet";
import 'leaflet-draw'
import './maps.scss';
import {Area, LatLng} from "../types";

interface PropsMaps {
    areas: Area[];
    editingArea: Area | undefined;
    onChangeArea: (polygon: LatLng[]) => void
}


export class Maps extends Component<PropsMaps>{
    myMap: Map | undefined;
    polygons: Polygon[] = [];

    drawnItems: LayerGroup | undefined;
    drawControl: any;

    componentDidMount(): void {
        this.createMap();
        this.initializeLayersMap();
    }

    componentDidUpdate(): void {
        this.initializeLayersMap()
    }

    private initializeLayersMap = () => {
        this.createAreas();
        this.openUpEditor();
    };

    render = () => <div id="mapId" style={{height: '320px', width: '600px'}}/>

    private createMap = () => {
        this.myMap = L.map('mapId').setView([-23.6013319,-46.622806], 12);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoia2V2eW5zYXgiLCJhIjoiY2pzbmRsMjBrMGI4ODQ5bzIydW5hODN0aSJ9.ZSuX8_0hz6ZNLFOLqWBjrw'
        }).addTo(this.myMap);
    };

    private createAreas = () => {
        this.polygons.forEach(p => this.myMap?.removeLayer(p));

        if(!this.myMap || !!this.props.editingArea)
            return;

        this.polygons = this.props.areas
            .map(area => new L.Polygon(area.polygon).addTo(this.myMap as Map));
    };

    private openUpEditor = () => {
        const clear = () => {
            if(!this.drawControl || !this.drawnItems)
                return;

            this.myMap?.removeControl(this.drawControl);
            this.myMap?.removeLayer(this.drawnItems as Layer);
        };

        clear();

        if(!this.myMap || !this.props.editingArea)
            return;

        this.drawnItems = new L.FeatureGroup([new L.Polygon(this.props.editingArea.polygon)]);
        this.myMap.addLayer(this.drawnItems);
        this.drawControl = new L.Control.Draw({
            draw: {
                polygon: false,
                circle: false,
                marker: false,
                circlemarker: false,
                rectangle: false
            },
            edit: {
                featureGroup: this.drawnItems as any
            }
        });
        this.myMap.addControl(this.drawControl);

        const updatePolygon = (polygon: LatLng[]) => {
            this.props.onChangeArea(polygon);
            clear();
        };

        this.myMap.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;

            this.drawnItems?.clearLayers();
            this.drawnItems?.addLayer(layer);

            const polygon = layer.editing.latlngs[0];
            updatePolygon(polygon);
        });

        this.myMap.on(L.Draw.Event.EDITED, (e: any) => e.layers.eachLayer((layer: any) => {
            const polygon = layer.editing.latlngs[0][0] as LatLng[];
            updatePolygon(polygon)
        }));
    }
}