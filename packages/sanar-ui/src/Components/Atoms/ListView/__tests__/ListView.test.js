import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESListView from '../ListView'
import ESListViewItem from '../ListViewItem'

it('renders correctly', () => {
    const component = (
        <ESListView>
            <ESListViewItem>>Here is some content!</ESListViewItem>
        </ESListView>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
