import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'

import './styles.less'
import TableComponent from './TableComponent'

import ESThemeProvider from '../src/Components/Atoms/ThemeProvider'
import { createTheme } from '../src/Theme/createTheme'

import '../src/Config/i18n'

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
        <ESThemeProvider theme={createTheme({})}>{story()}</ESThemeProvider>
    </div>
)

addDecorator(DefaultDecotator)
addDecorator(withKnobs)
addDecorator(
    withInfo({
        header: false,
        TableComponent,
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
            brandTitle: 'SANAR LIB'
        }
    }
})

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
