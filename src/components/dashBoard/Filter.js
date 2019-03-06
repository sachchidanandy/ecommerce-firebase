import React from 'react';
import SideBar from './SideBar';

const Filter = ({heading, filterList, onCollapse, onFilterChange, openFilter}) => {
    return (
        <div className = "card">
            <div className = "card-header"style = {{textAlign : 'center', color : '#232f3e'}}>
                <h3>{heading}</h3>
            </div>
            <div className="card-body" style = {{backgroundColor : '#232f3e'}}>
                <SideBar
                    {...filterList}
                    onCollapse = {onCollapse}
                    onFilterChange = {onFilterChange}
                    openFilter = {openFilter}
                />
            </div>
        </div>
    );
}

export default Filter;