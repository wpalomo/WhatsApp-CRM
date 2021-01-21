import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { withFirebase } from "../../firebase/index";
import { db } from "../../firebase";
import "./styles/modal.css";

class AddAgentModal extends Component {

	constructor() {
		super()
		this.state = {
			newAgentName:"",
			newAgentEmail:"",
			password: 'password', //default password
			showError: false,
		}
	}

	getAgentName = e => {
		this.setState({
			newAgentName: e.target.value,
			showError: false
		})
	}

	getAgentEmail = e => {
		this.setState({
			newAgentEmail: e.target.value,
			showError: false
		})
	}


	registerAgent = () => {
		const { newAgentEmail, newAgentName, password } = this.state
		const { companyid, firebase } = this.props;
		let companyRef = db.collection('companies').doc(companyid).collection('users');
		if (newAgentName === "" || newAgentEmail === "") {
			this.setState({
				showError: true
			}) 
		} else {
			//firebase register
			firebase.doCreateUserWithEmailAndPassword(newAgentEmail, password)
					.then(user => {
						//add user to company users collection
						companyRef.add({
							name:newAgentName, 
							role:'Agent', 
							email:newAgentEmail, 
							loggedin:"No", 
							status:"Pending", 
							activeAgent:false
						})

						//send email to verify account
						this.props.closeModal()//close the modal
						this.setState({
							newAgentName:"",
							newAgentEmail:""
						})
					})
					.catch(err => {
						console.log('Something went wrong with added user to firestore: ', err);
					})
		}
	}

	render() {
		const nodeRef = React.createRef(null)
		const { showError } = this.state
		return(
			<CSSTransition
				in={this.props.show}
				unmountOnExit
				timeout={{ enter:0, exit:300 }}
				nodeRef={nodeRef}
			>
				<div ref={nodeRef} onClick={this.props.closeModal} className={`agent__modal__container ${this.props.show ? "show": ""}`}>
					<div onClick={e => e.stopPropagation()} className="aa_modal__content">
						<div className="aa_modal__header">
							<h4 className="aa_modal__title">Invite Agents</h4>
						</div>
						<div className="aa_modal__body">
							<div className="aa_modal__name">
								<label className="aa__agent__email" htmlFor="aa__agent__email">Name</label>
								<div className="aa__email__container">
									<input onChange={this.getAgentName} placeholder="Enter new agent name e.g. Eve Adams" type="email" name="new_agent__email" className="new_agent__email" required/>
								</div>	
							</div>
							<div className="aa_modal__email">
								<label className="aa__agent__email" htmlFor="aa__agent__email">Email</label>
								<div className="aa__email__container">
									<input onChange={this.getAgentEmail} placeholder="Enter new agent email address" type="email" name="new_agent__email" className="new_agent__email" required/>
								</div>	
							</div>
							{ showError ? <div className="bill__error"><p>please enter a name and email</p></div> : null}					
						</div>
						<div className="aa__modal__footer add__agent">
							<button  className="aa__cancel" onClick={this.props.closeModal}>Cancel</button>
							<button onClick={this.registerAgent}>Invite</button>
						</div>
					</div>
				</div>
			</CSSTransition>
		)
	}
}

export default withFirebase(AddAgentModal);