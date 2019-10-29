import * as React from "react";
import { Form, Button, FormControlProps } from "react-bootstrap";

type SearchFormProps = {
  kittyId: string;
  handleSubmit: (event: React.FormEvent<FormControlProps>) => void;
  handleChange: (event: React.FormEvent<FormControlProps>) => void;
  handleRandomKitty: (event: React.FormEvent<FormControlProps>) => void;
};
export const SearchForm: React.FC<SearchFormProps> = ({
  handleChange,
  handleRandomKitty,
  handleSubmit,
  kittyId
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Kitty ID"
        value={kittyId}
        onChange={handleChange}
      />

      <div className="search-btns">
        <Button className="btn-search" variant="primary" type="submit">
          Search Kitty
        </Button>

        <Button
          className="btn-random"
          variant="success"
          onClick={(event: React.FormEvent<FormControlProps>) => {
            handleRandomKitty(event);
          }}
        >
          Random Kitty
        </Button>
      </div>
    </Form>
  );
};
