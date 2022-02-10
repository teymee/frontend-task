import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./search.css";
import { BsSearch } from "react-icons/bs";
import { templateActions } from "../store/template-slice";

function Search() {
	const [tempCat, setTempCat] = useState("All");
	const [tempOrder, setTempOrder] = useState("Default");
	const [tempDate, setTempDate] = useState("Default");
	const inputEl = useRef();

	const dispatch = useDispatch();

	const changeCategory = (event) => {
		inputEl.current.value = ""
		let category = event.target.value;
		setTempCat(category);
		dispatch(templateActions.getTempCat(category));
	};

	const orderFormat = (event) => {
		setTempDate('Default')
		dispatch(templateActions.tempFormatDate('Default'));

		let order = event.target.value;
		console.log(order);
		setTempOrder(order);


		dispatch(templateActions.tempFormatOrder(order));
	};

	const dateFormat = (event) => {
		let format = event.target.value;
		console.log(format);
		setTempDate(format);

		setTempOrder('Default')
		dispatch(templateActions.tempFormatOrder('Default'));
		dispatch(templateActions.tempFormatDate(format));
	};

	const searchTemp = (e) => {
		e.preventDefault();
		dispatch(
			templateActions.searchTemp({
				category: tempCat,
				input: inputEl.current.value,
			})
		);
	};

	return (
		<div className="nav lg:flex lg:justify-between">
			<form
				className="search-form flex justify-between  items-center lg:w-1/4 "
				onSubmit={searchTemp}
			>
				<input type="text" placeholder="Search Templates" ref={inputEl} className="w-5/6 py-3 px-3"/>
				<span className=" px-5" >

				<BsSearch />
				</span>
			</form>

			<div className="filter lg:flex lg:justify-between items-center lg:w-2/5 ">
				<p className="px-1">Sort By:</p>
				<div className="filter-form px-5 py-2  ">
					<label> Category</label>
					<select className="l" onChange={changeCategory} >
						<option>All</option>
						<option value={"Education"}>Education</option>
						<option value={"E-commerce"}>E-commerce</option>
						<option value={"Health"}>Health</option>
					</select>
				</div>

				<div className="filter-form px-5 py-2 ">
					<label> Order</label>
					<select className=" " onChange={orderFormat} value={tempOrder}>
						<option value={"Default"}>Default</option>
						<option value={"Asc"}>Ascending</option>
						<option value={"Dsc"}>Descending</option>
					</select>
				</div>

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
