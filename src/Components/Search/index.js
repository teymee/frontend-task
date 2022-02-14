import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "./search.css";
import { BsSearch } from "react-icons/bs";
import { templateActions } from "../../store/template-slice";

function Search() {
	const [tempCat, setTempCat] = useState("All");
	const [tempOrder, setTempOrder] = useState("Default");
	const [tempDate, setTempDate] = useState("Default");
	const inputEl = useRef();

	const dispatch = useDispatch();

	// FILTER BY CATEGORY
	const changeCategory = (event) => {
		inputEl.current.value = "";
		let category = event.target.value;

		// Reset date & order to default
		setTempDate("Default");
		setTempOrder("Default");

		// Dispatch category filter action
		setTempCat(category);
		dispatch(templateActions.getTempCat(category));
	};

	// FILTER BY ALPHABETIC ORDER
	const orderFormat = (event) => {
		let order = event.target.value;
		setTempOrder(order);

		// Reset date to default
		setTempDate("Default");

		// Dispatch order filter action
		dispatch(templateActions.tempFormatOrder(order));
	};

	// FILTER BY DATE
	const dateFormat = (event) => {
		let format = event.target.value;
		setTempDate(format);

		// Reset order to default
		setTempOrder("Default");

		// Dispatch date filter action
		dispatch(templateActions.tempFormatDate(format));
	};

	// SEARCH DISPATCH ACTION
	const searchTemp = (e) => {
		e.preventDefault();
		let input = inputEl.current.value;

		dispatch(
			templateActions.searchTemp({
				category: tempCat,
				input,
			})
		);
	};

	return (
		<div className="nav lg:flex lg:justify-between">
			{/* SEARCH FORM */}
			<form
				className="search-form flex justify-between  items-center lg:w-1/4 "
				onSubmit={searchTemp}
			>
				<input
					type="text"
					placeholder="Search Templates"
					ref={inputEl}
					className="w-5/6 py-3 px-3"
				/>
				<span className=" px-5">
					<BsSearch />
				</span>
			</form>


			{/* DROPDOWNS */}
			<div className="filter lg:flex lg:justify-between items-center lg:w-2/5 ">
				<p className="px-1">Sort By:</p>

				{/* CATEGORY DROPDOWN */}
				<div className="filter-form px-5 py-2  ">
					<label> Category</label>
					<select className="l" onChange={changeCategory}>
						<option>All</option>
						<option value={"Education"}>Education</option>
						<option value={"E-commerce"}>E-commerce</option>
						<option value={"Health"}>Health</option>
					</select>
				</div>

				{/* ORDER DROPDOWN */}
				<div className="filter-form px-5 py-2 ">
					<label> Order</label>
					<select className=" " onChange={orderFormat} value={tempOrder}>
						<option value={"Default"}>Default</option>
						<option value={"Asc"}>Ascending</option>
						<option value={"Dsc"}>Descending</option>
					</select>
				</div>

				{/* DATE DROPDOWN */}
				<div className="filter-form px-5 py-2 ">
					<label> Date</label>
					<select className=" " onChange={dateFormat} value={tempDate}>
						<option value={"Default"}>Default</option>
						<option value={"Asc"}>Ascending</option>
						<option value={"Dsc"}>Descending</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default Search;
