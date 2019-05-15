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

const ESCardCourseModule = ({
    className,
    image,
    moduleName,
    badge,
    progress,
    redirectTo,
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
            <ESButton href={redirectTo} variant='text' className='pr-no' bold>
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
                        <ESTypography variant='overline' className='mb-xs'>
                            {moduleName}
                        </ESTypography>
                        <ESTypography strong>{moduleName}</ESTypography>
                    </div>
                    <div
                        className='es-car-course-module__content__image-container'
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    <ESCommonBadge
                        className='es-car-course-module__content__badge'
                        status='warning'
                        count={badge}
                    />
                    <ESProgress
                        status='warning'
                        percent={progress}
                        square
                        size='small'
                    />
                </div>
                <ESRow type='flex' align='middle' justify='space-between'>
                    <ESCol>
                        <ESTypography variant='muted'>
                            {moduleTime}
                        </ESTypography>
                    </ESCol>
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
    actionName: PropTypes.string,
    moduleTime: PropTypes.string,
    disabledBadge: PropTypes.string,
    disabled: PropTypes.bool
}
ESCardCourseModule.defaultProps = {
    actionName: 'Ver aulas',
    disabledBadge: 'PREMIUM'
}

export default ESCardCourseModule