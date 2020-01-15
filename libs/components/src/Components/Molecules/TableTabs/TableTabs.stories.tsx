import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, boolean, select } from '@storybook/addon-knobs'

import SANTableTabs from './TableTabs'

const tabs = [
    {
        key: '1',
        title: 'taxa de acerto',
        rows: [
            {
                title: '1 percent',
                percentBars: [
                    {
                        percent: 1,
                        barColor: '#ff0000'
                    },
                    {
                        percent: 2,
                        barColor: '#ff0000'
                    }
                ]
            },
            {
                title: '2 percent',
                percentBars: [
                    {
                        percent: 1,
                        barColor: '#ff0'
                    },
                    {
                        percent: 2,
                        barColor: '#ff0'
                    }
                ]
            }
        ]
    },
    {
        key: '2',
        title: 'Completude',
        rows: [
            {
                title: '1 percent',
                percentBars: [
                    {
                        percent: 1,
                        barColor: '#ff0'
                    },
                    {
                        percent: 2,
                        barColor: '#ff0'
                    }
                ]
            },
            {
                title: '2 percent',
                percentBars: [
                    {
                        percent: 1,
                        barColor: '#ff0000'
                    },
                    {
                        percent: 2,
                        barColor: '#ff0000'
                    }
                ]
            }
        ]
    }
]

storiesOf('Molecules.TableTabs', module).add('Simple', () => (
    <SANTableTabs tabs={tabs} />
))
