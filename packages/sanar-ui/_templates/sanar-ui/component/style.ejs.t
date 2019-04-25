---
to: "<%= style ? 'src/Components/' + h.inflection.pluralize(h.inflection.camelize(category)) + '/' + h.inflection.camelize(name) + '/style.less' : null %>"
# src/Components/<%h.inflection.pluralize(h.inflection.camelize(category))%>/<%h.inflection.camelize(name)%>/style.less
---
.es-<%=h.changeCase.param( name ) %> {}
