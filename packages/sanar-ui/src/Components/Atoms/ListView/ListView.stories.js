import React from 'react'
import { storiesOf } from '@storybook/react'
import ListView from './ListView'
import { boolean } from '@storybook/addon-knobs'
import ESListViewItem from './ListViewItem'
import ESTypography from '../Typography'

storiesOf('Atoms.ListView', module).add('Simple', () => {
    const renderItems = () => (
        <ESListViewItem
            avatar={boolean('Avatar', false)}
            loading={boolean('Loading', false)}
        >
            <ESTypography level={2}>Here is some content!</ESTypography>
        </ESListViewItem>
    )

    return <ListView dataSource={['Teste']} renderItem={renderItems} />
})
