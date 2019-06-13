import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { object } from '@storybook/addon-knobs'
import ESModalTabs from './ModalTabs'
import Button from 'antd/lib/button/button'

const content = [
    {
        title: 'Termos de uso',
        content: (
            <iframe src='https://docs.google.com/document/d/e/2PACX-1vRFqbbI9NGXsiuGWIUsjmbFkgI7KH2uaytlHRjDw_o_WQ8w03ce96mwtTeUO31ZepI68Rdrhudx7cbV/pub?embedded=true' />
        )
    }
]

const ModalExample = () => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button onClick={() => setVisible(!visible)}>Open modal</Button>
            <ESModalTabs
                onCancel={() => setVisible(false)}
                visible={visible}
                content={object('Content', content)}
            />
        </>
    )
}

storiesOf('Organisms.ModalTabs', module).add('Simple', () => <ModalExample />)
