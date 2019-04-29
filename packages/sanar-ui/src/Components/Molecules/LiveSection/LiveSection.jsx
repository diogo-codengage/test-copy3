import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Avatar, Typography } from 'antd'

import { ESRow, ESCol } from '../../Atoms/Grid'

import linkedinPng from '../../../assets/linkedin/linkedin.png'

const { Title, Text, Paragraph } = Typography

const ESInstructor = ({ avatar, labelLive, labelCourses, name }) => (
    <ESRow
        className='es-live-section__instructor'
        type='flex'
        align='middle'
        gutter={16}
    >
        <ESCol>
            <Avatar size='large' src={avatar} icon='user' />
        </ESCol>
        <ESCol flex={1}>
            <ESRow type='flex' direction='column'>
                <ESCol>
                    <Text
                        ellipsis
                        disabled
                        className='es-live-section__instructor--label'
                    >
                        {labelLive}
                    </Text>
                </ESCol>
                <ESCol>
                    <Text
                        strong
                        ellipsis
                        className='es-live-section__instructor--name'
                    >
                        {name}
                    </Text>
                </ESCol>
                <ESCol>
                    <ESRow
                        type='flex'
                        direction='row'
                        align='middle'
                        gutter={5}
                        className='es-live-section__instructor--course'
                    >
                        <ESCol>
                            <strong>4</strong>
                        </ESCol>
                        <ESCol>
                            <Text disabled>{labelCourses}</Text>
                        </ESCol>
                        <ESCol>
                            <img
                                className='es-live-section__instructor--linkedin'
                                src={linkedinPng}
                            />
                        </ESCol>
                    </ESRow>
                </ESCol>
            </ESRow>
        </ESCol>
    </ESRow>
)

const ESLiveSection = ({
    className,
    videoSrc,
    height,
    labelLive,
    labelCourses,
    title,
    date,
    description,
    avatar,
    name,
    action
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
                    <ESCol span={24}>
                        <Title level={4} className='es-live-section__title'>
                            {title}
                        </Title>
                        <Text disabled className='es-live-section__date'>
                            {date}
                        </Text>
                        <Paragraph className='es-live-section__description'>
                            {description}
                        </Paragraph>
                        <ESInstructor
                            {...{ avatar, labelLive, labelCourses, name }}
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
    action: PropTypes.node
}
ESLiveSection.defaultProps = {
    height: 400,
    labelLive: 'LIVE FACILITADA POR:',
    labelCourses: 'Cursos'
}

export default ESLiveSection
