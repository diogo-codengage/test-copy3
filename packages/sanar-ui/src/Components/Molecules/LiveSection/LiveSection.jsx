import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Avatar } from 'antd'

import { ESRow, ESCol } from '../../Atoms/Grid'

import linkedinSvg from '../../../assets/images/linkedin/linkedin.svg'
import ESTypography from '../../Atoms/Typography'
import ESCounterLabel from '../../Atoms/CounterLabel'

const ESInstructor = ({ avatar, labelLive, qtCourses, labelCourses, name }) => (
    <div className='es-live-section__instructor'>
        <Avatar
            size='large'
            src={avatar}
            icon={!avatar ? 'user' : undefined}
            className='mr-sm'
        />
        <div className='lines'>
            <ESTypography
                ellipsis
                type='muted'
                variant='caption'
                className='es-live-section__instructor--label mb-xs'
            >
                {labelLive}
            </ESTypography>
            <ESTypography
                strong
                ellipsis
                className='es-live-section__instructor--name mb-xs'
            >
                {name}
            </ESTypography>
            <ESRow type='flex'>
                <ESCol>
                    <ESCounterLabel label={labelCourses} counter={qtCourses} />
                </ESCol>

                <ESCol>
                    <img
                        className='es-live-section__instructor--linkedin'
                        src={linkedinSvg}
                    />
                </ESCol>
            </ESRow>
        </div>
    </div>
)

const ESLiveSection = ({
    className,
    videoSrc,
    height,
    labelLive,
    title,
    date,
    description,
    avatar,
    name,
    action,
    qtCourses,
    labelCourses
}) => {
    const classes = classNames('es-live-section', className)

    return (
        <ESRow className={classes} gutter={48} type='flex'>
            <ESCol
                xs={24}
                md={15}
                lg={18}
                style={{ height }}
                className='es-live-section__player'
            >
                <div>
                    <iframe
                        width='100%'
                        height='100%'
                        src={videoSrc}
                        frameBorder='0'
                        allowFullScreen
                    />
                </div>
            </ESCol>
            <ESCol xs={24} md={9} lg={6}>
                <ESRow
                    type='flex'
                    direction='column'
                    justify='space-between'
                    height='100%'
                >
                    <ESCol span={24} className='mb-lg'>
                        <ESTypography
                            level={6}
                            className='es-live-section__title mb-xs'
                        >
                            {title}
                        </ESTypography>
                        <ESTypography
                            type='muted'
                            variant='caption'
                            className='mb-md'
                        >
                            {date}
                        </ESTypography>
                        <ESTypography
                            ellipsis={{ rows: 6 }}
                            variant='body2'
                            className='es-live-section__description mb-md'
                        >
                            {description}
                        </ESTypography>
                        <ESInstructor
                            {...{
                                avatar,
                                labelLive,
                                labelCourses,
                                qtCourses,
                                name
                            }}
                        />
                    </ESCol>
                    <ESCol className='es-live-section__action' span={24}>
                        {action}
                    </ESCol>
                </ESRow>
            </ESCol>
        </ESRow>
    )
}

ESLiveSection.propTypes = {
    videoSrc: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelLive: PropTypes.string,
    labelCourses: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    qtCourses: PropTypes.number,
    action: PropTypes.node,
    courses: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
ESLiveSection.defaultProps = {
    height: 400,
    labelLive: 'LIVE FACILITADA POR:',
    labelCourses: 'Curso',
    name: 'Francisco José',
    qtCourses: 1
}

export default ESLiveSection
