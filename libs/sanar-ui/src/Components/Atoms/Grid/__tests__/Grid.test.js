import React from "react";
import TestRenderer from "react-test-renderer";

import { ESRow, ESCol } from "../";

it("renders correctly", () => {
	const component = (
		<>
			<ESRow>
				<ESCol span={12}>col-12</ESCol>
				<ESCol span={12}>col-12</ESCol>
			</ESRow>
			<ESRow>
				<ESCol span={8}>col-8</ESCol>
				<ESCol span={8}>col-8</ESCol>
				<ESCol span={8}>col-8</ESCol>
			</ESRow>
			<ESRow>
				<ESCol span={6}>col-6</ESCol>
				<ESCol span={6}>col-6</ESCol>
				<ESCol span={6}>col-6</ESCol>
				<ESCol span={6}>col-6</ESCol>
			</ESRow>
		</>
	);

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
