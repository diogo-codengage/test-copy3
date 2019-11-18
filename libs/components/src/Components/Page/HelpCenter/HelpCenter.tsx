import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { SANCollapse, SANCollapsePanel } from '../../Atoms/Collapse'
import { SANBox } from '../../Atoms/Box'
import { SANInput } from '../../Atoms/Input'
import { SANTypography } from '../../Atoms/Typography'
import { SANSessionTitle } from '../../Atoms/SessionTitle'
import { SANPage } from '../../Templates/Page'

import { normalize } from '@sanar/utils/dist/Normalize'
import dataHelper from './data'

export interface ISANHelpCenterProps {
    data: any
    onBack: () => void
}

const SANHelpCenter = ({
    data: dataProp = dataHelper,
    onBack
}: ISANHelpCenterProps) => {
    const { t } = useTranslation('components')
    const [data, setData] = useState(dataProp)
    const [prevTextLen, setPrevTextLen] = useState(0)

    const getSearchData = text => {
        if (!text.trim()) {
            setData(dataProp)
        } else if (prevTextLen > text.trim().length) {
            setData({
                plataforma: questionFilter(dataProp.plataforma, text),
                cursos: questionFilter(dataProp.cursos, text),
                cancelamento: questionFilter(dataProp.cancelamento, text),
                outros: questionFilter(dataProp.outros, text)
            })
            setPrevTextLen(text.length)
        } else {
            setData({
                plataforma: questionFilter(dataProp.plataforma, text),
                cursos: questionFilter(dataProp.cursos, text),
                cancelamento: questionFilter(dataProp.cancelamento, text),
                outros: questionFilter(dataProp.outros, text)
            })
            setPrevTextLen(text.length)
        }
    }

    const questionFilter = (questionType, data) =>
        questionType.filter(function(item) {
            return Object.values(item)
                .map(value => String(value))
                .find(value =>
                    normalize(value.toLowerCase()).includes(
                        normalize(data.toLowerCase())
                    )
                )
        })

    const renderItem = (item, index) => (
        <SANCollapsePanel
            key={item.title}
            header={
                <SANTypography fontWeight='bold'>{item.title}</SANTypography>
            }
            customKey={`${index}`}
        >
            <SANTypography>
                <span dangerouslySetInnerHTML={{ __html: item.subtitle }} />
            </SANTypography>
        </SANCollapsePanel>
    )

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'xl' }
            }}
            HeaderProps={{
                onBack,
                extra: (
                    <SANInput
                        onChange={e => getSearchData(e.target.value)}
                        placeholder={t('helpCenter.header.placeholder')}
                        iconRight='search-outline'
                    />
                ),
                SessionTitleProps: {
                    title: t('helpCenter.header.title'),
                    subtitle: t('helpCenter.header.subtitle')
                }
            }}
        >
            <SANBox>
                <SANSessionTitle
                    title={t('helpCenter.platform.title')}
                    subtitle={t('helpCenter.platform.subtitle')}
                />
                <SANCollapse my='xxl'>
                    {data.plataforma.map(renderItem)}
                </SANCollapse>
                <SANSessionTitle
                    title={t('helpCenter.courses.title')}
                    subtitle={t('helpCenter.courses.subtitle')}
                />
                <SANCollapse my='xxl'>
                    {data.cursos.map(renderItem)}
                </SANCollapse>
                <SANSessionTitle
                    title={t('helpCenter.cancellation.title')}
                    subtitle={t('helpCenter.cancellation.subtitle')}
                />
                <SANCollapse my='xxl'>
                    {data.cancelamento.map(renderItem)}
                </SANCollapse>
                <SANSessionTitle
                    title={t('helpCenter.others.title')}
                    subtitle={t('helpCenter.others.subtitle')}
                />
                <SANCollapse my='xxl'>
                    {data.outros.map(renderItem)}
                </SANCollapse>
            </SANBox>
        </SANPage>
    )
}

export default SANHelpCenter
