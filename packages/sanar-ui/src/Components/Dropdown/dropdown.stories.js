import React from "react";
import { storiesOf } from "@storybook/react";

import EsDropdown from "./";
import EsMenu, { EsItem, EsDivider } from "../Menu";
import EsButton from "../Button";

const menu = (
    <EsMenu>
        <EsItem key="1">Item 1</EsItem>
        <EsItem key="2">Item 2</EsItem>
        <EsDivider />
        <EsItem key="3">Item 3</EsItem>
    </EsMenu>
);

storiesOf("Dropdown", module)
    .add("Simple", () => (
        <>
            <EsDropdown overlay={menu}>
                <EsButton>Dropdown</EsButton>
            </EsDropdown>
        </>
    ))
