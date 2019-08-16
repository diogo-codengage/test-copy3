import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESCard from '../Card'
import ESProgress from '../../Atoms/Progress'
import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESEvaIcon from '../../Atoms/EvaIcon/EvaIcon'
import ESCommonBadge from '../../Atoms/CommonBadge'
import ESSkeleton from '../../Atoms/Skeleton'

const ESCardCourseModule = ({
    className,
    image,
    moduleName,
    title,
    badge,
    progress,
    onClick,
    actionName,
    disabledBadge,
    newBadge,
    disabled,
    ...props
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-car-course-module', className, {
        'es-car-course-module--disabled': disabled
    })

    const renderBasedOnDisabled = disabled => {
        return !disabled ? (
            <ESButton
                onClick={onClick}
                variant='text'
                className='pr-no'
                bold
                size='xsmall'
            >
                {actionName}
                <ESEvaIcon name='chevron-right-outline' size='large' />
            </ESButton>
        ) : (
            <div className='es-car-course-module--disabled__badge'>
                <ESEvaIcon name='lock-outline' />
                {disabledBadge}
            </div>
        )
    }

    return (
        <ESCard className={classes} {...props}>
            <>
                <div className='es-car-course-module__content'>
                    <div className='es-car-course-module__content__module-data'>
                        <ESSkeleton
                            loading={!title}
                            paragraph={{ rows: 2 }}
                            title={false}
                            dark
                        >
                            {moduleName && (
                                <ESTypography
                                    variant='overline'
                                    className='mb-xs'
                                >
                                    {moduleName}
                                </ESTypography>
                            )}

                            <ESTypography strong>{title}</ESTypography>
                        </ESSkeleton>
                    </div>
                    <div
                        className={classNames(
                            'es-car-course-module__content__image-container',
                            { 'mb-sm': !progress }
                        )}
                    >
                        <div
                            className='es-car-course-module__content__image-container--image'
                            style={{
                                backgroundImage: `url(${image})`
                            }}
                        />
                    </div>
                    {!disabled && badge && (
                        <ESCommonBadge
                            className='es-car-course-module__content__badge'
                            status='warning'
                            count={badge}
                        />
                    )}
                    {newBadge && (
                        <div className='badge-new'>
                            <ESTypography variant='overline' strong>
                                {t('cardCourseModule.new')}
                            </ESTypography>
                        </div>
                    )}

                    {progress && (
                        <ESProgress
                            status='warning'
                            percent={progress}
                            square
                            size='small'
                        />
                    )}
                </div>
                <ESRow type='flex' align='middle' justify='end'>
                    <ESCol>{renderBasedOnDisabled(disabled)}</ESCol>
                </ESRow>
            </>
        </ESCard>
    )
}

ESCardCourseModule.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    moduleName: PropTypes.string,
    badge: PropTypes.string,
    progress: PropTypes.number,
    redirectTo: PropTypes.string,
    actionName: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    disabledBadge: PropTypes.string,
    newBadge: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string
}
ESCardCourseModule.defaultProps = {
    actionName: 'Ver aulas',
    disabledBadge: 'PREMIUM'
}

export default ESCardCourseModule
