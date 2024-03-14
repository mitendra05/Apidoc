import React, { Component } from "react";
import "./apistyle.css";
import cplogo from "./images/centpays_full_logo.png";

// Data
import PaymentIntegration from './apidata/Data_01PayInte'
import GetTxnData from './apidata/Data_02GetTxndata'
import ErrorCode from './apidata/Data_03Errorcode'
import Introduction from './apidata/Data_04Introduction'
import Callback from './apidata/Data_07Callback'
import Webhook from './apidata/Data_08Webhook'
import P2P from './apidata/Data_09P2P'
import IFrameIntegration from './apidata/Data_10IFrameInte'
import IFramePaymentIntegration from './apidata/Data_11IFramePayInte'

// Code
import PaymentIntegrationCode from './apicode/Code_01PayIntecode';
import GetTxndataCode from './apicode/Code_02GetTxndataCode';
import ErrorCodeCode from './apicode/Code_03ErrorCode';
import IntroCodeCode from './apicode/Code_04IntroCode';
import CallbackCode from './apicode/Code_07Callbackcode';
import WebhookCode from './apicode/Code_08Webhookcode';
import P2PCode from './apicode/Code_09P2Pcode';
import IFrameInteCode from './apicode/Code_10IFrameIntecode';
import IFramePaymentInteCode from './apicode/Code_11IFramePayInte';


class Apidoc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: true,
			apiData: null,
		};
	}

	componentDidMount() {
		fetch("https://centpays.com/apidoc/get_all")
		.then((response) => response.json())
		.then((data) => {
			this.setState({ apiData: data });
			// console.log(data);
		})
		.catch((error) => {
			console.error("Error fetching API data:", error);
		});
	}

	handleOptionClick = (index) => {
		this.handleToggleMenu();
		this.setState({ activeItem: index });
	};

	handleToggleMenu = () => {
		this.setState((prevState) => ({
		isMenuOpen: !prevState.isMenuOpen,
		}));
	};

	renderSelectedApiData = () => {
		switch (this.state.activeItem) {
		case 13:
			return < PaymentIntegration />;
		case 15:
			return < GetTxnData />;
		case 17:
			return < ErrorCode />;
		case 12:
			return < Introduction />;
		case 18:
			return < Callback />;
		case 19:
			return < Webhook />;
		case 14:
			return < P2P />;
		case 16:
			return < IFrameIntegration />;
		// case 11:
		// 	return < IFramePaymentIntegration />;
		default:
			return < Introduction />;
		}
	};

	renderSelectedApiCode = () => {
		switch (this.state.activeItem) {
		case 13:
			return < PaymentIntegrationCode />;
		case 15:
			return < GetTxndataCode />;
		case 17:
			return < ErrorCodeCode />;
		case 12:
			return < IntroCodeCode />;
		case 18:
			return < CallbackCode />;
		case 19:
			return < WebhookCode />;
		case 14:
			return < P2PCode />;
		case 16:
			return < IFrameInteCode />;
		// case 11:
		// 	return < IFramePaymentInteCode />;
		default:
			return < IntroCodeCode />;
		}
	};
	render() {
		const { activeItem, isMenuOpen, apiData } = this.state;

		return (
			<>
				{apiData ? (
					<div className="apicdoc">
						<div className="background"></div>
						<div className="api-body">
							<div className={`api-sidebar ${isMenuOpen ? "open" : ""}`}>
								<div className="api-sidebar-top">
									<img
									src={cplogo}
									alt="Company logo"
									className={`companylogo ${isMenuOpen ? "hidden" : ""}`}
									/>
									<button onClick={() => this.handleToggleMenu()}>
										{isMenuOpen ? ">" : "<"}
									</button>
								</div>
								<div className={`api-sidebar-middle ${isMenuOpen ? "hidden" : ""}`}	>							
									<ul>
										{apiData &&
											apiData.data.map((option) => (
											<li
												key={option.id}
												className={`sidebar-options ${
												activeItem === parseInt(option.id, 10) ? "active" : ""
												}`}
												onClick={() => this.handleOptionClick(parseInt(option.id, 10))}
											>
												{option.menu_name}
											</li>
										))}
									</ul>
								</div>
								<div className="api-sidebar-bottom">
									<p className={` ${isMenuOpen ? "hidden" : ""}`}>
										<a href="https://centpays.com/">Sign in</a>
									</p>
								</div>
							</div>
							<span>
								<div className="api-header">
									<ul>
										<li><a href="https://centpays.com/">Login</a></li>
										<li><a href="https://centpays.com/">Sing in</a></li>
									</ul>
								</div>
								<div className="api-main-component">
									<div className="api-compartment-left">
										<div>{this.renderSelectedApiData()}</div>
									</div>
									<div className="api-compartment-right">
										<div>{this.renderSelectedApiCode()}</div>
									</div>
								</div>
							</span>
						</div>
					</div>
				) : (
					<p>Loading API data...</p>
				)}
			</>
		);
	}
}

export default Apidoc;
