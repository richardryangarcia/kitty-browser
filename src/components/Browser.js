import React, { Component } from "react";
import { object } from "prop-types";
import Web3 from "web3";
import KittyCoreABI from "../contracts/KittyCoreABI.json";
import { CONTRACT_NAME, CONTRACT_ADDRESS } from "../config";
import { formatDate } from "../utils/date";

class Browser extends Component {
  constructor(props, context) {
    super(props);
    this.state = { kittyId: 0, birthTime: null, generation: null, genes: null };
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
    this.setState({
      kittyId: event.target.value,
      birthTime: null,
      generation: null,
      genes: null
    });
  }

  async handleSubmit(event) {
    event && event.preventDefault();
    let response;
    try {
      response = await this.contracts.CryptoKitties.methods
        .getKitty(this.state.kittyId)
        .call();
      this.setState({
        birthTime: response.birthTime,
        generation: response.generation,
        genes: response.genes
      });
    } catch (e) {
      this.setState({
        birthTime: null,
        generation: null,
        genes: null
      });
    }
  }

  render() {
    const { birthTime, genes, generation, kittyId } = this.state;
    let formattedBday = birthTime && formatDate(birthTime);

    return (
      <div className="browser">
        <h1>Kitty Browser</h1>

        <form onSubmit={this.handleSubmit}>
          <h3>Kitty ID:</h3>
          <input
            type="text"
            value={this.state.kittyId}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        <button
          onClick={() => {
            this.setState({ kittyId: Math.round(Math.random() * 1713872) });
            this.handleSubmit();
          }}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Random Kitty
        </button>

        {birthTime && (
          <div>
            <h3>Genes</h3>
            <p>{genes}</p>
            <h3>Generation</h3>
            <p>{generation}</p>
            <h3>Birth Time</h3>
            <p>{formattedBday}</p>
            <img
              src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${kittyId}.svg`}
              style={{ height: "500px", width: "500px" }}
              alt="kitty"
            />
          </div>
        )}
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object
};

export default Browser;
