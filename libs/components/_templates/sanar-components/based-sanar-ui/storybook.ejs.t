---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.stories.tsx
---

import React from 'react'
import { storiesOf } from '@storybook/react'
import SAN<%=h.inflection.camelize(name)%> from './<%=h.inflection.camelize(name)%>'

storiesOf('<%=h.inflection.pluralize(h.inflection.camelize(category))%>.<%=h.inflection.camelize(name)%>', module).add('Simple', () => (
    <SAN<%=h.inflection.camelize(name)%> />
))
