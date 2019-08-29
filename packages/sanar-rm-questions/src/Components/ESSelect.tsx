import React, { useState } from 'react'

import { Card, Checkbox, Dropdown, Input } from 'antd'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { normalizeString } from '../Util/normalizeString'

export interface ISelectOption {
  label: string;
  value: string;
}

interface IProps {
  options: Array<ISelectOption>
  defaultValue?: ISelectOption[]
  onSelect?: (values: ISelectOption[]) => void,
  onUniqSelect?: (values: string) => void,
  placeholder: string,
  isMultiple: boolean,

  [key: string]: any
}


export const ESSelect: React.FC<IProps> = (props) => {

  const [text, setText] = useState('')

  const onMultipleChange = (e: CheckboxChangeEvent, s: ISelectOption) => {
    if (e.target.checked) {
      props.onSelect([...props.defaultValue, s])
    } else {
      props.onSelect(props.defaultValue.filter((v: ISelectOption) => v.value !== s.value))
    }
    e.preventDefault()
  }
  const onUniqChange = (e: any, s: string) => {
    props.onUniqSelect(s)
  }

  const items =
    <Card>
      <div style={
        {
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          maxHeight: 250,
          overflow: 'auto',
          borderRadius: 2,
          minWidth: 300,
          minHeight: 50
        }
      }>
        {props.options.filter(v => {
          if (text.length === 0) {
            return true
          }
          return normalizeString(v.label).indexOf(normalizeString(text)) > -1
        }).map((s, index) =>
          props.isMultiple ?
            <Checkbox
              style={{ padding: 5, marginLeft: 8 }}
              key={index}
              checked={!!props.defaultValue.find((e: ISelectOption) => e.value === s.value)}
              onChange={e => onMultipleChange(e, s)}
            >{s.label}</Checkbox>
            :
            <div
              style={{ padding: 5, marginLeft: 8, cursor: 'pointer' }}
              key={index}
              onClick={e => onUniqChange(e, s.value)}
            >{s.label}</div>
        )}
      </div>
    </Card>

  return (
    <>
      <Dropdown
        overlay={items} trigger={['click']}
        onVisibleChange={visible => {
          if (!visible) {
            setText('')
          }
        }}
      >
        <Input
          onChange={event1 => setText(event1.target.value)}
          value={text}
          suffix={<ESEvaIcon name='plus-outline'/>}
          placeholder={props.placeholder}>
        </Input>
      </Dropdown>
    </>
  )
}
