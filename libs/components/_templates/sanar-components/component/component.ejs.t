---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.tsx
---
import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const SAN<%=h.inflection.camelize(name)%>Styled = styled.div``

type IProps = PropTypes.InferProps<typeof propTypes>

const SAN<%=h.inflection.camelize(name)%>: React.FC<IProps> = () => {
    return (
        <SAN<%=h.inflection.camelize(name)%>Styled>
            <strong>SAN<%=h.inflection.camelize(name)%></strong> works!
        </SAN<%=h.inflection.camelize(name)%>Styled>
    )
}

const propTypes = {}

SAN<%=h.inflection.camelize(name)%>.propTypes = propTypes
SAN<%=h.inflection.camelize(name)%>.defaultProps = {}

export default SAN<%=h.inflection.camelize(name)%>