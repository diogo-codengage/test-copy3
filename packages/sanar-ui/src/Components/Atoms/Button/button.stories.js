import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ESButton from "./Button";
import ESButtonGroup  from "./ButtonGroup";
import ESIcon from "../Icon";

const props = {
    onClick: action("clicked")
};

storiesOf("Atoms.Button", module)
    .add("Simple", () => (
        <>
            <ESButton {...props}>Default</ESButton>
            <ESButton {...props} type="primary">Primary</ESButton>
            <ESButton {...props} type="dashed">Dashed</ESButton>
            <ESButton {...props} type="danger">Danger</ESButton>
            <ESButton {...props} clear>Clear</ESButton>
        </>
    ))
    .add("Icon", () => (
        <>
            <ESButton {...props} icon="search" type="primary" shape="circle" />
            <ESButton {...props} icon="search" type="primary">Search</ESButton>
            <ESButton {...props} icon="search" shape="circle" />
            <ESButton {...props} icon="search" >Search</ESButton>
            <ESButton {...props} type="primary" clear>
                Hello Button
                <ESIcon type="arrow-right" />
            </ESButton>
            <ESButton {...props} clear>
                Hello Button
                <ESIcon type="arrow-right" />
            </ESButton>
        </>
    ))
    .add("Group", () => (
        <>
            <ESButtonGroup>
                <ESButton {...props}>Default</ESButton>
                <ESButton {...props} type="primary">Primary</ESButton>
                <ESButton {...props} type="dashed">Dashed</ESButton>
                <ESButton {...props} type="danger">Danger</ESButton>
            </ESButtonGroup>
        </>
    ))
