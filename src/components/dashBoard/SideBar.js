import React from 'react';
import CollapsePannel from '../common/CollapsePannel';

const SideBar = ({brand, flavour, packSize, onFilterChange, onCollapse, openFilter}) => {
    return (
        <div>
            <CollapsePannel
                filterName = 'brand'
                filterOptions = {brand}
                onChangeFilter = {onFilterChange}
                nameToShow = 'Brands'
                onCollapse = {onCollapse}
                openFilter = {openFilter}
            />
            <br/>
            <CollapsePannel
                filterName = 'flavour'
                filterOptions = {flavour}
                onChangeFilter = {onFilterChange}
                nameToShow = 'Flavours'
                onCollapse = {onCollapse}
                openFilter = {openFilter}
            />
            <br/>
            <CollapsePannel
                filterName = 'packSize'
                filterOptions = {packSize}
                onChangeFilter = {onFilterChange}
                nameToShow = 'Package Size'
                onCollapse = {onCollapse}
                openFilter = {openFilter}
            />
        </div>
    );
}

export default SideBar;