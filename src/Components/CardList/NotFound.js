import React from "react";

import Empty from "./../../assets/empty.svg";

function NotFound() {
	return (
		<>
			<div className="flex justify-center align-center lg:h-80 md:h-40  mt-40">
				<img src={Empty} alt="empty" />
			</div>
			<h4 className="text-center pt-10 pb-20 text-lg font-bold">
				No Record Found
			</h4>
		</>
	);
}

export default NotFound;
