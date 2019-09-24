import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, number } from '@storybook/addon-knobs'

import SANSnackbarProvider, { useSnackbarContext } from './Provider'

const themeOptions = {
    Default: 'default',
    Success: 'success',
    Error: 'error'
}

const Example = ({ message, theme, timeout }) => {
    const createSnackbar = useSnackbarContext()
    const showSnackbar = () => {
        createSnackbar({
            message,
            theme,
            timeout
        })
    }

    return (
        <div>
            <button onClick={showSnackbar}>Show Snackbar</button>
        </div>
    )
}

storiesOf('Molecules.Snackbar', module).add('Simple', () => {
    return (
        <SANSnackbarProvider>
            <Example
                message={text('Message', 'Message to show')}
                theme={select('Theme', themeOptions)}
                timeout={number('Time to show', 2000)}
            />
        </SANSnackbarProvider>
    )
})
