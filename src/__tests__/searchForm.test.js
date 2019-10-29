import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchForm } from "../components/SearchForm";
import { get } from "http";

describe("<SearchForm />", () => {
  let kittyId, handleSubmit, handleChange, handleRandomKitty;
  beforeEach(() => {
    kittyId = "470916";
    handleSubmit = () => {};
    handleChange = () => {};
    handleRandomKitty = () => {};
  });
  test("renders correctly", () => {
    const { asFragment } = render(
      <SearchForm
        kittyId={kittyId}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleRandomKitty={handleRandomKitty}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render a form with search and random button", () => {
    const { container, get } = render(
      <SearchForm
        kittyId={kittyId}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleRandomKitty={handleRandomKitty}
      />
    );
    const form = container.querySelector("form");
    const searchButton = container.querySelector(".btn-search");
    const randomButton = container.querySelector(".btn-random");
    expect(form).not.toBe(null);
    expect(searchButton).not.toBe(null);
    expect(randomButton).not.toBe(null);
  });
});
