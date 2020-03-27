import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import {
    SANTypography,
    SANBox,
    SANRow,
    SANCol,
    SANSelectList
} from '@sanar/components'

import themeImg from 'Assets/images/exam-filter/subject-theme.svg'

import { useExamFilterContext } from './Context'
import { NextButton, PrevButton } from './'

interface IFLXFilterThemeProps {}

const FLXFilterTheme: React.FC<IFLXFilterThemeProps> = () => {
    const { t } = useTranslation('sanarflix')
    const {
        setCurrentTab,
        state,
        handleTheme,
        themes,
        loadingThemes
    } = useExamFilterContext()

    useEffect(() => {
        handleTheme(themes.map(item => item.value))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themes])

    return (
        <SANBox
            px={{ md: '8', _: 'md' }}
            pb={{ md: 'xxl', _: 'xl' }}
            pt={{ md: '8', _: 'md' }}
        >
            <SANRow align='top' justify='space-between' type='flex' gutter={24}>
                <SANCol xs={24} sm={12} md={12}>
                    <SANTypography
                        color='grey.6'
                        fontSize={{ md: 'xl', _: 'lg' }}
                    >
                        {t('examFilter.theme.description')}
                    </SANTypography>
                    <SANBox
                        as='img'
                        src={themeImg}
                        alt='Tema'
                        width='100%'
                        height={{ sm: 220, _: 124 } as any}
                        mb={{ xs: '0', _: 'md' }}
                    />
                </SANCol>
                <SANCol xs={24} sm={12} md={12}>
                    <SANSelectList
                        disabled={!state.discipline.length}
                        placeholder={t('examFilter.theme.select')}
                        onChange={handleTheme}
                        items={!!state.discipline.length ? themes : []}
                        value={state.theme}
                        loading={loadingThemes}
                        forceScroll={true}
                    />
                </SANCol>
            </SANRow>
            <SANBox
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mt={{ md: 'xxl', _: 'xl' }}
            >
                <PrevButton onClick={() => setCurrentTab('discipline')} />
                <NextButton
                    disabled={!state.theme || !state.theme.length}
                    onClick={() => setCurrentTab('semester')}
                />
            </SANBox>
        </SANBox>
    )
}

export default FLXFilterTheme
