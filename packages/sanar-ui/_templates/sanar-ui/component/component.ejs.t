---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.jsx
---

import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ES<%=h.inflection.camelize(name)%> = ({ className }) => {
    const classes = classNames(es-<%=h.changeCase.param( name ) %>, className)
    return (
        <div className={classes}>
            <strong>ES<%=h.inflection.camelize(name)%></strong> works!
        </div>
    )
}

ES<%=h.inflection.camelize(name)%>.propTypes = {
    className: PropTypes.string
}
ES<%=h.inflection.camelize(name)%>.defaultProps = {}

export default ES<%=h.inflection.camelize(name)%>