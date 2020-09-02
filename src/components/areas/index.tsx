import React, {Component} from "react";
import {Maps} from "../map";
import "./areas.scss";
import {divIcon} from "leaflet";
import {Form} from "./form";

interface LatLng{
    lat: number;
    lng: number;
}
interface Area {
    name: string;
    shippingFee: number;
    polygon: LatLng[];
}

const myAreas: Area[] = [
    {
        name: 'Vila Mariana',
        shippingFee: 13,
        polygon: [
            { lat: -23.575735196340197, lng: -46.62225723965094 },
            { lat: -23.58758709569398, lng: -46.62734985351563 },
            { lat: -23.598284349761048, lng: -46.62117004394532 },
            { lat: -23.62072477107451, lng: -46.591701514553286 },
            { lat: -23.608036968133725, lng: -46.646232604980476 },
            { lat: -23.633306504324473, lng: -46.69366837246344 },
            { lat: -23.601115829818816, lng: -46.681938171386726 },
            { lat: -23.56912703656044, lng: -46.683368689846255 }
        ]
    }
];

export class Areas extends Component{

    render = () => (
        <div className="area">
            <Maps/>
            {this.renderListAreas()}
        </div>
    );

    renderListAreas = () => (
        <div className="areas">
            <h5>Registered Areas</h5>
            <Form />
            <div className="listAreas">
                {myAreas.map(this.renderArea)}
            </div>
        </div>
    );

    renderArea = (area: Area) => (
        <div className="item">
            <span>{area.name}</span>
            <span>{area.shippingFee}</span>
        </div>
    );
}