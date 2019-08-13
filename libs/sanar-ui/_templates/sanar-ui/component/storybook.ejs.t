---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.stories.js
---

import React from 'react'
import { storiesOf } from '@storybook/react'
import ES<%=h.inflection.camelize(name)%> from './<%=h.inflection.camelize(name)%>'

storiesOf('<%=h.inflection.pluralize(h.inflection.camelize(category))%>.<%=h.inflection.camelize(name)%>', module).add('Simple', () => (
    <ES<%=h.inflection.camelize(name)%> />
))
