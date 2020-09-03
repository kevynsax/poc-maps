import React, {ChangeEventHandler, Component} from "react";
import {Area} from "../types";

interface StateForm{
    name: string,
    shippingFee: number
}

interface PropsForm {
    onAdd: (area: Area) => void
}

export class Form extends Component<PropsForm, StateForm>{
    state = {
        name: '',
        shippingFee: 0,
    };

    render = () => (
        <div className="form">
            <input type="text" placeholder="name" onChange={this.setName}/>
            <input type="text" placeholder="shipping fee" onChange={this.setShippingFee}/>
            <button type="button" onClick={this.handleClickAddButton}>Add</button>
        </div>
    );

    private setName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.setState({name: value});
    };

    private setShippingFee = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =parseInt(e.target.value);
        this.setState({shippingFee: value});
    };

    private handleClickAddButton = () => {
        const {name,shippingFee} = this.state;

        this.props.onAdd({
            name,
            shippingFee,
            polygon: []
        });
    }
}