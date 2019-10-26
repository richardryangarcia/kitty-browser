import React from "react";
import { render } from "@testing-library/react";
import { Browser } from "../components/Browser";

test("calling render with the same component on the same container does not remount", () => {
  // const card = render(<KittyCard />);
  // expect(getByTestId('number-display').textContent).toBe('1')
  // // re-render the same component with different props
  // rerender(<NumberDisplay number={2} />)
  // expect(getByTestId('number-display').textContent).toBe('2')
  // expect(getByTestId('instance-id').textContent).toBe('1')
});
