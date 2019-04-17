import React from "react";
import { storiesOf } from "@storybook/react";

import ESSlider from "./Slider";

const marks = {
    0: 'Aleatório',
    33: 'Fácil',
    66: 'Médio',
    100: 'Difícil'
}

storiesOf("Atoms.Slider", module)
    .add("Simple", () => (
        <ESSlider marks={marks} defaultValue={0} />
    ))
    