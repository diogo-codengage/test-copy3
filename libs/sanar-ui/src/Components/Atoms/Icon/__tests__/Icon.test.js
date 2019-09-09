import React from "react";
import TestRenderer from "react-test-renderer";

import ESIcon from "../";

it("renders correctly", () => {
	const component = <ESIcon type="home" />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
