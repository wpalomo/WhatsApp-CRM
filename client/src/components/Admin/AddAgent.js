import React, { Component } from "react";
import "./styles/modal.css";

class AddAgentModal extends Component {

	closeModal = e => {
		this.props.closeModal && this.props.closeModal(e)
	}

	render() {
		if (!this.props.show) {
			return null
		}
		return(
			<div className="agent__modal__container">
				<div>This is a modal</div>
				<div className="agent__modal__button">
					<button onClick={e => this.closeModal(e)}>Cancel</button>
					<button>Invite</button>
				</div>
			</div>
		)
	}
}

export default AddAgentModal;