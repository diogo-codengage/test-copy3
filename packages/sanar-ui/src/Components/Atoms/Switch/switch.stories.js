import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import ESSwitch from "./Switch";

storiesOf("Atoms.Switch", module)
    .add("Simple", () => (
        <ESSwitch />
    ))
    