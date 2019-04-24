---
to: src/Components/<%=h.inflection.pluralize(h.inflection.camelize(category))%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.jsx
---

import React from 'react'
import PropTypes from 'prop-types'

const ES<%=h.inflection.camelize(name)%> = () => (
    <div>
        <strong>ES<%=h.inflection.camelize(name)%></strong> works!
    </div>
)

ES<%=h.inflection.camelize(name)%>.propTypes = {}
ES<%=h.inflection.camelize(name)%>.defaultProps = {}

export default ES<%=h.inflection.camelize(name)%>