import React from "react";
import { useSelector } from "react-redux";

import "./card.css";
import NotFound from "./NotFound";
import List from "./List";

function CardList() {
	const { categorizedTemp } = useSelector(
		(state) => state.template
	);

	return (
		<>
			{categorizedTemp.length === 0 ? (
				<NotFound />
			):(
				<List />
			)}
		</>
	);
}

export default CardList;
