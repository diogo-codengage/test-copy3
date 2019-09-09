---
to: src/Components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/index.ts
---
export { default } from './<%=h.inflection.camelize(name)%>'
