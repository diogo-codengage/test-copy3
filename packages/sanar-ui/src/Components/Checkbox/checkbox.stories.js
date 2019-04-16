import React from "react";
import { storiesOf } from "@storybook/react";

import EsCheckbox from "./";

storiesOf("Checkbox", module)
    .add("Simple", () => (
        <>
            <EsCheckbox>Manter logado</EsCheckbox>
        </>
    ))
