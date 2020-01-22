import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import SANTableProgressTabs from './TableProgressTabs'

const tabs = [
    {
        key: '1',
        title: 'taxa de acerto',
        rows: [
            {
                title: '10 percent',
                notPercent: 'Essa especialidade ainda não possui questões.'
            },
            {
                title: '20 percent',
                percentBars: [
                    {
                        percent: 20
                    },
                    {
                        percent: 25
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
                title: '50 percent',
                percentBars: [
                    {
                        percent: 50,
                        barColor: '#ff0'
                    },
                    {
                        percent: 55
                    }
                ]
            },
            {
                title: '80 percent',
                percentBars: [
                    {
                        percent: 80
                    },
                    {
                        percent: 85,
                        barColor: '#ff0000'
                    }
                ]
            }
        ]
    }
]

storiesOf('Molecules.TableTabs', module).add('Simple', () => (
    <SANTableProgressTabs
        tabs={tabs}
        primaryButtonTitle={text(
            'Primary button text',
            'ver DESEMPENHO DETALHADO'
        )}
        onPrimaryButtonClick={() => alert('onPrimaryButtonClick')}
        onSecundaryButtonClick={
            boolean('Secundary button?', false)
                ? () => alert('onSecundaryButtonClick')
                : undefined
        }
        secundaryButtonTitle={text('Secundary button text', 'another button')}
        secundaryButtonColor={text('Secundary button color', '#ff0000')}
    />
))
