import React from 'react'
import { storiesOf } from '@storybook/react'
import ESLessonHeader from './LessonHeader'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'
import ESLessonHeaderExtra from './LessonHeaderExtra'

const renderTabBarFun = (props, DefaultTabBar) => (
    <ESLessonHeader>
        <DefaultTabBar {...props} style={{ background: 'none' }} />
    </ESLessonHeader>
)

storiesOf('Molecules.LessonHeader', module)
    .add('Simple', () => <ESLessonHeader />, {
        style: {
            background: '#242938',
            height: 300
        }
    })
    .add(
        'Extra default',
        () => (
            <ESLessonHeaderExtra
                previousLesson='Consectetur adipisicing elit'
                nextLesson='Lorem ipsum dolor sit amet.'
            />
        ),
        {
            style: {
                background: '#242938',
                height: 300
            }
        }
    )
    .add(
        'With tabs',
        () => (
            <ESTabs
                dark
                center
                defaultActiveKey='1'
                renderTabBar={renderTabBarFun}
            >
                <ESTabPane tab='Tab 1' key='1'>
                    1
                </ESTabPane>
                <ESTabPane tab='Tab 2' key='2'>
                    2
                </ESTabPane>
            </ESTabs>
        ),
        {
            style: {
                background: '#242938',
                height: 300
            }
        }
    )
