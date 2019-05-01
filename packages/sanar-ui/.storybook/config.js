import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'

import './styles.less'
import TableComponent from './TableComponent'

addDecorator(story => (
    <div
        style={{
            marginTop: 20,
            padding: 20,
            minHeight: '200px',
            backgroundColor: '#edeff2',
            border: '1px solid #e8e8e8'
        }}
    >
        {story()}
    </div>
))
addDecorator(withKnobs)
addDecorator(
    withInfo({
        header: false,
        TableComponent,
        source: false,
        inline: true,
        propTablesExclude: ['div', 'span'],
        styles: stylesheet => ({
            ...stylesheet,
            propTableHead: {
                display: 'none'
            },
            infoBody: {
                ...stylesheet.infoBody,
                border: 'none',
                margin: '30px 0 0 0',
                padding: 0
            }
        })
    })
)
addParameters({
    options: {
        name: 'SANAR UI'
    }
})

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
