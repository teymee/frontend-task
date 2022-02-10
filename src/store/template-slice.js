import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

let initialState = {
	templates: null,
	categorizedTemp: null,

	tempCategory: "All",

	loading: "pending",
};

const TemplateSlice = createSlice({
	name: "template",
	initialState,
	reducers: {
		getTempCat: (state, { payload }) => {
			state.tempCategory = payload;
			if (payload === "All") {
				state.categorizedTemp = state.templates;
			} else {
				let catTemplate = state.templates.filter((item) => {
					return item.category.includes(payload);
				});

				state.categorizedTemp = catTemplate;
			}
		},

		searchTemp: (state, { payload }) => {
			let search = state.categorizedTemp.filter((item) => {
				return item.name.includes(payload.input);
			});

			state.categorizedTemp = search;
		},

		tempFormatOrder: (state, { payload }) => {
			if (payload === "Default") {
				state.categorizedTemp = state.templates;
			}

			state.categorizedTemp.sort((a, b) => {
				let nameA = a.name.toLowerCase();
				let nameB = b.name.toLowerCase();

				if (payload === "Asc") {
					if (nameA < nameB) {
						return -1;
					}

					if (nameA > nameB) {
						return 1;
					}

					return 0;
				} else if (payload === "Dsc") {
					if (nameA < nameB) {
						return 1;
					}

					if (nameA > nameB) {
						return -1;
					}

					return 0;
				}
			});

			// if (payload === "Dsc") {
			// 	state.categorizedTemp.sort((a, b) => {
			// 		let nameA = a.name.toLowerCase();
			// 		let nameB = b.name.toLowerCase();

			// 		if (nameA < nameB) {
			// 			return 1;
			// 		}

			// 		if (nameA > nameB) {
			// 			return -1;
			// 		}

			// 		return 0;
			// 	});
			// }
		},

		// DATE FORMAT

		tempFormatDate: (state, { payload }) => {
			if (payload === "Default") {
				state.categorizedTemp = state.templates;
			}

			state.categorizedTemp.sort((a, b) => {
				let dateA = a.created.replace(/[: . T -]/g, "");
				let dateB = b.created.replace(/[: . T -]/g, "");

				if (payload === "Asc") {
					if (dateA < dateB) {
						return -1;
					}

					if (dateA > dateB) {
						return 1;
					}

					return 0;
				} else if (payload === "Dsc") {
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

	extraReducers: {
		[fetchTemplate.pending]: (state) => {
			state.loading = "pending";
		},

		[fetchTemplate.fulfilled]: (state, { payload }) => {
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
