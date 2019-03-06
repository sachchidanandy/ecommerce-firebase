import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationBar = ({onChoosePage, totalPage, onNextOrPrevPage}) => {
    const pageNumbers = [...Array(totalPage)].map((val, key) => key+1);

    function pageNumber(value) {
       return( 
            <PaginationItem key = {value}>
                <PaginationLink onClick = {onChoosePage} value = {value}>{value}</PaginationLink>
            </PaginationItem>
        );
    }
    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink previous onClick = {onNextOrPrevPage} value = 'previous'/>
            </PaginationItem>
            { pageNumbers.map ( value => pageNumber(value))}
            <PaginationItem>
                <PaginationLink next onClick = {onNextOrPrevPage} value = 'next' />
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationBar;