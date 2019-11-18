import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANCol,
    SANRow,
    SANFormItem,
    SANCardSelectFilter,
} from '@sanar/components'
import { useApolloClient } from '@apollo/react-hooks'

import specialtySvg from 'Assets/images/practical-area/specialty.svg'
import subspecialtySvg from 'Assets/images/practical-area/subspecialty.svg'
import themeSvg from 'Assets/images/practical-area/theme.svg'
import categorySvg from 'Assets/images/practical-area/category.svg'

import { GET_CATEGORIES } from 'Apollo/PracticalArea/Queries/categories'
import { GET_SPECIALTIES } from 'Apollo/PracticalArea/Queries/specialties'
import { GET_SUBSPECIALTIES } from 'Apollo/PracticalArea/Queries/subspecialties'
import { GET_LESSONS } from 'Apollo/PracticalArea/Queries/lessons'

import { useAuthContext } from 'Hooks/auth'

const Categories = () => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { specialties }
                } = await client.query({ query: GET_CATEGORIES })
                setData(old => ({ ...old, loading: false, items: specialties }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        fetchData()
    }, [])

    return (
        <SANFormItem name='categories' mb={{ xs: 'xl', _: 'md' }}>
            <SANCardSelectFilter
                labelSelecteds={t(
                    'practicalArea.filter.selecteds.category.selecteds'
                )}
                placeholder={t(
                    'practicalArea.filter.selecteds.category.choose'
                )}
                filterName={t('practicalArea.filter.selecteds.category.title')}
                image={categorySvg}
                items={data.items}
                loading={data.loading}
            />
        </SANFormItem>
    )
}

const Specialties = () => {
    const client = useApolloClient()
    const { activeCourse } = useAuthContext()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { specialties }
                } = await client.query({ query: GET_SPECIALTIES })
                setData(old => ({
                    ...old,
                    loading: false,
                    items: specialties
                }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        fetchData()
    }, [])

    return (
        <SANFormItem name='specialties' mb={{ xs: 'xl', _: 'md' }}>
            <SANCardSelectFilter
                labelSelecteds={t(
                    'practicalArea.filter.selecteds.specialty.selecteds'
                )}
                placeholder={t(
                    'practicalArea.filter.selecteds.specialty.choose'
                )}
                filterName={t('practicalArea.filter.selecteds.specialty.title')}
                image={specialtySvg}
                items={data.items}
                loading={data.loading}
            />
        </SANFormItem>
    )
}

const Subspecialties = () => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { subSpecialties }
                } = await client.query({ query: GET_SUBSPECIALTIES })
                setData(old => ({
                    ...old,
                    loading: false,
                    items: subSpecialties
                }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        fetchData()
    }, [])

    return (
        <SANFormItem name='subspecialties' mb={{ xs: 'xl', _: 'md' }}>
            <SANCardSelectFilter
                labelSelecteds={t(
                    'practicalArea.filter.selecteds.subspecialty.selecteds'
                )}
                placeholder={t(
                    'practicalArea.filter.selecteds.subspecialty.choose'
                )}
                filterName={t(
                    'practicalArea.filter.selecteds.subspecialty.title'
                )}
                image={subspecialtySvg}
                items={data.items}
                loading={data.loading}
            />
        </SANFormItem>
    )
}

const Lessons = () => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { lessons }
                } = await client.query({ query: GET_LESSONS })
                setData(old => ({
                    ...old,
                    loading: false,
                    items: lessons
                }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        fetchData()
    }, [])

    return (
        <SANFormItem name='themes' mb={{ xs: 'xl', _: 'md' }}>
            <SANCardSelectFilter
                labelSelecteds={t(
                    'practicalArea.filter.selecteds.theme.selecteds'
                )}
                placeholder={t('practicalArea.filter.selecteds.theme.choose')}
                filterName={t('practicalArea.filter.selecteds.theme.title')}
                image={themeSvg}
                items={data.items}
                loading={data.loading}
            />
        </SANFormItem>
    )
}

const RMFilterSelects = () => (
    <SANRow gutter={24}>
        <SANCol xs={24} sm={24} md={12}>
            <Categories />
        </SANCol>
        <SANCol xs={24} sm={24} md={12}>
            <Specialties />
        </SANCol>
        <SANCol xs={24} sm={24} md={12}>
            <Subspecialties />
        </SANCol>
        <SANCol xs={24} sm={24} md={12}>
            <Lessons />
        </SANCol>
    </SANRow>
)

export default RMFilterSelects
