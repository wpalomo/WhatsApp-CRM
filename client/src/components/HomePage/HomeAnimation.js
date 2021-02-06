import React, { Component } from "react";
import Lottie from "react-lottie-player";


class HomeAnimation extends Component {
	render() {
		return(
			<Lottie
				animationData={this.props.animationData}
				loop
				play
				style={{ width: 600, height: 500 }}
			/>
		)
	}
}

export default HomeAnimation;