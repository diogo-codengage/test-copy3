import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'
import ESCardContinueCourse from './CardContinueCourse'

storiesOf('Atoms.CardContinueCourse', module).add('Simple', () => (
    <ESCardContinueCourse
        module={text('Module', 'Continuar no Módulo 2, aula 5')}
        onContinue={() => console.log('On continue function')}
        borderRadius={boolean('Border radius', true)}
        description={text(
            'Description',
            'Per aumente de cachacis, eu reclamis.'
        )}
    />
))
