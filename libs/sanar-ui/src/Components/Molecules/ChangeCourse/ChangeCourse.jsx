import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'
import ESProgress from '../../Atoms/Progress'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESSkeleton from '../../Atoms/Skeleton'
import ESCardContinueCourse from '../../Atoms/CardContinueCourse/CardContinueCourse'

const ESChangeCourse = ({
    className,
    icon,
    title,
    id,
    date,
    expireLabel,
    round,
    percent,
    arrow,
    coverPicture,
    onContinue,
    onChange,
    module,
    loading,
    description
}) => {
    const [loadingIcon, setOnLoadIcon] = useState(true)
    const classes = classNames(
        'es-change-course',
        {
            'es-change-course__round': round
        },
        className
    )

    const onClick = e => {
        e.stopPropagation()
        onChange && !onContinue && onChange(id)
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
                    <ESSkeleton
                        paragraph={false}
                        title={false}
                        avatar={{ size: 30 }}
                        active
                        dark
                        loading={loadingIcon || (!loadingIcon && loading)}
                        className='es-change-course__content--skeleton'
                    />
                    <img
                        src={icon}
                        className='es-change-course__content--image'
                        width={30}
                        onLoad={() => setOnLoadIcon(false)}
                        style={{
                            display:
                                loadingIcon || (!loadingIcon && loading)
                                    ? 'none'
                                    : 'block'
                        }}
                    />
                    <ESSkeleton
                        paragraph={{ rows: 1, width: '80%' }}
                        title={{ width: '90%' }}
                        active
                        dark
                        loading={loading}
                    >
                        <div className='es-change-course__content--title'>
                            <ESTypography
                                variant='subtitle1'
                                ellipsis
                                strong
                                className='text-white-10'
                            >
                                {title}
                            </ESTypography>
                            {date && (
                                <ESTypography
                                    className='text-white-7'
                                    variant='caption'
                                >{`${expireLabel} ${date}`}</ESTypography>
                            )}
                        </div>
                    </ESSkeleton>
                </div>
                {onContinue && (
                    <ESCardContinueCourse
                        loading={loading}
                        className='mt-md mb-md'
                        borderRadius
                        {...{ onContinue, module, description }}
                    />
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
    id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    module: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    date: PropTypes.string,
    round: PropTypes.bool,
    loading: PropTypes.bool,
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
