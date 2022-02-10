import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import Card from "./Card";
import "./card.css";

function CardList() {
	const { templates, loading, categorizedTemp, tempCategory } = useSelector(
		(state) => state.template
	);

	const [curPage, setCurPage] = useState(0);

	let pageCount = 15;

	const pageChange = ({ selected }) => {
		return setCurPage(selected);
	};

	let card, pagNum, finalData;
	if (categorizedTemp !== null) {
		finalData = categorizedTemp;

		let pageVisited = curPage * pageCount;

		let tempList = finalData.slice(pageVisited, pageVisited + pageCount);

		pagNum = Math.ceil(finalData.length / pageCount);
		card = tempList.map((item) => {
			return (
				<Card
					name={item.name}
					description={item.description}
					link={item.link}
					date={item.created}
				/>
			);
		});
	}

	return (
		<>
			<div className=" mt-20 flex justify-between header " >
				<h5 data-testid="test-1 " className="text-md ">{tempCategory} Templates</h5>
				<h5 className="text-slate-400 text-sm">
					{finalData !== undefined && finalData.length} Templates
				</h5>
			</div>
			<div className=" grid md:grid-cols-3 lg:gap-x-24 md:gap-5 sm:grid-cols-2   cardList">
				{finalData !== null && card}
			</div>
			<ReactPaginate
				previousLabel={curPage === 0 ? "Previous" : "< Previous"}
				nextLabel={curPage === pagNum - 1 ? "Next" : "Next"}
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
		</>
	);
}

export default CardList;
