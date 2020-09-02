import React from 'react';
import {Maps} from "./components/map";
import {Areas} from "./components/areas";

function App() {
    return (
        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
            <div className="App">
                <Areas/>
            </div>
        </div>
    );
}

export default App;
