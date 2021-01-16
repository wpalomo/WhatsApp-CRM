import React, { Component } from "react";
import CreditCardModal from "./CreditCardModal";

class PaymentPlans extends Component {

	constructor() {
		super()
		this.state = {
			totalBill: 0,
			selectedRadio: "monthly",
			currentAgentEntered: 0,
			showError: false,
			creditCardModal: false
		}
	}

	getCycle = e => {
		this.setState({
			selectedRadio: e.target.value
		})
	}

	handleRadioClick = (e) => {
		this.setState({
			selectedRadio: e.target.value
		}, () => {if (this.state.currentAgentEntered) {
					let totalCost;
					let currentEntry = Math.abs(Number(this.state.currentAgentEntered))
					if (this.state.selectedRadio === 'monthly') {
						totalCost = currentEntry * 25
						if (!isNaN(totalCost)) {
							this.setState({
								totalBill: totalCost
							})
						}
					} else {
						totalCost = currentEntry * 21 * 12
						if (!isNaN(totalCost)) {
							this.setState({
								totalBill: totalCost
							})
						}
					}
				}})
	}

	getTotalCost = () => {
		const { totalBill } = this.state
		if (totalBill < 1) {
			this.setState({
				showError: true
			})
		} else {
			this.setState({
				creditCardModal: true
			})
		}
	}


	getAgentInput = (e) => {
		const { selectedRadio } = this.state
		let agentCount = Math.abs(Number(e.target.value))
		let totalCost;
		if (selectedRadio === 'monthly') {
			totalCost = agentCount * 25
			if (!isNaN(totalCost)) {
				this.setState({
					totalBill: totalCost,
					currentAgentEntered: agentCount,
					showError: false
				})
			}
		} else {
			totalCost = agentCount * 21 * 12
			if (!isNaN(totalCost)) {
				this.setState({
					totalBill: totalCost,
					currentAgentEntered: agentCount,
					showError: false
				})
			}
		}
	}
	

	render() {
		const { totalBill, selectedRadio, showError, creditCardModal, currentAgentEntered } = this.state
			return(
			<div className="expanded__downright">
				<div className="payment__container">
					<div className="payment__top">
						<div className="payment__top_toptext">
							<p>Your current plan: <strong>Free Trial</strong></p>
						</div>
						<div className="payment__top_bottomtext">
							<p>Ends in 3 days. Subscribe now for full access!</p>
						</div>
					</div>	
					<div className="payment__mid">
						<div className= "payment__mid__card">
							<div className="payment__mid__price">
								<h1>$25</h1>
							</div>
							<div className="payment__mid__desc">
								<p>per agent, per month</p>
								<p>billed monthly</p>
							</div>
						</div>
						<div className="payment__mid__card">
							<div className="payment__mid__price">
								<h1>$21</h1>
							</div>
							<div className="payment__mid__desc">
								<p>per agent, per month</p>
								<p>billed yearly</p>
							</div>
						</div>
					</div>
					<div className="payment__bottom">
						<div className="agent__count">
							<div className="label__text1">
								<label htmlFor="agent_number">Agents</label>
							</div>
							<input onChange={this.getAgentInput} type="text" name="agent_number" placeholder="E.g. 1"/>
						</div>
						<div className="billing__cycle">
							<div className="label__text2">
								<p>Billing cycle</p>
							</div>
							<div className="billing__radios">
								<label className="billing__radio" htmlFor="monthly">
									<input onClick={this.handleRadioClick} onChange={this.getCycle} type="radio" name="billCycle" value="monthly" checked={selectedRadio === 'monthly'}/>
									<span className="label-visible">
										<span className="second__span">
											Monthly
										</span>
									</span>	 
								</label>
								<label className="billing__radio" htmlFor="yearly">
									<input onClick={this.handleRadioClick} onChange={this.getCycle} type="radio" name="billCycle" value="yearly" checked={selectedRadio === 'yearly'}/>
									<span className="label-visible">
										<span className="second__span">
											Yearly
										</span>
									</span>	 
								</label>
							</div>
						</div>
						<div className="total__bill">
							<div className="bill__estimate">
								<p>Estimated Total</p>
							</div>
							<div className="bill__value">
								<h3>{ `$${totalBill}` }</h3>
							</div>
						</div>
						<div className="submit__payment__plan">
							{ showError ? <div className="bill__error"><p>Error:please enter a number in the Agents field</p></div> : null}
							<button onClick={this.getTotalCost}>Subscribe Now</button>
							<CreditCardModal creditCardModal={creditCardModal} totalBill={totalBill} agents={currentAgentEntered}/>
						</div>
					</div>	
				</div>
			</div>
		)
	}
	
}

export default PaymentPlans;