import React from "react";
import './DataDash.css'

function DataDash(props) {

    return (
        <div className="containerDash">
        <div className="dashboardContents">
            <div className="menuName">
                {props.productName}
            </div>
            <div className="menuCost">
                {props.productWholesalePrice}
            </div>
            <div className="menuRetail">
                {props.productRetailPrice}
            </div>
            <div className={(props.productQuantity < 10 && props.productQuantity > 1 ? 'lowStock' : props.productQuantity === 0 ? 'noStock' : 'menuQuantity')}>
            
                {props.productQuantity}
            </div>
            <div className="menuDescription">
                {props.productDescription}
            </div>

        </div>
        </div>
    );
}

export default DataDash;
