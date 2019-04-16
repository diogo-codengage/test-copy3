import React from "react";
import { storiesOf } from "@storybook/react";

import Input from 'antd/lib/input'
import ESInput from "./Input";
import ESInputSearch from './InputSearch'
import ESIcon from '../Icon'

storiesOf("Atoms.Input", module)
    .add("Simple", () => (
        <>
            <ESInput placeholder="E-mail" prefix={<ESIcon type="mail" />} />
        </>
    ))
    .add("Password", () => (
        <>
            <ESInput placeholder="Senha" component={Input.Password} />
        </>
    ))
    .add("Search", () => (
        <>
            <ESInputSearch placeholder="Busque seu conteúdo" />
        </>
    ))
