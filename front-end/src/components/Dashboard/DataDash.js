import React from "react";
import './DataDash.css'

function DataDash(props) {
    const productID = "3"
    const productName = 'Candle'
    const productWholesalePrice = '$4'
    const productRetailPrice = '$55'
    const productQuantity = '500'
    const productDescription = 'Ripper candle'
    const productType = 'Candle'


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
