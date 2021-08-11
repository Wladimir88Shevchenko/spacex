import React from "react";
import './loader.css';

const Loader = () => {
    return (
        <div className="progress loaderLine">
            <div className="indeterminate"></div>
        </div>
    );
};

export default Loader;
