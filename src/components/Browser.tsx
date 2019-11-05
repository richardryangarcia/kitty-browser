import React, { Component } from "react";
import { object } from "prop-types";
import Web3 from "web3";
import KittyCoreABI from "../contracts/KittyCoreABI.json";
import { AbiItem, AbiType } from "web3-utils";
import { CONTRACT_NAME, CONTRACT_ADDRESS } from "../config";
import { Container, Row, Col, FormControlProps } from "react-bootstrap";
import { KittyCard } from "./KittyCard";
import { SearchForm } from "../components/SearchForm";

type BrowserState = {
  kittyId: string;
  birthTime?: Date;
  generation: number;
  genes: number;
};

declare global {
  interface Window {
    web3: any;
  }
}

enum Mutability {
  View = "view",
  Nonpayable = "nonpayable",
  Payable = "payable",
  Pure = "pure"
}

class Browser extends Component<{}, BrowserState> {
  contracts: any;
  public static contextTypes = {
    drizzle: object
  };

  constructor(props: any, context: any) {
    super(props);
    this.state = {
      kittyId: "",
      birthTime: undefined,
      generation: 0,
      genes: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRandomKitty = this.handleRandomKitty.bind(this);
    this.mutability = this.mutability.bind(this);
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);
    // Initialize the contract instance
    const typedABI: AbiItem[] = KittyCoreABI.map(sig => {
      const type: AbiType = sig.type as AbiType;
      const item: AbiItem = {
        anonymous: undefined,
        constant: sig.constant,
        inputs: sig.inputs,
        name: sig.name,
        outputs: sig.outputs,
        payable: sig.payable,
        stateMutability: this.mutability(sig.stateMutability),
        type: type
      };
      return item;
    });

    const kittyContract = new web3.eth.Contract(
      typedABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS
    );
    // Add the contract to the drizzle store
    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract
    });
  }

  handleChange(event: React.FormEvent<FormControlProps>) {
    const value = event.currentTarget.value ? event.currentTarget.value : "";
    this.setState({
      kittyId: value,
      birthTime: undefined,
      generation: 0,
      genes: 0
    });
  }

  mutability(mutability: string | undefined) {
    switch (mutability) {
      case "view":
        return Mutability.View;
      case "nonpayable":
        return Mutability.Nonpayable;
      case "payable":
        return Mutability.Payable;
      case "pure":
        return Mutability.Pure;
      default:
        return undefined;
    }
  }

  async handleSubmit(event: React.FormEvent<FormControlProps>) {
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
        birthTime: undefined,
        generation: 0,
        genes: 0
      });
    }
  }

  handleRandomKitty(event: React.FormEvent<FormControlProps>) {
    this.setState({
      kittyId: Math.round(Math.random() * 1713872).toString()
    });
    this.handleSubmit(event);
  }

  render() {
    const { birthTime, genes, generation, kittyId } = this.state;

    return (
      <div className="browser">
        <Container>
          <Row>
            <Col>
              <h1 className="header">Kitty Browser</h1>
              <SearchForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleRandomKitty={this.handleRandomKitty}
                kittyId={kittyId}
              />
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

export default Browser;
