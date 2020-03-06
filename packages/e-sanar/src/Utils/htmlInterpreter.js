import React from 'react'

const decodeHtml = field => {
  field = field.split('\n').join('')
  field = field.replace(/<\/p><p.*.<\/p>/, '</p>')
  return <span className='dataFromOldBase' dangerouslySetInnerHTML={{ __html: field }} />
}

export const htmlInterpreter = (question) => {
  if (!!question) {
    let { statement, alternatives: { data } } = question
    statement = decodeHtml(statement)
    let alternatives = {
      data: []
    }
    !!data &&
      data.forEach(({ id, text }) => {
        alternatives.data.push({
          id,
          text: decodeHtml(text)
        })
      })

    return { ...question, statement, alternatives }
  }
}

export default htmlInterpreter