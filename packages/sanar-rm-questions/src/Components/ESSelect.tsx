import React from 'react'

import  AntSelect from 'sanar-ui/dist/Components/Atoms/Select'

import { Select } from 'antd'

export interface ISelectOption {
    label: string;
    value: string;
}

interface IProps {
    options: Array<ISelectOption>;
    [key:string]:any
}

export const ESSelect:React.FC<IProps> = (props) => {

    return (
        <AntSelect {...props}
        >
            {props.options.map(s => <Select.Option key={s.value}
                                            value={s.value}>{s.label}</Select.Option>)}
        </AntSelect>
    )

}
