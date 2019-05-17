import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Avatar } from 'antd'

import { ESRow, ESCol } from '../../Atoms/Grid'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'

const ESInstructor = ({ avatar, labelLive, linkedin, formation, name }) => (
    <div className='es-live-section__instructor'>
        <Avatar
            size='large'
            src={avatar}
            icon={!avatar ? 'user' : undefined}
            className='mr-sm'
        />
        <div className='lines'>
            <ESTypography variant='overline' className='mb-xs'>
                {labelLive}
            </ESTypography>
            <ESTypography strong ellipsis className='text-grey-8 mb-xs'>
                {name}
            </ESTypography>
            <div className='d-flex align-items-center justify-content-between'>
                <ESTypography
                    className='es-live-section__instructor--formation text-grey-7'
                    ellipsis
                    variant='caption'
                >
                    {formation}
                </ESTypography>
                <a
                    target='_blank'
                    href={linkedin}
                    rel='noopener noreferrer'
                    className='es-live-section__instructor--linkedin'
                >
                    <ESEvaIcon name='linkedin' size='xsmall' />
                </a>
            </div>
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
    formation,
    linkedin
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
                        <ESTypography level={6} className='text-grey-8 mb-xs'>
                            {title}
                        </ESTypography>
                        <ESTypography
                            variant='caption'
                            className='text-grey-5 mb-md'
                        >
                            {date}
                        </ESTypography>
                        <ESTypography
                            ellipsis={{ rows: 6 }}
                            variant='body2'
                            className='text-grey-8 mb-md'
                        >
                            {description}
                        </ESTypography>
                        <ESInstructor
                            {...{
                                avatar,
                                labelLive,
                                formation,
                                name,
                                linkedin
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
    action: PropTypes.node,
    linkedin: PropTypes.string,
    formation: PropTypes.string
}

ESLiveSection.defaultProps = {
    height: 400,
    labelLive: 'LIVE FACILITADA POR:'
}

export default ESLiveSection
