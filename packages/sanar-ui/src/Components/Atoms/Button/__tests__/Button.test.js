import React from "react";
import ReactDOM from "react-dom";
import ESButton from "../Button.jsx";

it("renders correctly", () => {
	const component = <ESButton>Button</ESButton>;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
