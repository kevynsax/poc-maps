import React, {Component} from "react";

interface StateForm{
    
}

export class Form extends Component{


    render = () => (
        <div className="form">
            <input type="text" placeholder="name"/>
            <input type="text" placeholder="shipping fee"/>
            <button type="button">Add</button>
        </div>
    )
}