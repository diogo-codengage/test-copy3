import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'

import ESButton, { ESButtonGroup } from '../Button'
import ESStopwatch from './Stopwatch'

const Example = () => {
    const stopwatchRef = useRef(null)

    return (
        <div className='d-flex flex-column align-items-center'>
            <ESStopwatch ref={stopwatchRef} />
            <ESButtonGroup className='mt-sm'>
                <ESButton
                    size='small'
                    onClick={() => stopwatchRef.current.start()}
                >
                    Start
                </ESButton>
                <ESButton
                    size='small'
                    onClick={() => stopwatchRef.current.pause()}
                >
                    Stop
                </ESButton>
            </ESButtonGroup>
        </div>
    )
}

storiesOf('Atoms.Stopwatch', module).add('Simple', () => <Example />, {
    info: {
        propTablesExclude: [ESButton, ESButtonGroup]
    }
})
