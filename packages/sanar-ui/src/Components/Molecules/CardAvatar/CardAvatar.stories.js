import React from 'react'
import { storiesOf } from '@storybook/react'
import ESCardAvatar from './CardAvatar'
import { text } from '@storybook/addon-knobs'

const mock = {
    image:
        'https://i.pinimg.com/originals/b8/d8/26/b8d826ffcc75dd32fe7a799aff0e7ace.jpg'
}

storiesOf('Molecules.CardAvatar', module).add('Simple', () => (
    <ESCardAvatar
        image={mock.image}
        name={text('Name', 'Jennifer Aniston')}
        formation={text('Formation', 'Enfermeira Mestra em Saúde Pública')}
    />
))
