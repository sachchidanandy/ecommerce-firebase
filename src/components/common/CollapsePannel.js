import React from 'react';
import CheckBox from './CheckBox';

const CollapsePannel = ({filterName, filterOptions, onChangeFilter, nameToShow, onCollapse, openFilter}) => {
    return (
        <div className = "card">
            <div className = "card-header">
                <h4 className = "mb-0">
                    <button  className= "btn btn-block" type="button" name = {filterName} aria-expanded="true" onClick = {onCollapse}>
                        {nameToShow}
                    </button>
                </h4>
            </div>
            <div className = {'card-body collapse' + (openFilter[filterName] ? 'Off' : '')}>
                { 
                    filterOptions.map(data => <CheckBox
                        key = {data.name}
                        value = {data.name}
                        onChange = {onChangeFilter}
                        filterName = {filterName}/>
                    )
                }
            </div>
        </div>
    );
}

export default CollapsePannel;