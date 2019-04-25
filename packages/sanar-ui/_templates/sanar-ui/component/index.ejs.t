---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/index.js
---

export { default } from './<%=h.inflection.camelize(name)%>'
