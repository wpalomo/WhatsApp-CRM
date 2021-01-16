import React from "react";

const PaymentPlans = () => {
	const getPlan = e => {
		e.stopPropagation()
		let selectedPrice = e.currentTarget.textContent.slice(0, 3)
		console.log(selectedPrice)
	}
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
					<div onClick={getPlan} id="monthPlan" className="payment__mid__card">
						<div className="payment__mid__price">
							<h1>$25</h1>
						</div>
						<div className="payment__mid__desc">
							<p>per agent, per month</p>
							<p>billed monthly</p>
						</div>
					</div>
					<div onClick={getPlan} id="yearPlan" className="payment__mid__card">
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
						<label htmlFor="agent_number">Agents</label>
						<input type="text" name="agent_number" placeholder="E.g. 5"/>
					</div>
					<div className="billing__cycle">
						<p>Billing cycle</p>
						<div className="billing__radios">
							<label className="billing__radio" htmlFor="monthly">
								<input type="radio" name="billCycle" value="monthly" defaultChecked/>
								<span className="label-visible">
									<span className="second__span">
										Monthly
									</span>
								</span>	 
							</label>
							<label className="billing__radio" htmlFor="yearly">
								<input type="radio" name="billCycle" value="yearly"/>
								<span className="label-visible">
									<span className="second__span">
										Yearly
									</span>
								</span>	 
							</label>
						</div>
					</div>
					<div className="total__bill">
						<p>Estimated Total</p>
						<h3>$400</h3>
					</div>
					<div className="submit__payment__plan">
						<button>Subscribe Now</button>
					</div>
				</div>	
			</div>
		</div>
	)
}

export default PaymentPlans;