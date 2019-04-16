import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import EsSlider from "./Slider";

const marks = {
    0: 'Aleatório',
    33: 'Fácil',
    66: 'Médio',
    100: 'Difícil'
}

storiesOf("Atoms.Slider", module)
    .add("Simple", () => (
        <EsSlider marks={marks} defaultValue={0} />
    ))
    