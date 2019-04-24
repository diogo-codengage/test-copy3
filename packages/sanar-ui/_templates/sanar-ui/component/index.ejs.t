---
to: src/Components/<%=h.inflection.pluralize(h.inflection.camelize(category))%>/<%=h.inflection.camelize(name)%>/index.js
---

export { default } from './<%=h.inflection.camelize(name)%>'
