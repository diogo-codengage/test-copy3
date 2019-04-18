import React from "react";
import { storiesOf } from "@storybook/react";

import ESModal from "./Modal";

storiesOf("Atoms.Modal", module)
    .add("Simple", () => (
        <ESModal title="Basic Modal" visible={true}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </ESModal>
    ))
    