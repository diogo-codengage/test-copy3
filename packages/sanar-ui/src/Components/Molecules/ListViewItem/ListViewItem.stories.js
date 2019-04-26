import React from 'react'
import { storiesOf } from '@storybook/react'
import ESListViewItem from './ListViewItem'
import { List } from 'antd'
import { text, number, boolean } from '@storybook/addon-knobs'

storiesOf('Molecules.ListViewItem', module).add('Simple', () => (
    <div style={{ background: '#FFF', padding: '0 16px', width: 300 }}>
        <List>
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
            <ESListViewItem
                avatar={text(
                    'Avatar',
                    'https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
                )}
                avatarSize='default'
                title={text(
                    'Title',
                    'Blaaaa bla bla asfasd heuaeu haeuhauheu haueh auhe uh'
                )}
                description={text('Descripition', 'Descripition')}
                category={text('Category', 'AULA')}
            />
        </List>
    </div>
))
