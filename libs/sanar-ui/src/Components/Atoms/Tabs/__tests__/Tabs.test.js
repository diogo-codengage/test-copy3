import React from "react";
import { render, cleanup } from "react-testing-library";

import ESTabs, { ESTabPane } from "../";

afterEach(cleanup);

it("renders correctly", () => {
	const { getByText, asFragment } = render(
        <ESTabs defaultActiveKey="1">
            <ESTabPane tab="Dados cadastrais" key="1">Content Dados cadastrais</ESTabPane>
            <ESTabPane tab="Alterar senha" key="2">Content Alterar senha</ESTabPane>
        </ESTabs>	
	);

    getByText('Content Dados cadastrais');
    expect(asFragment()).toMatchSnapshot();
});
