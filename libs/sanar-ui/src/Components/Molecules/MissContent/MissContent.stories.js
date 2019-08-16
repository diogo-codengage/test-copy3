import React from 'react'
import { storiesOf } from '@storybook/react'
import ESMissContent from './MissContent'
import { select, boolean, text } from '@storybook/addon-knobs'

const directionOptions = {
    Column: 'column',
    Row: ''
}

storiesOf('Molecules.MissContent', module).add('Simple', () => (
    <ESMissContent
        direction={select('Direction', directionOptions)}
        fullSpace={boolean('Full space', false)}
        text={text('Text', 'Seja o primeiro a fazer uma pergunta!')}
        image={text(
            'Image',
            'https://banner2.kisspng.com/20171218/621/question-mark-png-5a3813d34eadf5.2716127515136245313223.jpg'
        )}
        buttonText={text('Button text', 'QUERO PERGUNTAR')}
        buttonAction={() => console.log('Button action was tiggered.')}
    />
))
