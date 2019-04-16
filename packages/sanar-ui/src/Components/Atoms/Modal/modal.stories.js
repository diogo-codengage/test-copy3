import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import EsModal from "./Modal";
import EsIButton from "../Button";

storiesOf("Atoms.Modal", module)
    .add("Simple", () => (
        <EsModal title="Basic Modal" visible={true}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </EsModal>
    ))
    