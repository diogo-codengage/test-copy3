import React from "react";
import TestRenderer from "react-test-renderer";

import Input from "antd/lib/input";
import ESInput, { ESInputSearch } from "../";
import ESIcon from '../../Icon'

it("renders correctly", () => {
	const component = <ESInput placeholder="E-mail" prefix={<ESIcon type="mail" />} />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
	const component = <ESInput placeholder="Senha" component={Input.Password} />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
	const component =  <ESInputSearch placeholder="Busque seu conteúdo" />;

	const tree = TestRenderer.create(component).toJSON();
	expect(tree).toMatchSnapshot();
});
