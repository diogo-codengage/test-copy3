import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import crying from '../../../assets/images/feedback-rate/crying.svg'
import sad from '../../../assets/images/feedback-rate/sad.svg'
import confused from '../../../assets/images/feedback-rate/confused.svg'
import smile from '../../../assets/images/feedback-rate/smile.svg'
import inLove from '../../../assets/images/feedback-rate/in-love.svg'

const ESFeedbackRateItem = ({ value, img, label, dirty, selected, onClick }) => {

    const [hover, setHover] = useState(false);

    let opacity: number = 1
    if(dirty)
        opacity = 0.3
    if(hover)
        opacity = 0.7
    if(selected)
        opacity = 1

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={ () => setHover(false)}
             style={{cursor:'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: opacity }}
             onClick={() => onClick(value)}>
                <img src={img} alt={value} style={{ padding: '12px'}}/>
                <span>{label}</span>
            </div>
    )
}

const ESFeedbackRate = ({ className, onClick }) => {
    const classes = classNames('es-feedback-rate', className)

    const [dirty, setDirty] = useState(false)
    const [selected, setSelected] = useState(undefined)

    const select = (selected) => {
        setDirty(true)
        setSelected(selected)

        if(onClick)
            onClick(selected)
    }

    return (
        <div className={classes} style={{ display: 'flex'}}>
            <ESFeedbackRateItem dirty={dirty} selected={selected === 1} onClick={select} value={1} img={crying} label='Péssima'/>
            <ESFeedbackRateItem dirty={dirty} selected={selected === 2} onClick={select} value={2} img={sad} label='Ruin'/>
            <ESFeedbackRateItem dirty={dirty} selected={selected === 3} onClick={select} value={3} img={confused} label='Regular'/>
            <ESFeedbackRateItem dirty={dirty} selected={selected === 4} onClick={select} value={4} img={smile} label='Boa'/>
            <ESFeedbackRateItem dirty={dirty} selected={selected === 5} onClick={select} value={5} img={inLove} label='Incrível'/>
        </div>
    )
}

ESFeedbackRate.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
}
ESFeedbackRate.defaultProps = {}

export default ESFeedbackRate
