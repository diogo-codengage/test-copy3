import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANCol,
    SANRow,
    SANFormItem,
    SANCardSelectFilter
} from '@sanar/components'
import { useApolloClient } from '@apollo/react-hooks'

import specialtySvg from 'Assets/images/practical-area/specialty.svg'
import subspecialtySvg from 'Assets/images/practical-area/subspecialty.svg'
import themeSvg from 'Assets/images/practical-area/theme.svg'
import categorySvg from 'Assets/images/practical-area/category.svg'

import {
    GET_CATEGORIES,
    ICategoriesQuery,
    ICategory
} from 'Apollo/PracticalArea/Queries/categories'
import {
    GET_SPECIALTIES,
    IISpecialtiesQuery,
    ISpecialty
} from 'Apollo/PracticalArea/Queries/specialties'
import {
    GET_SUBSPECIALTIES,
    ISubspecialtiesQuery,
    ISubspecialty
} from 'Apollo/PracticalArea/Queries/subspecialties'
import {
    GET_LESSONS,
    ILessonsQuery,
    ILesson
} from 'Apollo/PracticalArea/Queries/lessons'

import { useAuthContext } from 'Hooks/auth'

interface ILoading {
    loading: boolean
    error: boolean
}
interface ICategoryState extends ILoading {
    items: ICategory[]
}

const Categories = () => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState<ICategoryState>({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(old => ({
                    ...old,
                    loading: true
                }))
                const {
                    data: { questionCategories }
                } = await client.query<ICategoriesQuery>({
                    query: GET_CATEGORIES
                })
                setData(old => ({
                    ...old,
                    loading: false,
                    items: questionCategories
                }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

interface ISpecialtiyState extends ILoading {
    items: ISpecialty[]
}

const Specialties = () => {
    const client = useApolloClient()
    const { activeCourse } = useAuthContext()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState<ISpecialtiyState>({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(old => ({
                    ...old,
                    loading: true
                }))
                const {
                    data: { specialties }
                } = await client.query<IISpecialtiesQuery>({
                    query: GET_SPECIALTIES
                })
                setData(old => ({
                    ...old,
                    loading: false,
                    items: specialties
                }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        !!activeCourse && fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCourse])

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

interface ISubspecialtyState extends ILoading {
    items: ISubspecialty[]
}

const Subspecialties = () => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState<ISubspecialtyState>({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(old => ({
                    ...old,
                    loading: true
                }))
                const {
                    data: { subSpecialties }
                } = await client.query<ISubspecialtiesQuery>({
                    query: GET_SUBSPECIALTIES
                })
                setData(old => ({
                    ...old,
                    loading: false,
                    items: subSpecialties.items
                }))
            } catch {
                setData({ loading: false, error: false, items: [] })
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

interface ILessonState extends ILoading {
    items: ILesson[]
}

const Lessons = () => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [data, setData] = useState<ILessonState>({
        loading: false,
        error: false,
        items: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(old => ({
                    ...old,
                    loading: true
                }))
                const {
                    data: { lessons }
                } = await client.query<ILessonsQuery>({ query: GET_LESSONS })
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
