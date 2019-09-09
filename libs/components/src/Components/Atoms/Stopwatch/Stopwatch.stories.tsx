import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'

import { SANButton, SANButtonGroup } from '../Button'
import SANStopwatch from './Stopwatch'

const Example = () => {
    const stopwatchRef = useRef(null)

    return (
        <div className='d-flex flex-column align-items-center'>
            <SANStopwatch ref={stopwatchRef} />
            <SANButtonGroup className='mt-sm'>
                <SANButton
                    size='small'
                    onClick={() => stopwatchRef.current.start()}
                >
                    Start
                </SANButton>
                <SANButton
                    size='small'
                    onClick={() => stopwatchRef.current.pause()}
                >
                    Stop
                </SANButton>
            </SANButtonGroup>
        </div>
    )
}

storiesOf('Atoms.Stopwatch', module).add('Simple', () => <Example />, {
    info: {
        propTablesExclude: [SANButton, SANButtonGroup]
    }
})
