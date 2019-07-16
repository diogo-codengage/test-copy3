import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

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
    moduleTime,
    disabledBadge,
    disabled,
    ...props
}) => {
    const classes = classNames('es-car-course-module', className, {
        'es-car-course-module--disabled': disabled
    })

    const renderBasedOnDisabled = disabled => {
        return !disabled ? (
            <ESButton onClick={onClick} variant='text' className='pr-no' bold>
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
        <ESCard className={classes}>
            <>
                <div className='es-car-course-module__content'>
                    <div className='es-car-course-module__content__module-data'>
                        <ESSkeleton
                            loading={!title}
                            paragraph={{ rows: 2 }}
                            title={false}
                            dark
                        >
                            <ESTypography variant='overline' className='mb-xs'>
                                {moduleName}
                            </ESTypography>
                            <ESTypography strong>{title}</ESTypography>
                        </ESSkeleton>
                    </div>
                    <div className='es-car-course-module__content__image-container'>
                        <div
                            className='es-car-course-module__content__image-container--image'
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    </div>
                    {!disabled && badge && (
                        <ESCommonBadge
                            className='es-car-course-module__content__badge'
                            status='warning'
                            count={badge}
                        />
                    )}
                    <ESProgress
                        status='warning'
                        percent={progress}
                        square
                        size='small'
                    />
                </div>
                <ESRow type='flex' align='middle' justify='space-between'>
                    <ESSkeleton loading={!moduleTime} paragraph={false}>
                        <ESCol>
                            {/* <ESTypography variant='caption' muted>
                                {moduleTime}
                            </ESTypography> */}
                        </ESCol>
                        <ESCol>{renderBasedOnDisabled(disabled)}</ESCol>
                    </ESSkeleton>
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
    moduleTime: PropTypes.string,
    disabledBadge: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string
}
ESCardCourseModule.defaultProps = {
    actionName: 'Ver aulas',
    disabledBadge: 'PREMIUM'
}

export default ESCardCourseModule
