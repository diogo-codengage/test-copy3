import React from 'react'
import { storiesOf } from '@storybook/react'
import ESMetricCard from './MetricCard'
import { text, select, boolean } from '@storybook/addon-knobs'

const mock = {
    img:
        'https://images.vexels.com/media/users/3/157872/isolated/preview/8d20eee691b54d23d865a69f08a40cd7---cone-terra-b--sica-by-vexels.png',
    doubt:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}

const statusOptions = {
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger'
}

storiesOf('Molecules.MetricCard', module).add('Simple', () => (
    <ESMetricCard
        title={text('Title', 'ES METRIC CARD')}
        doubt={text('Doubt', mock.doubt)}
        img={text('Image URL', mock.img)}
        badge={text('Badge', '25 de 50')}
        status={select('Status', statusOptions, 'success')}
        description={text('Description', 'Horas estudadas na semana')}
        loading={boolean('Loading', false)}
        style={{ width: '200px' }}
    />
))
