import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../../anime/team.json";

class HomeAnimation extends Component {
	render() {
		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData: animationData,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		}
		return(
			<Lottie
				options={defaultOptions}
				height={600}
				width={500}
			/>
		)
	}
}

export default HomeAnimation;