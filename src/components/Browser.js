import React, { Component } from "react";
import { object } from "prop-types";
import Web3 from "web3";
import KittyCoreABI from "../contracts/KittyCoreABI.json";
import { CONTRACT_NAME, CONTRACT_ADDRESS } from "../config";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { KittyCard } from "./KittyCard";
import "./Browser.css";

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

    return (
      <div className="browser">
        <Container>
          <Row>
            <Col>
              <h1 className="header">Kitty Browser</h1>

              <Form onSubmit={this.handleSubmit}>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Kitty ID"
                  value={this.state.kittyId}
                  onChange={this.handleChange}
                />

                <div className="search-btns">
                  <Button variant="primary" type="submit">
                    Search Kitty
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => {
                      this.setState({
                        kittyId: Math.round(Math.random() * 1713872)
                      });
                      this.handleSubmit();
                    }}
                  >
                    Random Kitty
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              {birthTime && (
                <KittyCard
                  birthTime={birthTime}
                  genes={genes}
                  generation={generation}
                  kittyId={kittyId}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object
};

export default Browser;
