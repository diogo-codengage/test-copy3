import React from 'react'
import { storiesOf } from '@storybook/react'
import ListView from './ListView'
import { text, number, boolean } from '@storybook/addon-knobs'
import ESListViewItem from '../../Molecules/ListViewItem/ListViewItem'

storiesOf('Atoms.ListView', module).add('Simple', () => (
    <ListView>
        <ESListViewItem
            avatar={text(
                'Avatar',
                'https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
            )}
            avatarSize='large'
            title={text(
                'Title',
                'Blaaaa bla bla asfasd heuaeu haeuhauheu haueh auhe uh'
            )}
            description={text('Descripition', 'Descripition')}
            counter={number('Counter', 0)}
            loading={boolean('Loading', false)}
        />
    </ListView>
))
