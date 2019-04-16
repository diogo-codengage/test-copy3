import React from "react";
import { storiesOf } from "@storybook/react";

import EsIcon from '../Icon'
import EsMenu from "./Menu";
import EsItem from "./Item";
import EsItemGroup from "./ItemGroup";
import EsSubMenu from "./SubMenu";

storiesOf("Menu", module)
    .add("Simple", () => (
        <EsMenu mode="horizontal">
            <EsItem key="mail">
            <EsIcon type="mail" />Navigation One
            </EsItem>
            <EsItem key="app" disabled>
            <EsIcon type="appstore" />Navigation Two
            </EsItem>
            <EsSubMenu title={<span className="submenu-title-wrapper"><EsIcon type="setting" />Navigation Three - Submenu</span>}>
            <EsItemGroup title="Item 1">
                <EsItem key="setting:1">Option 1</EsItem>
                <EsItem key="setting:2">Option 2</EsItem>
            </EsItemGroup>
            <EsItemGroup title="Item 2">
                <EsItem key="setting:3">Option 3</EsItem>
                <EsItem key="setting:4">Option 4</EsItem>
            </EsItemGroup>
            </EsSubMenu>
            <EsItem key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </EsItem>
        </EsMenu>
    ))
