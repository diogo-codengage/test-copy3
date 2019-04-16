import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import EsTabs from "./Tabs";
import EsTabPane from "./TabPane";

storiesOf("Tabs", module)
    .add("Simple", () => (
        <EsTabs defaultActiveKey="1">
            <EsTabPane tab="Dados cadastrais" key="1">Content Dados cadastrais</EsTabPane>
            <EsTabPane tab="Alterar senha" key="2">Content Alterar senha</EsTabPane>
        </EsTabs>
    ))
    