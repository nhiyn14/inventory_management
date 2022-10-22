import React from "react";
import './DataDash.css'

function DataDash(props) {

    return (
        <div className="containerDash">
        <div className="dashboardContents">
            <div className="dashProductName">
                {props.productName}
            </div>
            <div className="dashProductWholesalePrice">
                {props.productWholesalePrice}
            </div>
            <div className="dashProductRetailPrice">
                {props.productRetailPrice}
            </div>
            <div className="dashProductQuantity">
                {props.productQuantity}
            </div>
            <div className="dashproductDescription">
                {props.productDescription}
            </div>

        </div>
        </div>
    );
}

export default DataDash;
