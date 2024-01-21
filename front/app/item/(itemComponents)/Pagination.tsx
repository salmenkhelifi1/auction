import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default Pagination;
