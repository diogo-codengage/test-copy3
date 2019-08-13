import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESChangeCourse from '../'

it('renders correctly', () => {
    const component = (
        <ESChangeCourse
            title='Trilha Sanar Enfermagem'
            date='23/05/2020'
            percent={45}
            coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
            icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:2eef4ded-78c2-4ef5-abe4-08b602aad71c&params=version:0&token=1558008652_da39a3ee_7a22c22a02018c4fd70f9f9f69150074add489ff&api_key=CometServer1'
        />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
