import React from "react";
import TestRenderer from "react-test-renderer";

import ESCheckbox from "../";

it("renders correctly", () => {
	const component = <ESCheckbox>Manter logado</ESCheckbox>;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
