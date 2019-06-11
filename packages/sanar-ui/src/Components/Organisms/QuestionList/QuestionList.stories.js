import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number } from '@storybook/addon-knobs'

import ESButton from '../../Atoms/Button'
import ESDropdown from '../../Atoms/Dropdown'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'
import ESMenu, { ESItem } from '../../Atoms/Menu'

import ESQuestionList from './QuestionList'
import ESQuestionListHeader from './QuestionListHeader'
import ESQuestionListFooter from './QuestionListFooter'
import ESQuestionListContent from './QuestionListContent'
import ESQuestionListItem from './QuestionListItem'

const menu = (
    <ESMenu>
        <ESItem key='1'>Item 1</ESItem>
        <ESItem key='2'>Item 2</ESItem>
        <ESItem key='3'>Item 3</ESItem>
    </ESMenu>
)

const arr = [0, 1, 2, 3, 4, 5]

storiesOf('Organisms.QuestionList', module).add(
    'Simple',
    () => (
        <ESQuestionList>
            <ESQuestionListHeader title='6 Perguntas'>
                <ESDropdown overlay={menu} trigger={['click']}>
                    <ESTypography strong variant='caption'>
                        Ordenar por
                        <ESEvaIcon name='chevron-down-outline' />
                    </ESTypography>
                </ESDropdown>
            </ESQuestionListHeader>
            <ESQuestionListContent>
                {arr.map((e, i) => (
                    <ESQuestionListItem
                        key={i}
                        loading={boolean('Loading', false)}
                        avatar={text(
                            'Avatar',
                            'https://freeiconshop.com/wp-content/uploads/edd/person-girl-flat.png'
                        )}
                        title={text(
                            'Title',
                            'Orci consectetur metus Nulla est justo Vivamus nec orci pur'
                        )}
                        author={text('Author', 'Eliza Reid')}
                        userIsAuthor={boolean('User is author', false)}
                        badgeInfo={text('Badge', 'Você')}
                        interactionTime={text('Interaction time', 'Há 2 horas')}
                        responses={number('Responses', 0)}
                    />
                ))}
            </ESQuestionListContent>
            <ESQuestionListFooter>
                <ESButton
                    size='xsmall'
                    variant='text'
                    color='primary'
                    uppercase
                    bold
                >
                    Carregar mais
                </ESButton>
            </ESQuestionListFooter>
        </ESQuestionList>
    ),
    {
        info: {
            propTablesExclude: [
                ESQuestionList,
                ESQuestionListFooter,
                ESQuestionListHeader,
                ESQuestionListContent,
                ESButton
            ]
        }
    }
)
