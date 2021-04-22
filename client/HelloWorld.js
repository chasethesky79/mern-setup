import { hot } from "react-hot-loader";
import React from 'react';

const HelloWorld = () => {
    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

export default hot(module)(HelloWorld)