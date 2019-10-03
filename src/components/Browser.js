import React, { Component } from "react";
import { object } from "prop-types";
import Web3 from "web3";
import KittyCoreABI from "../contracts/KittyCoreABI.json";
import { CONTRACT_NAME, CONTRACT_ADDRESS } from "../config";

class Browser extends Component {
  constructor(props, context) {
    super(props);
    this.state = { kittyId: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);
    // Initialize the contract instance
    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS
    );
    // Add the contract to the drizzle store
    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract
    });
  }

  handleChange(event) {
    this.setState({ kittyId: event.target.value });
  }

  handleSubmit(event) {
    alert("kitty search for " + this.state.kittyId);
    event.preventDefault();
  }

  render() {
    console.log(this.contracts.CryptoKitties);

    return (
      <div className="browser">
        <h1>Kitty Browser</h1>

        {/* Input to type in the kitty ID here */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.kittyId}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        {/* Display Kitty info here */}
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object
};

export default Browser;
