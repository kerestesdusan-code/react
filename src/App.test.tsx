import { render, screen } from "@testing-library/react";
import { Home } from "./components/Pages/Home/Home";

test("renders portfolio home page", () => {
  render(<Home />);

  const heading = screen.getByRole("heading", {
    name: /welcome to my personal portfolio/i,
  });

  expect(heading).toBeInTheDocument();
});