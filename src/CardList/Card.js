import React from "react";

function Card({name, description}) {
	return (
		<div className="card  my-10">
			<div className="container py-5">
				<h1 className="md:text-lg font-semibold lg:text-2xl">{name}</h1>
				<p className="my-5 md:text-sm lg:text-lg">
					{description}
				</p>
			</div>
			{/* <p>{date}</p> */}

                  <span className="pl-9 py-3">Use Template</span>
		</div>
	);
}

export default Card;
