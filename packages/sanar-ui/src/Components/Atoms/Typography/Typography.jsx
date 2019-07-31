import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveLinesEllipsis = responsiveHOC(0)(LinesEllipsis)

const SeeMoreOrLess = ({ onClick, indicator, ellipsed }) => {
    const { t } = useTranslation('sanarui')

    return (
        <span onClick={onClick}>
            {indicator || (
                <span className='es-typography--ellipsis-action'>
                    {ellipsed
                        ? `... ${t('typography.seeMore')}`
                        : t('typography.seeLess')}
                </span>
            )}
        </span>
    )
}

const ESTypography = ({
    className,
    type,
    level,
    variant,
    regular,
    transform,
    disabled,
    strong,
    ellipsis,
    children,
    component,
    delete: deleteProp,
    ...props
}) => {
    const [ellipsed, setEllipsed] = useState(
        ellipsis && typeof ellipsis === 'object'
    )

    const classes = classNames('es-typography', className, {
        [`es-typography--${type}`]: type,
        [`es-typography--${variant}`]: variant,
        'es-typography--strong': strong,
        'es-typography--regular': regular,
        'es-typography--disabled': disabled,
        'es-typography--delete': deleteProp,
        'es-typography--ellipsis': ellipsis && typeof ellipsis !== 'object',
        [`es-typography--transform-${transform}`]: transform,
        [`es-typography__heading es-typography__heading--h${level}`]:
            level && level !== ''
    })

    const configureEllipsed = () => {
        setEllipsed(old => !old)
    }

    // It'll render a paragraph with ellipsis
    if (typeof ellipsis === 'object' && ellipsed) {
        return (
            <ResponsiveLinesEllipsis
                text={children}
                maxLine={ellipsis.rows ? ellipsis.rows : 2}
                basedOn={ellipsis.basedOn}
                ellipsis={
                    ellipsis.showAction && (
                        <SeeMoreOrLess
                            onClick={configureEllipsed}
                            indicator={ellipsis.indicatorMore}
                            ellipsed
                        />
                    )
                }
                className={classes}
                {...props}
            />
        )
    }

    const Component = component ? component : 'div'
    return (
        <Component className={classes} {...props}>
            {children}
            {typeof ellipsis === 'object' && ellipsis.showAction && (
                <div>
                    <SeeMoreOrLess
                        onClick={configureEllipsed}
                        indicator={ellipsis.indicatorLess}
                        ellipsed={false}
                    />
                </div>
            )}
        </Component>
    )
}

ESTypography.propTypes = {
    className: PropTypes.string,
    component: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    variant: PropTypes.oneOf([
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline'
    ]),
    transform: PropTypes.oneOf(['initial', 'uppercase']),
    className: PropTypes.string,
    regular: PropTypes.bool,
    delete: PropTypes.bool,
    disabled: PropTypes.bool,
    ellipsis: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            rows: PropTypes.number,
            indicatorMore: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.node
            ]),
            indicatorLess: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.node
            ]),
            showAction: PropTypes.bool,
            basedOn: PropTypes.oneOf(['letters', 'words'])
        })
    ]),
    onChange: PropTypes.func,
    type: PropTypes.oneOf([
        'info',
        'warning',
        'danger',
        'success',
        'muted',
        'default',
        'light',
        'secondary'
    ])
}

ESTypography.defaultProps = {}

export default ESTypography
