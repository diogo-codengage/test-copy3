import React from "react";
import TestRenderer from "react-test-renderer";

import ESPagination from "../";

it("renders correctly", () => {
	const component = <ESPagination defaultCurrent={5} total={100} />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
