import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import EsButton from "./Button";
import EsButtonGroup  from "./ButtonGroup";
import EsIcon from "../Icon";

const props = {
    onClick: action("clicked")
};

storiesOf("Atoms.Button", module)
    .add("Simple", () => (
        <>
            <EsButton {...props}>Default</EsButton>
            <EsButton {...props} type="primary">Primary</EsButton>
            <EsButton {...props} type="dashed">Dashed</EsButton>
            <EsButton {...props} type="danger">Danger</EsButton>
            <EsButton {...props} clear>Clear</EsButton>
        </>
    ))
    .add("Icon", () => (
        <>
            <EsButton {...props} icon="search" type="primary" shape="circle" />
            <EsButton {...props} icon="search" type="primary">Search</EsButton>
            <EsButton {...props} icon="search" shape="circle" />
            <EsButton {...props} icon="search" >Search</EsButton>
            <EsButton {...props} type="primary" clear>
                Hello Button
                <EsIcon type="arrow-right" />
            </EsButton>
            <EsButton {...props} clear>
                Hello Button
                <EsIcon type="arrow-right" />
            </EsButton>
        </>
    ))
    .add("Group", () => (
        <>
            <EsButtonGroup>
                <EsButton {...props}>Default</EsButton>
                <EsButton {...props} type="primary">Primary</EsButton>
                <EsButton {...props} type="dashed">Dashed</EsButton>
                <EsButton {...props} type="danger">Danger</EsButton>
            </EsButtonGroup>
        </>
    ))
