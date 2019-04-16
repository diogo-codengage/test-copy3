import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import ESTabs from "./Tabs";
import ESTabPane from "./TabPane";

storiesOf("Atoms.Tabs", module)
    .add("Simple", () => (
        <ESTabs defaultActiveKey="1">
            <ESTabPane tab="Dados cadastrais" key="1">Content Dados cadastrais</ESTabPane>
            <ESTabPane tab="Alterar senha" key="2">Content Alterar senha</ESTabPane>
        </ESTabs>
    ))
    