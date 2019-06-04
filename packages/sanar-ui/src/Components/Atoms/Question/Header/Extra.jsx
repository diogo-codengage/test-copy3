import React from 'react'
import ESButton from '../../Button'
import './style.less'

const Extra = ({ actions }) => (
    <div className='extras'>
        {actions &&
            actions.length &&
            actions.map(i => <ESButton {...i}>{i.title}</ESButton>)}
    </div>
)

export default Extra
