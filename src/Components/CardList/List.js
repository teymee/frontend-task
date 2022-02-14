import React, { useState } from "react";
import Card from "./Card";
import "./card.css";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

function List() {
	const [curPage, setCurPage] = useState(0);

	// PAGE CHANGE
	const pageChange = ({ selected }) => {
		return setCurPage(selected);
	};

	// REDUXTOOLKIT STATES
	const { categorizedTemp, tempCategory } = useSelector(
		(state) => state.template
	);

	// INITIALIZATIONS
	let card, pagNum, pageCount, finalData;
	finalData = categorizedTemp;
	pageCount = 15;

	// PAGINATION CODE-BLOCK
	if (finalData !== null) {
		let pageVisited = curPage * pageCount;
		let tempList = finalData.slice(pageVisited, pageVisited + pageCount);
		pagNum = Math.ceil(finalData.length / pageCount);
		card = tempList.map((item, index) => {
			return <Card details={item} key={index} />;
		});
	}

	return (
		<>
			{/* NOTIFICATION BAR */}
			<div className="notification text-center py-4 md:px-9">
				Tada! Get started with a free template. Can’t find what you are looking
				for? Search from the 1000+ available templates
			</div>

			{/* SUBNAV */}
			<div className=" mt-20 flex justify-between header ">
				<h5 className="text-md ">{tempCategory} Templates</h5>
				<h5 className="text-slate-400 text-sm">
					{finalData && finalData.length} Templates
				</h5>
			</div>

			{/* TEMPLATE LIST */}
			<div
				className=" grid md:grid-cols-3 lg:gap-x-24 md:gap-5 sm:grid-cols-2   cardList"
				data-testid={`test-1`}
			>
				{card}
			</div>

			{/* PAGINATION */}
			<Pagination curPage={curPage} pagNum={pagNum} pageChange={pageChange} />
		</>
	);
}

export default List;
