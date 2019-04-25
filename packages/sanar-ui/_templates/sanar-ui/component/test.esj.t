---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/__tests__/<%=h.inflection.camelize(name)%>.test.js
---

import React from 'react'
import TestRenderer from 'react-test-renderer'

import ES<%=h.inflection.camelize(name)%> from '../'

it('renders correctly', () => {
    const component = (
        <ES<%=h.inflection.camelize(name)%>>
            <h1>ES<%=h.inflection.camelize(name)%></h1>
        </ES<%=h.inflection.camelize(name)%>>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
