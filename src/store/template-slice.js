import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
	templates: null,
	categorizedTemp: null,
	tempCategory: "All",
	loading: "pending",
};

// FETCH DATA
export const fetchTemplate = createAsyncThunk(
	"template/fetchTemplate",
	async () => {
		let base =
			"https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates";

		const data = axios.get(base).then((response) => {
			return response.data;
		});

		return data;
	}
);

const TemplateSlice = createSlice({
	name: "template",
	initialState,
	reducers: {
		// FILTER BY CATEGORY
		getTempCat: (state, { payload }) => {
			state.tempCategory = payload;
			if (payload === "All") {
				state.categorizedTemp = state.templates;
			} else {
				state.categorizedTemp = state.templates.filter((item) => {
					return item.category.includes(payload);
				});
			}
		},

		//SEARCH TEMPLATES
		searchTemp: (state, { payload }) => {
			if (payload.input.length <= 0) {
				state.categorizedTemp = state.templates;
			} else {
				let search = state.categorizedTemp.filter((item) => {
					return item.name.includes(payload.input.toLowerCase());
				});

				state.categorizedTemp = search;
			}
		},

		//FILTER BY ALPHABETICAL ORDER
		tempFormatOrder: (state, { payload }) => {
			if (state.unSortedTemp === null) {
				state.unSortedTemp = state.categorizedTemp;
			}

			state.categorizedTemp.sort((a, b) => {
				let nameA = a.name.toLowerCase();
				let nameB = b.name.toLowerCase();

				
				if (payload === "Asc") {

					// Filter in Ascending order
					if (nameA < nameB) {
						return -1;
					}

					if (nameA > nameB) {
						return 1;
					}

					return 0;
				} else if (payload === "Dsc") {

					// Filter in Descending order
					if (nameA < nameB) {
						return 1;
					}

					if (nameA > nameB) {
						return -1;
					}

					return 0;
				}
			});
		},

		// FILTER BY DATE

		tempFormatDate: (state, { payload }) => {
			if (state.unSortedTemp === null) {
				state.unSortedTemp = state.categorizedTemp;
			}

			state.categorizedTemp.sort((a, b) => {
				let dateA = a.created.replace(/[: . T -]/g, "");
				let dateB = b.created.replace(/[: . T -]/g, "");


				if (payload === "Asc") {
					// Filter in Ascending order
					if (dateA < dateB) {
						return -1;
					}

					if (dateA > dateB) {
						return 1;
					}

					return 0;
				} else if (payload === "Dsc") {

					// Filter in Descending order
					if (dateA < dateB) {
						return 1;
					}

					if (dateA > dateB) {
						return -1;
					}

					return 0;
				}
			});
		},
	},

	// EXTRA-REDUCERS TO RESOLVE GET REQUEST
	extraReducers: {
		[fetchTemplate.pending]: (state) => {
			state.loading = "pending";
		},

		[fetchTemplate.fulfilled]: (state, { payload }) => {
			state.loading = "loaded";
			state.templates = payload;
			state.categorizedTemp = payload;
		},

		[fetchTemplate.rejected]: (state) => {
			state.loading = "rejected";
		},
	},
});

export const templateActions = TemplateSlice.actions;
export default TemplateSlice;
