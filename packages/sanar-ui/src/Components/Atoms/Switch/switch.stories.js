import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import EsSwitch from "./Switch";

storiesOf("Atoms.Switch", module)
    .add("Simple", () => (
        <EsSwitch />
    ))
    