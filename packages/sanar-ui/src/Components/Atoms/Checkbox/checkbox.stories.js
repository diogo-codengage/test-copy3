import React from "react";
import { storiesOf } from "@storybook/react";

import ESCheckbox from "./";

storiesOf("Atoms.Checkbox", module)
    .add("Simple", () => (
        <>
            <ESCheckbox>Manter logado</ESCheckbox>
        </>
    ))
