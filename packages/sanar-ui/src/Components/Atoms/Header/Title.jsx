import React from 'react'
import ESTypography from '../Typography'

const Title = ({ title, extra, subtitle }) => (
    <>
        <div className='side-by-side'>
            <ESTypography level={4}>{title}</ESTypography>
            {extra && (
                <div className='side-by-side__subtitle'>
                    <ESTypography variant='subtitle2'>{extra}</ESTypography>
                </div>
            )}
        </div>
        {subtitle && (
            <ESTypography variant='subtitle2'>{subtitle}</ESTypography>
        )}
    </>
)

export default Title
