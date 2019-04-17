import React from "react";
import TestRenderer from "react-test-renderer";

import ESSlider from "../";

it("renders correctly", () => {
	const marks = {
		0: 'Aleatório',
		33: 'Fácil',
		66: 'Médio',
		100: 'Difícil'
	}
	const component = <ESSlider marks={marks} defaultValue={0} />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
