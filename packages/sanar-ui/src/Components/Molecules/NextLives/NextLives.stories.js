import React from 'react'
import { storiesOf } from '@storybook/react'

import ESNextLives from './NextLives'
import ESCardNextLive from '../../Atoms/CardNextLive'
import ESButton from '../../Atoms/Button'
import ESEvaIcon from '../../Atoms/EvaIcon'

const actions = [
    <ESButton fontSize={12} clear ghost type='primary'>
        <ESEvaIcon size='small' name='bell' color='primary' /> Lembrado
    </ESButton>,
    <ESButton fontSize={12} clear ghost type='primary'>
        Ver live
        <ESEvaIcon
            size='small'
            name='diagonal-arrow-right-up'
            color='primary'
        />
    </ESButton>
]

const Lives = props => (
    <ESCardNextLive
        title='Live de Correção da prova SUS-SP 2019'
        date='27/04/2019 às 10h'
        {...props}
    />
)

storiesOf('Molecules.NextLives', module).add(
    'Simple',
    () => (
        <ESNextLives>
            {[0, 1, 2, 3, 4, 6, 7].map((e, i) => (
                <div key={i}>
                    <Lives actions={actions} style={{ margin: '0 16px' }} />
                </div>
            ))}
        </ESNextLives>
    ),
    {
        info: {
            propTablesExclude: [Lives]
        }
    }
)
