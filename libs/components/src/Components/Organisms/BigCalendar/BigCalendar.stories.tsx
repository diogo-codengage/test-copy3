import React from 'react'
import { storiesOf } from '@storybook/react'

import { SANBox } from '../../Atoms/Box'
import SANBigCalendar from './BigCalendar'
import { events } from './events'

storiesOf('Organisms.Calendar', module).add(
    'Simple',
    () => (
        <SANBox width='1000px' margin='0 auto'>
            <SANBigCalendar
                events={events}
                eventClick={console.log}
                dateClick={console.log}
                eventDrop={console.log}
            />
        </SANBox>
    ),
    {
        style: {
            padding: '16px'
        }
    }
)
