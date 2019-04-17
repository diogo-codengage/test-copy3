import React from "react";
import TestRenderer from "react-test-renderer";

import ESDropdown, { ESDropdownButton }  from "../";
import ESMenu, { ESItem, ESDivider } from "../../Menu";
import ESButton from "../../Button";

const menu = (
	<ESMenu>
		<ESItem key="1">Item 1</ESItem>
		<ESItem key="2">Item 2</ESItem>
		<ESDivider />
		<ESItem key="3">Item 3</ESItem>
	</ESMenu>
);

it("renders correctly", () => {	
	const component = (
		<ESDropdown overlay={menu}>
			<ESButton>Dropdown</ESButton>
		</ESDropdown>
	)

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {	
	const component = (
		<ESDropdownButton overlay={menu}>
			Dropdown
		</ESDropdownButton>
	)

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
