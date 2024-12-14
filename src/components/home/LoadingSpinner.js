import React from "react";
import "../../styles/barraCarga.css"; 

const LoadingSpinner = ({ mensaje }) => {
    return (
        <div className="loading-container">
            <h1>{mensaje}</h1>
            <div className="loading-circle"></div>
        </div>
    );
};

export default LoadingSpinner;
