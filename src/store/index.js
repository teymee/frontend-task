import { configureStore } from "@reduxjs/toolkit";
import TemplateSlice from "./template-slice";

const store = configureStore({
	reducer: { template: TemplateSlice.reducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: { warnAfter: 700 },
			serializableCheck: { warnAfter: 700 },
		}),
});

export default store;
