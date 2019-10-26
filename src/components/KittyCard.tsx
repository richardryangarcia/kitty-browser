import React from "react";
import { formatDate } from "../utils/date";
import { Card } from "react-bootstrap";

type KittyCardProps = {
  birthTime?: Date;
  genes: number;
  generation: number;
  kittyId: string;
};

export const KittyCard: React.FC<KittyCardProps> = ({
  birthTime,
  genes,
  generation,
  kittyId
}) => {
  let formattedBday = birthTime && formatDate(birthTime);

  return (
    <Card>
      <Card.Body>
        <div className="kitty-details">
          <h5>Kitty ID</h5>
          <p>{kittyId}</p>
          <h5>Genes</h5>
          <p>{genes}</p>
          <h5>Generation</h5>
          <p>{generation}</p>
          <h5>Birth Time</h5>
          <p>{formattedBday}</p>
        </div>
        <div className="kitty-img">
          <img
            src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${kittyId}.svg`}
            alt="kitty"
          />
        </div>
      </Card.Body>
    </Card>
  );
};
