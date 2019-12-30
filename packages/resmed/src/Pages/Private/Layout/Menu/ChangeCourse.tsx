import React, { useState, memo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANEvaIcon,
    SANBox,
    SANButton,
    SANTypography,
    SANDivider,
    SANScroll,
    SANChangeCourse
} from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { useLayoutContext } from '../Context'
import { useMainContext } from 'Pages/Private/Context'

const arr = new Array(10).fill(0).map((_, index) => index)

const RMMenuChangeCourse = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const { setMe, me } = useAuthContext()
    const { onCloseMenu, setMenuTab } = useLayoutContext()

    return (
        <SANScroll>
            <SANBox px='md'>
                <SANButton
                    mb='md'
                    size='xsmall'
                    variant='outlined'
                    color='grey'
                    block
                    bold
                    onClick={() => setMenuTab(0)}
                >
                    <SANEvaIcon name='arrow-back-outline' mr='xs' />
                    {t('mainMenu.back')}
                </SANButton>
            </SANBox>
            <SANChangeCourse
                id='1'
                title={'Extensivo'}
                date={'23/05/2020'}
                percent={45}
                loading={false}
                coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
                onChange={console.log}
                ContinueProps={{
                    onClick: console.log,
                    title: 'Continuar na aula 5',
                    subtitle: 'Duis rhoncus dui venenatis consequa'
                }}
            />

            <SANBox px='md'>
                <SANTypography fontSize='xl' color='grey.7' my='md'>
                    {t('mainMenu.changeCourse.subtitle')}
                </SANTypography>
                {arr.map(e => (
                    <SANChangeCourse
                        key={e}
                        mb='md'
                        id='1'
                        title={'Extensivo'}
                        date={'23/05/2020'}
                        percent={45}
                        loading={false}
                        coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
                        onChange={console.log}
                    />
                ))}
            </SANBox>
        </SANScroll>
    )
})

export default withRouter(RMMenuChangeCourse)
