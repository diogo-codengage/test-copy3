import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'
import ESProgress from '../../Atoms/Progress'
import ESEvaIcon from '../../Atoms/EvaIcon'

const Continue = ({ onContinue, module, description }) => (
    <div onClick={onContinue} className='es-change-course__continue'>
        <ESTypography variant='caption' className='text-grey-6'>
            {module}
        </ESTypography>
        <ESTypography strong variant='caption' className='text-grey-8' ellipsis>
            {description}
        </ESTypography>
        <ESEvaIcon name='play-circle' size='large' />
    </div>
)

const ESChangeCourse = ({
    className,
    icon,
    title,
    date,
    expireLabel,
    round,
    percent,
    arrow,
    coverPicture,
    onContinue,
    onChange,
    module,
    description
}) => {
    const classes = classNames(
        'es-change-course',
        {
            'es-change-course__round': round
        },
        className
    )

    const onClick = e => {
        e.stopPropagation()
        onChange && !onContinue && onChange(e)
    }

    if (onContinue && (!module || !description)) {
        throw new Error('Props "module" and "description" is required.')
    }

    return (
        <div
            className={classes}
            style={{
                backgroundImage: `url(${coverPicture})`,
                cursor: !onContinue ? 'pointer' : 'default'
            }}
            onClick={onClick}
        >
            <div className='es-change-course__content'>
                <div className='d-flex align-items-center'>
                    {icon && <img src={icon} className='mr-xs' />}
                    <div>
                        <ESTypography
                            className='text-white'
                            variant='subtitle1'
                        >
                            {title}
                        </ESTypography>
                        <ESTypography
                            className='text-white-7'
                            variant='caption'
                        >{`${expireLabel} ${date}`}</ESTypography>
                    </div>
                </div>
                {onContinue && (
                    <Continue {...{ onContinue, module, description }} />
                )}
            </div>
            <div className='es-change-course__progress'>
                <ESProgress
                    showInfo
                    size='small'
                    status='warning'
                    percent={percent}
                />
                {arrow && (
                    <ESEvaIcon
                        className='ml-xs'
                        size='large'
                        name='arrow-forward-outline'
                    />
                )}
            </div>
        </div>
    )
}

ESChangeCourse.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    module: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    date: PropTypes.string,
    round: PropTypes.bool,
    icon: PropTypes.string,
    percent: PropTypes.number,
    coverPicture: PropTypes.string,
    expireLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

ESChangeCourse.defaultProps = {
    percent: 0,
    expireLabel: 'Termina em:'
}

export default ESChangeCourse
