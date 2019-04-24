import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESMetricCard from '../'

const mock = {
    img:
        'https://images.vexels.com/media/users/3/157872/isolated/preview/8d20eee691b54d23d865a69f08a40cd7---cone-terra-b--sica-by-vexels.png',
    status: 'danger',
    description: 'Horas estudadas na semana',
    badge: '25 de 50',
    doubt:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    title: 'ES METRIC CARD'
}

it('renders correctly', () => {
    const component = (
        <ESMetricCard
            img={mock.img}
            status={mock.status}
            description={mock.description}
            badge={mock.badge}
            style={{ width: '320px' }}
            doubt={mock.doubt}
            title={mock.title}
        />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
