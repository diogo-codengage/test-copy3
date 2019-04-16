import React from "react";
import { storiesOf } from "@storybook/react";

import Input from 'antd/lib/input'
import EsInput from "./Input";
import EsInputSearch from './InputSearch'
import EsIcon from '../Icon'

storiesOf("Atoms.Input", module)
    .add("Simple", () => (
        <>
            <EsInput placeholder="E-mail" prefix={<EsIcon type="mail" />} />
        </>
    ))
    .add("Password", () => (
        <>
            <EsInput placeholder="Senha" component={Input.Password} />
        </>
    ))
    .add("Search", () => (
        <>
            <EsInputSearch placeholder="Busque seu conteúdo" />
        </>
    ))
