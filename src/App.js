import "./App.css";
import { useDispatch } from "react-redux";
import { fetchTemplate, templateActions } from "./store/template-slice";

import CardList from "./CardList/CardList";
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import { useEffect } from "react";




function App() {
	const dispatch = useDispatch()
	
		useEffect(() => {
			dispatch(fetchTemplate())
	}, [dispatch]);

	return (
		<div className="App container-lg mx-auto">
			<Search />
			<div className="notification text-center py-4 md:px-9">
				Tada! Get started with a free template. Can’t find what you are looking
				for? Search from the 1000+ available templates
			</div>

			<CardList />
		
		</div>
	);
}

export default App;
