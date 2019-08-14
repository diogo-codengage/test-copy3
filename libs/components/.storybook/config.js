import React from 'react'
import { configure, addParameters, addDecorator } from '@storybook/react'

import SANThemeProvider from '../src/Components/Atoms/ThemeProvider'

import { createTheme } from '../src/Theme/createTheme'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'

import './styles.less'

const DefaultDecotator = (story, { parameters }) => (
    <div
        style={
            parameters.style
                ? parameters.style
                : {
                      padding: 20,
                      minHeight: '200px',
                      backgroundColor: '#f7f8f9'
                  }
        }
    >
        <SANThemeProvider theme={createTheme({})}>{story()}</SANThemeProvider>
    </div>
)
addDecorator(DefaultDecotator)
addDecorator(withKnobs)
addDecorator(
    withInfo({
        header: false,
        source: false,
        inline: true,
        propTablesExclude: [() => 'div', () => 'span'],
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
        theme: {
            brandTitle: 'SANAR COMPONENTS'
        }
    }
})

const req = require.context('../src/Components', true, /.stories.tsx$/)
function loadStories() {
    req.keys().forEach(req)
}
configure(loadStories, module)
