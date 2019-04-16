import React from "react";
import { storiesOf } from "@storybook/react";

import EsCol from "./Col";
import EsRow from "./Row";

const props = {
    style: {
        
    }
}

storiesOf("Grid", module)
    .add("Simple", () => (
        <>
            <EsRow>
                <EsCol span={12}>col-12</EsCol>
                <EsCol span={12}>col-12</EsCol>
            </EsRow>
            <EsRow>
                <EsCol span={8}>col-8</EsCol>
                <EsCol span={8}>col-8</EsCol>
                <EsCol span={8}>col-8</EsCol>
            </EsRow>
            <EsRow>
                <EsCol span={6}>col-6</EsCol>
                <EsCol span={6}>col-6</EsCol>
                <EsCol span={6}>col-6</EsCol>
                <EsCol span={6}>col-6</EsCol>
            </EsRow>
        </>
    ))
