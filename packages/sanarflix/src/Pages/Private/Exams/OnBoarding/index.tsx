import React from 'react'

import { SANBox } from '@sanar/components'

import OnBoardingTop from './Top'
import OnBoardingBottom from './Bottom'

const OnBoarding = (props) => {
    return (
        <SANBox>
            <SANBox backgroundColor='grey-solid.1'>
                <OnBoardingTop />
            </SANBox>
            <SANBox>
                <OnBoardingBottom changePage={props.changePage} />
            </SANBox>
        </SANBox>
    )
}

export default OnBoarding
