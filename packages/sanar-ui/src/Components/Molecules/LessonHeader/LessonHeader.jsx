import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESLessonHeaderExtra from './LessonHeaderExtra'
import { ESRow, ESCol } from '../../Atoms/Grid'

const ESLessonHeader = ({ className, children, ...props }) => {
    const classes = classNames('es-lesson-header', className)
    return (
        <div className={classes}>
            <ESRow type='flex' justify='space-between' align='middle'>
                <ESCol
                    xs={24}
                    sm={12}
                    xl={8}
                    className='es-lesson-header__left'
                >
                    left
                </ESCol>
                <ESCol xs={0} xl={1} flex={1}>
                    {children}
                </ESCol>
                <ESCol className='es-lesson-header__right'>
                    <ESLessonHeaderExtra />
                </ESCol>
            </ESRow>
        </div>
    )
}

ESLessonHeader.propTypes = {
    className: PropTypes.string
}
ESLessonHeader.defaultProps = {}

export default ESLessonHeader
