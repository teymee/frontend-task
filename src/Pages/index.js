import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplate } from "../store/template-slice";

import CardList from "../Components/CardList";
import Search from "../Components/Search";
import Preloader from "../Components/Preloader/Preloader";

function Home() {
	const { loading } = useSelector((state) => state.template);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTemplate());
	}, [dispatch]);

	let content;

	// LOAD CONTENT AFTER HTTP REQUEST HAS BEEN RESOLVED
	loading !== "loaded"
		? (content = <Preloader />)
		: (content = (
				<div className="App container-lg mx-auto">
					<Search />
					<CardList />
				</div>
		  ));

	return content;
}

export default Home;
