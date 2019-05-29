import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { select, boolean, text, number } from '@storybook/addon-knobs'

import ESForm from './Form'
import withESForm from './withForm'
import ESFormItem from './FormItem'

import ESInput from '../../Atoms/Input'
import ESButton from '../../Atoms/Button'

const layoutOptions = {
    Horizontal: 'horizontal',
    Veritcal: 'vertical',
    Inline: 'inlit'
}

const validateStatus = {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
    Validating: 'validating'
}

const ruleTypes = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Method: 'method',
    Regexp: 'regexp',
    Integer: 'integer',
    Float: 'float',
    Array: 'array',
    Object: 'object',
    Enum: 'enum',
    Date: 'date',
    Url: 'url',
    Hex: 'hex',
    Email: 'email'
}

const Example = withESForm(({ form }) => {
    return (
        <ESForm
            form={form}
            onSubmit={e => {
                e.preventDefault()
                action('onSubmit')(form.getFieldsValue())
            }}
            layout={select('Layout', layoutOptions, 'vertical')}
        >
            <ESFormItem
                help={text('Help', undefined)}
                hasFeedback={boolean('HasFeedback', true)}
                validateStatus={select(
                    'Validate status',
                    validateStatus,
                    'success'
                )}
                name='username'
                rules={[
                    {
                        required: boolean('Required', true),
                        max: number('Max', 5),
                        min: number('Min', 1),
                        message: text('Message', ''),
                        type: select('Type', ruleTypes, 'email'),
                        whitespace: boolean('Whitespace', true)
                    }
                ]}
            >
                <ESInput placeholder='Username' />
            </ESFormItem>
            <ESFormItem
                name='password'
                rules={[
                    {
                        required: true,
                        whitespace: true
                    }
                ]}
            >
                <ESInput placeholder='Password' component={ESInput.Password} />
            </ESFormItem>
            <ESFormItem>
                <ESButton
                    type='submit'
                    type='primary'
                    uppercase
                    bold
                    variant='solid'
                    color='primary'
                    size='small'
                >
                    Log in
                </ESButton>
            </ESFormItem>
        </ESForm>
    )
})

storiesOf('Molecules.Form', module).add('Simple', () => <Example />)
