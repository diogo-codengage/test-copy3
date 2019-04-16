import React from "react";
import { storiesOf } from "@storybook/react";

import ESDropdown from "./";
import ESMenu, { ESItem, ESDivider } from "../Menu";
import ESButton from "../Button";

const menu = (
    <ESMenu>
        <ESItem key="1">Item 1</ESItem>
        <ESItem key="2">Item 2</ESItem>
        <ESDivider />
        <ESItem key="3">Item 3</ESItem>
    </ESMenu>
);

storiesOf("Atoms.Dropdown", module)
    .add("Simple", () => (
        <>
            <ESDropdown overlay={menu}>
                <ESButton>Dropdown</ESButton>
            </ESDropdown>
        </>
    ))
