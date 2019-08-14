import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import ESSessionTitle from './'
import ESButton from '../../Atoms/Button'

storiesOf('Molecules.Session Title', module).add('Simple', () => (
    <ESSessionTitle
        title={text('Title', 'Meu desenvolvimento')}
        subtitle={text(
            'Subtitle',
            'Vejas as indicações de como você está se saindo no seu aprendizado com seu curso'
        )}
        extra={
            <ESButton size='xsmall' bold uppercase variant='outlined'>
                VER MEU DESEMPENHO
            </ESButton>
        }
    />
))
