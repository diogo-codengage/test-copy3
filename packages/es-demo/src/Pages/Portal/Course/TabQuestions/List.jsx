import React, { useState } from 'react'

import { useTranslation, Trans } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESCheckbox from 'sanar-ui/dist/Components/Atoms/Checkbox'
import { ESInputSearch } from 'sanar-ui/dist/Components/Atoms/Input'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESDropdown from 'sanar-ui/dist/Components/Atoms/Dropdown'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESMenu, { ESItem } from 'sanar-ui/dist/Components/Atoms/Menu'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

import ESQuestionList, {
    ESQuestionListHeader,
    ESQuestionListFooter,
    ESQuestionListContent,
    ESQuestionListItem
} from 'sanar-ui/dist/Components/Organisms/QuestionList'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const menu = (
    <ESMenu selectable>
        <ESItem key='1'>
            <Trans i18nKey='courseDetails.tabQuestions.list.orderBy.best' />
        </ESItem>
        <ESItem key='2'>
            <Trans i18nKey='courseDetails.tabQuestions.list.orderBy.first' />
        </ESItem>
    </ESMenu>
)

const intlPath = 'courseDetails.tabQuestions.'

const arr = [0, 1, 2, 3, 4, 5]

const SANQuestionList = () => {
    const { t, i18n } = useTranslation('esanar')
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(arr)

    const fetch = () => {
        setLoading(true)
        setTimeout(() => {
            setItems([...arr, 6, 7, 8, 9, 10])
            setLoading(false)
        }, 2000)
    }

    return (
        <>
            <div className='section-interact'>
                <SANPortalPagesContainer>
                    <ESSessionTitle
                        extra={
                            <ESButton
                                size='small'
                                variant='solid'
                                bold
                                uppercase
                                blockOnlyMobile
                                onClick={() => i18n.changeLanguage('en')}
                            >
                                {t(`${intlPath}interact.button`)}
                            </ESButton>
                        }
                        title={t(`${intlPath}interact.title`)}
                        subtitle={t(`${intlPath}interact.subtitle`)}
                    />
                </SANPortalPagesContainer>
            </div>
            <SANPortalPagesContainer className='section-search mt-md'>
                <ESRow type='flex' align='middle'>
                    <ESCol xs={24} md={10} lg={12} className='mb-md'>
                        <ESInputSearch
                            placeholder={t(`${intlPath}search.input`)}
                        />
                    </ESCol>
                    <ESCol
                        xs={12}
                        md={7}
                        lg={6}
                        className='mb-md text-align-end'
                    >
                        <ESCheckbox>
                            {t(`${intlPath}search.noAnswers`)}
                        </ESCheckbox>
                    </ESCol>
                    <ESCol
                        xs={12}
                        md={7}
                        lg={6}
                        className='mb-md text-align-end'
                    >
                        <ESCheckbox>
                            {t(`${intlPath}search.participate`)}
                        </ESCheckbox>
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
            <SANPortalPagesContainer className='mb-xl'>
                <ESQuestionList>
                    <ESQuestionListHeader
                        title={`6 ${t(`${intlPath}list.questions`)}`}
                    >
                        <ESDropdown overlay={menu} trigger={['click']}>
                            <ESTypography strong variant='caption'>
                                {t(`${intlPath}list.orderBy.title`)}
                                <ESEvaIcon name='chevron-down-outline' />
                            </ESTypography>
                        </ESDropdown>
                    </ESQuestionListHeader>
                    <ESQuestionListContent>
                        {items.map((e, i) => (
                            <ESQuestionListItem
                                key={i}
                                loading={loading}
                                avatar='https://freeiconshop.com/wp-content/uploads/edd/person-girl-flat.png'
                                title='Orci consectetur metus Nulla est justo Vivamus nec orci pur'
                                author='Eliza Reid'
                                userIsAuthor={true}
                                badgeInfo={t('global.you')}
                                interactionTime='Há 2 horas'
                                responses={0}
                            />
                        ))}
                    </ESQuestionListContent>
                    <ESQuestionListFooter>
                        <ESButton
                            size='xsmall'
                            variant='text'
                            color='primary'
                            uppercase
                            bold
                            loading={loading}
                            onClick={fetch}
                        >
                            {t('global.loadMore')}
                        </ESButton>
                    </ESQuestionListFooter>
                </ESQuestionList>
            </SANPortalPagesContainer>
        </>
    )
}

export default SANQuestionList
