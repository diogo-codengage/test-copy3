import React from 'react'
import PropTypes from 'prop-types'
import { List, Typography, Avatar, Skeleton } from 'antd'
import ESCounterLabel from '../../Atoms/CounterLabel'
import { ESCol, ESRow } from '../../Atoms/Grid'

const ESListViewItem = ({
    avatar,
    avatarSize,
    title,
    description,
    counter,
    category,
    loading
} = props) => (
    <List.Item className='es-list-view-item'>
        <Skeleton avatar loading={loading} active>
            <ESRow
                type='flex'
                className='es-list-view-item__container'
                gutter={16}
            >
                <ESCol>
                    <Avatar
                        className='es-list-view-item--avatar'
                        size={avatarSize}
                        src={avatar}
                    />
                </ESCol>
                <ESCol flex={1} className='es-list-view-item__content'>
                    {category && (
                        <ESRow>
                            <Typography.Text
                                disabled
                                className='es-list-view-item__content--category'
                            >
                                {category}
                            </Typography.Text>
                        </ESRow>
                    )}
                    <ESRow>
                        <Typography.Text
                            ellipsis
                            className='es-list-view-item__content--title'
                        >
                            {title}
                        </Typography.Text>
                    </ESRow>
                    <ESRow>
                        <ESCol xs={24} md={12}>
                            <Typography.Text strong>
                                {description}
                            </Typography.Text>
                        </ESCol>
                        <ESCol
                            xs={24}
                            md={12}
                            className='es-list-view-item__content--counter'
                        >
                            {counter >= 0 && (
                                <ESCounterLabel
                                    counter={counter}
                                    label='Resposta'
                                />
                            )}
                        </ESCol>
                    </ESRow>
                </ESCol>
            </ESRow>
        </Skeleton>
    </List.Item>
)
ESListViewItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarSize: PropTypes.string || PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    counter: PropTypes.number
}
ESListViewItem.defaultProps = {}

export default ESListViewItem
