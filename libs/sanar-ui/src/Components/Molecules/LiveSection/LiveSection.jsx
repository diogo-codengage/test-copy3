import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Avatar } from 'antd'

import { ESRow, ESCol } from '../../Atoms/Grid'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESSkeleton from '../../Atoms/Skeleton'
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
            <div className='d-flex align-items-center'>
                {!!formation && (
                    <ESTypography
                        className='text-grey-7'
                        ellipsis
                        variant='caption'
                    >
                        {formation}
                    </ESTypography>
                )}
                {!!linkedin && (
                    <a
                        target='_blank'
                        href={linkedin}
                        rel='noopener noreferrer'
                        className='es-live-section__instructor--linkedin'
                    >
                        <ESEvaIcon name='linkedin' size='xsmall' />
                    </a>
                )}
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
    linkedin,
    online,
    labelAoVivo
}) => {
    const [loading, setLoading] = useState(true)
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
                    {online && (
                        <ESTypography
                            className='aovivo'
                            variant='caption'
                            strong
                        >
                            {labelAoVivo}
                        </ESTypography>
                    )}
                    <ESSkeleton
                        active
                        loading={loading}
                        title={false}
                        paragraph={false}
                        avatar={{ shape: 'square', size: 400 }}
                    />
                    <iframe
                        onLoad={() => setLoading(false)}
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
                        {!!name && (
                            <ESInstructor
                                {...{
                                    avatar,
                                    labelLive,
                                    formation,
                                    name,
                                    linkedin
                                }}
                            />
                        )}
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
    online: PropTypes.bool,
    videoSrc: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelLive: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelAoVivo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
    labelLive: 'LIVE FACILITADA POR:',
    labelAoVivo: 'Ao vivo'
}

export default ESLiveSection
