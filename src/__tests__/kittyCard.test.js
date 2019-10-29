import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { KittyCard } from "../components/KittyCard";

describe("<KittyCard />", () => {
  let birthTime, genes, generation, kittyId;
  beforeEach(() => {
    birthTime = "1511415679";
    generation = "0";
    genes =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    kittyId = "470916";
  });

  test("renders correctly", () => {
    const { asFragment } = render(
      <KittyCard
        birthTime={birthTime}
        generation={generation}
        genes={genes}
        kittyId={kittyId}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should display a card with kitty info ", async () => {
    const { container } = render(
      <KittyCard
        birthTime={birthTime}
        generation={generation}
        genes={genes}
        kittyId={kittyId}
      />
    );
    const card = container.querySelector(".card");
    const details = container.querySelector(".kitty-details");
    const imageWrapper = container.querySelector(".kitty-img");
    expect(card).not.toBe(null);
    expect(details).not.toBe(null);
    expect(imageWrapper).not.toBe(null);
  });

  test("should display correct info", () => {
    const { getByTestId } = render(
      <KittyCard
        birthTime={birthTime}
        generation={generation}
        genes={genes}
        kittyId={kittyId}
      />
    );

    expect(getByTestId("id")).toHaveTextContent("470916");
    expect(getByTestId("genes")).toHaveTextContent(
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );
    expect(getByTestId("generation")).toHaveTextContent("0");
    expect(getByTestId("formattedBday")).toHaveTextContent("October 3 2017");
  });

  test("should have img with correct src url ", () => {
    const { getByTestId } = render(
      <KittyCard
        birthTime={birthTime}
        generation={generation}
        genes={genes}
        kittyId={kittyId}
      />
    );
    expect(getByTestId("kitty-image")).toHaveAttribute(
      "src",
      "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/470916.svg"
    );
  });
});
