import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplate } from "./store/template-slice";

import CardList from "./CardList/CardList";
import Search from "./Search/Search";
import { useEffect } from "react";
import Preloader from "./Preloader/Preloader";

function App() {
	const { loading } = useSelector((state) => state.template);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTemplate());
	}, [dispatch]);

	let content;

	if (loading !== "loaded") {
		content = <Preloader />;
	} else {
		content = (
			<div className="App container-lg mx-auto">
				<Search />
				<div className="notification text-center py-4 md:px-9">
					Tada! Get started with a free template. Can’t find what you are
					looking for? Search from the 1000+ available templates
				</div>

				<CardList />
			</div>
		);
	}

	return content	;
}

export default App;
