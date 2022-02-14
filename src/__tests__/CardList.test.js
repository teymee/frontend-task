import { render, screen, cleanup } from "@testing-library/react";

import { Provider } from "react-redux";
import store from "../store";
import List from "../Components/CardList/List";

afterEach(() => {
	cleanup();
});


//TEST FOR LIST COMPONENT

describe("TempList", () => {
	it("Render List component", async () => {
		render(
			<Provider store={store}>
				<List />
			</Provider>
		);
		const cardListElement = await screen.findByTestId("test-1");
		expect(cardListElement).toBeInTheDocument();
	});
});
