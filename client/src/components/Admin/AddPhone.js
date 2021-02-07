import React from "react";
import "./styles/addphone.css";

const AddPhone = () => {
	const url = `https://api.maytapi.com/api/005df793-efea-42c6-b67f-b16b43399d3f/10063/screen?token=9320ffa5-6b4c-450f-8602-a6defeb3f88e&time=${new Date(new Date()).getTime()}`
	
	return(
		<div className="addphone__container">
			<div className="addphone__parent">
				<img alt="" src={url}/>
			</div>
		</div>
	)
}

export default AddPhone;
//09062979804