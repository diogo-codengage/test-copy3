import React from 'react'

import { SANBox } from '@sanar/components'

import OnBoardingTop from './Top'
import OnBoardingBottom from './Bottom'
import { IUserMedUniversity } from 'Apollo/User/Queries/me'

export interface IOnBoardingProps {
    changePage: (response: IUserMedUniversity) => void
    userMedUniversity: IUserMedUniversity
}

const OnBoarding = (props: IOnBoardingProps) => {
    return (
        <SANBox>
            <SANBox backgroundColor='grey-solid.1'>
                <OnBoardingTop />
            </SANBox>
            <SANBox>
                <OnBoardingBottom changePage={props.changePage} userMedUniversity={props.userMedUniversity}/>
            </SANBox>
        </SANBox>
    )
}

export default OnBoarding
