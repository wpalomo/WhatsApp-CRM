import React, { Component } from "react";
import Lottie from "react-lottie-player";
import animationData from "../../anime/team.json";

class HomeAnimation extends Component {
	render() {
		return(
			<Lottie
				animationData={animationData}
				loop
				play
				style={{ width: 600, height: 500 }}
			/>
		)
	}
}

export default HomeAnimation;