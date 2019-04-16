import React from "react";
import { storiesOf } from "@storybook/react";

import EsCheckbox from "./";

storiesOf("Atoms.Checkbox", module)
    .add("Simple", () => (
        <>
            <EsCheckbox>Manter logado</EsCheckbox>
        </>
    ))
