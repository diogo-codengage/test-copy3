import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { ESRow, ESCol } from '../../Atoms/Grid'
import ESTypography from '../../Atoms/Typography'
import ESRate from '../../Atoms/Rate'

import ESBookmark from './Bookmark'

const ESLessonHeader = ({
    className,
    children,
    leftChildren,
    rightChildren,
    rate,
    onBookmarked,
    bookmarked
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-lesson-header', className)

    return (
        <ESRow
            id='es-lesson-header'
            className={classes}
            type='flex'
            justify='space-between'
            align='bottom'
        >
            {leftChildren && (
                <ESCol
                    xs={24}
                    md={24}
                    lg={children ? 7 : 13}
                    className='es-lesson-header__left'
                >
                    {leftChildren}
                </ESCol>
            )}
            <ESCol
                className={classNames('es-lesson-header__bookmark', {
                    'no-rate': !rate
                })}
            >
                {rate && (
                    <div>
                        <ESTypography variant='subtitle2'>
                            {t('lessonHeader.rateClass')}:
                        </ESTypography>
                        <ESRate {...rate} />
                    </div>
                )}
                <ESBookmark
                    {...{ bookmarked, onBookmarked, hideLabel: !!rate }}
                />
            </ESCol>
            {children && (
                <ESCol
                    xs={24}
                    md={24}
                    lg={{ span: 8, push: 1 }}
                    className='es-lesson-header__center'
                >
                    {children}
                </ESCol>
            )}
            {rightChildren && (
                <ESCol
                    xs={24}
                    md={24}
                    lg={children ? 9 : 11}
                    className='es-lesson-header__right'
                >
                    {rightChildren}
                </ESCol>
            )}
        </ESRow>
    )
}

ESLessonHeader.propTypes = {
    className: PropTypes.string,
    rightChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    leftChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    bookmarked: PropTypes.bool,
    onBookmarked: PropTypes.func
}
ESLessonHeader.defaultProps = {}

export default ESLessonHeader
