import React from "react";
import { storiesOf } from "@storybook/react";

import EsIcon from "./Icon";

storiesOf("Atoms.Icon", module)
    .add("Simple", () => (
        <>
            <EsIcon type="home" fontSize={25} />
            <EsIcon type="setting" theme="filled" />
            <EsIcon type="smile" theme="outlined" />
            <EsIcon type="sync" spin />
            <EsIcon type="smile" rotate={180} />
            <EsIcon type="loading" />
        </>
    ))
