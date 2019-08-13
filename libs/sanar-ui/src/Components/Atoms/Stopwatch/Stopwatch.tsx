import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESEvaIcon from '../EvaIcon'

import useStopwatch from '../../../Hooks/useStopwatch'

const formatTime = (hours, minutes, seconds, days) => {
    let finalHours
    let finalMinutes
    let finalSeconds

    if (hours > 9) {
        finalHours = hours
    } else {
        finalHours = `0${hours}`
    }
    if (minutes > 9) {
        finalMinutes = minutes
    } else {
        finalMinutes = `0${minutes}`
    }
    if (seconds > 9) {
        finalSeconds = seconds
    } else {
        finalSeconds = `0${seconds}`
    }
    const formatted = `${finalHours}:${finalMinutes}:${finalSeconds}`

    if (days) return `${days}d  - ${formatted}`
    return formatted
}

type IProps = PropTypes.InferProps<typeof propTypes>
const ESStopwatch: React.FC<IProps> = ({ className, autoStart, dark }, ref) => {
    const [paused, setPaused] = useState(!autoStart)
    const {
        hours,
        minutes,
        seconds,
        start,
        pause,
        days,
        reset
    } = useStopwatch()
    const classes = classNames(
        'es-stopwatch',
        {
            'es-stopwatch--stopped': paused,
            'es-stopwatch--dark': dark
        },
        className
    )

    const handlePause = () => {
        setPaused(true)
        pause()
    }

    const handleStart = () => {
        setPaused(false)
        start()
    }

    useEffect(() => {
        autoStart && start()
    }, [])

    useImperativeHandle(ref, () => ({
        start: () => handleStart(),
        pause: () => handlePause(),
        time: () => formatTime(hours, minutes, seconds, days),
        reset: () => reset()
    }))

    return (
        <div className={classes}>
            {paused ? (
                <ESEvaIcon key='1' name='pause-circle-outline' />
            ) : (
                <ESEvaIcon key='2' name='clock-outline' />
            )}
            <span>{formatTime(hours, minutes, seconds, days)}</span>
        </div>
    )
}

const propTypes = {
    className: PropTypes.string,
    autoStart: PropTypes.bool,
    dark: PropTypes.bool
}
ESStopwatch.propTypes = propTypes
ESStopwatch.defaultProps = {}

export default forwardRef(ESStopwatch)
