import React from "react";
import ReactDOM from "react-dom";
import ESButton from "../Button.jsx";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ESButton />, div);
	ReactDOM.unmountComponentAtNode(div);
});
