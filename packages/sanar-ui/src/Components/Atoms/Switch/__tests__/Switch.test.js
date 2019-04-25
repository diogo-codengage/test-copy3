import React from "react";
import TestRenderer from "react-test-renderer";

import ESSwitch from "../";

it("renders correctly", () => {
	const component = <ESSwitch />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
