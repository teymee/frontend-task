import React from "react";
import ReactPaginate from "react-paginate";
import "./card.css";

function Pagination({ curPage, pageChange, pagNum }) {
	return (
		<ReactPaginate
			previousLabel={curPage === 0 ? "Previous" : "< Previous"}
			nextLabel={curPage === pagNum - 1 ? "Next" : "Next >"}
			breakLabel="..."
			onPageChange={pageChange}
			pageCount={pagNum}
			pageRangeDisplayed={2}
			marginPagesDisplayed={2}
			containerClassName="pagination md:w-1/4  text-sm py-10 lg:pt-20"
			previousClassName="indicator "
			nextClassName="indicator"
			activeLinkClassName="active-page"
		/>
	);
}

export default Pagination;
