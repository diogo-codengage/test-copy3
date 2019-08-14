import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import SANBanner from './Banner'

storiesOf('Molecules.Banner', module).add('Simple', () => (
    <SANBanner
        title={text('Title', 'Todos os Cursos')}
        image={text(
            'Image',
            'https://www.e-sanar.com.br/dist/img/box-esanar.png'
        )}
        ButtonProps={{
            children: text('Button children', 'Acessar')
        }}
    />
))
