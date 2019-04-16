import React from "react";
import { storiesOf } from "@storybook/react";

import ESIcon from "./Icon";

storiesOf("Atoms.Icon", module)
    .add("Simple", () => (
        <>
            <ESIcon type="home" fontSize={25} />
            <ESIcon type="setting" theme="filled" />
            <ESIcon type="smile" theme="outlined" />
            <ESIcon type="sync" spin />
            <ESIcon type="smile" rotate={180} />
            <ESIcon type="loading" />
        </>
    ))
