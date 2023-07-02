import { render, screen } from "@testing-library/react";
import JobBox from "./JobBox";
import { LocationOn } from "@mui/icons-material";

test("renders title", () => {
  render(<JobBox BoxIcon={LocationOn} title={"swipejobs"} />);
  const title = screen.getByText(/swipejobs/i);
  expect(title).toBeInTheDocument();
});

test("renders children", () => {
  render(
    <JobBox BoxIcon={LocationOn} title={"swipejobs"}>
      <p>Albert Wilaras</p>
    </JobBox>
  );
  const child = screen.getByText(/Albert Wilaras/i);
  expect(child).toBeInTheDocument();
});
