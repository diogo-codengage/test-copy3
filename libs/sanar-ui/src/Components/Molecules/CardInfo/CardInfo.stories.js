import React from 'react'
import { storiesOf } from '@storybook/react'
import ESCardInfo from './CardInfo'
import { number, text } from '@storybook/addon-knobs'

storiesOf('Molecules.CardInfo', module).add('Simple', () => (
    <ESCardInfo
        count={number('Count', 9)}
        limit={number('Limit', 10)}
        suffix={text('Suffix', '+')}
        image={text(
            'Image',
            'http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Play-icon.png'
        )}
        text={text('Text', 'Vídeos')}
    />
))
