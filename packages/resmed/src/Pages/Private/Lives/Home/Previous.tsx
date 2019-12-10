import React, { useCallback, useState, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANLayoutContainer,
    SANCardLive,
    SANRow,
    SANCol,
    SANButton,
    SANBox,
    SANEvaIcon,
    SANTypography
} from '@sanar/components'
import { useThemeContext, useWindowSize } from '@sanar/utils/dist/Hooks'

const arr = new Array(8).fill(0).map((_, i) => i)

const RMPrevious = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const theme = useThemeContext()
    const { width } = useWindowSize()
    const [hasList, setHasList] = useState(false)

    const propsCol = useMemo(() => {
        return hasList
            ? {
                  span: 24
              }
            : {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 6
              }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasList])

    const isList = useMemo(() => width > 576, [width])

    const renderLive = useCallback(
        e => (
            <SANCol mb={{ sm: 'xl', _: 'sm' }} key={e} {...propsCol}>
                <SANCardLive
                    hasList={isList ? hasList : true}
                    title='Live de Correção da prova SUS-SP 2019'
                    date='27/04/2019'
                    description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
                    onClick={() => history.push('/inicio/lives/anterior')}
                />
            </SANCol>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hasList, isList]
    )

    return (
        <SANLayoutContainer>
            <SANBox
                display='flex'
                alignItem='center'
                justifyConten='space-between'
                mb='md'
            >
                <SANBox flex='1'>
                    <SANTypography fontWeight='bold' fontSize='lg'>
                        {t('lives.previousList.title')}
                    </SANTypography>
                </SANBox>
                <SANBox
                    display={{ xs: 'flex', _: 'none' }}
                    alignItems='center'
                    justifyContent='flex-end'
                >
                    <SANButton
                        size='xsmall'
                        variant='text'
                        circle
                        mr='xs'
                        style={{
                            backgroundColor: !hasList && theme.colors.grey[2]
                        }}
                        onClick={() => setHasList(false)}
                    >
                        <SANEvaIcon name='grid-outline' />
                    </SANButton>
                    <SANButton
                        size='xsmall'
                        variant='text'
                        circle
                        style={{
                            backgroundColor: hasList && theme.colors.grey[2]
                        }}
                        onClick={() => setHasList(true)}
                    >
                        >
                        <SANEvaIcon name='list-outline' />
                    </SANButton>
                </SANBox>
            </SANBox>
            <SANRow gutter={24}>{arr.map(renderLive)}</SANRow>
            <SANBox maxWidth='232px' mt={{ xs: 'xl', _: 'md' }} mx='auto'>
                <SANButton
                    size='xsmall'
                    variant='outlined'
                    color='primary'
                    uppercase
                    bold
                    block
                >
                    {t('lives.previousList.loadMore')}
                </SANButton>
            </SANBox>
        </SANLayoutContainer>
    )
}

export default withRouter(RMPrevious)
