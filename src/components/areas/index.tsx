import React, {Component} from "react";
import {Maps} from "../map";
import "./areas.scss";
import {Form} from "./form";
import {Area, LatLng} from "../types";


const myAreas: Area[] = [
    {
        id: 1,
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

interface StateAreas {
    lstAreas: Area[];
    selectedArea: Area | undefined;
}

export class Areas extends Component<{},StateAreas>{
    state = {
        lstAreas: [...myAreas],
        selectedArea: undefined
    };

    private addArea = (area: Area) => {
        const {lstAreas} = this.state;

        const newId = Math.max(...lstAreas.map(x => x.id as number)) + 1;
        area.id = newId;
        const newAreas = [...lstAreas, area];
        this.setState({selectedArea: area, lstAreas: newAreas});
    };

    public render = () => (
        <div className="area">
            <Maps areas={this.state.lstAreas} editingArea={this.state.selectedArea} onChangeArea={this.handleChangeArea}/>
            {this.renderListAreas()}
        </div>
    );

    private handleChangeArea = (polygon: LatLng[]) => {
        const {selectedArea, lstAreas} = this.state;

        if(!selectedArea)
            return;

        const editedArea = selectedArea || {} as Area;
        editedArea.polygon = polygon;

        const newLstAreas = [...lstAreas.filter(x => editedArea?.id !== x.id), editedArea];

        this.setState({selectedArea: undefined, lstAreas: newLstAreas})
    };

    private renderListAreas = () => (
        <div className="areas">
            <h5>Registered Areas</h5>
            <Form onAdd={this.addArea} />
            <div className="listAreas">
                {this.state.lstAreas.map(this.renderArea)}
            </div>
        </div>
    );

    private renderArea = (area: Area, index: number) => {
        const styleActive = this.state.selectedArea === area ? 'active' : '';
        return (
            <div className={`item ${styleActive}`} onClick={() => this.selectArea(area)} key={index}>
                <span>{area.name}</span>
                <span>{area.shippingFee}</span>
            </div>
        );
    };

    private selectArea = (area: Area) => {
        this.setState({selectedArea: area});
    }
}