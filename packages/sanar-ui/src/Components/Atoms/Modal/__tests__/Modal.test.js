import React from "react";
import { render, cleanup } from "react-testing-library";

import ESModal from "..";

afterEach(cleanup);

it("renders correctly", () => {
	const { getByText, asFragment } = render(
		<ESModal title="Basic Modal" visible={true}>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</ESModal>
	);

    getByText('Some contents...');
    expect(asFragment()).toMatchSnapshot();
});
