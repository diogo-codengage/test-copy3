import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { format } from 'date-fns'

import {
    SANForm,
    SANFormItem,
    SANInput,
    SANSelect,
    SANSelectOption,
    SANBox,
    SANButton,
    useSnackbarContext,
    SANEvaIcon,
    withSANForm,
} from '@sanar/components'

import {
    GET_MED_UNIVERSITIES,
    IMedUniversityQuery,
    IMedUniversity
} from 'Apollo/Exams/Queries/medUniversities'
import {
    SAVE_USER_MED_UNIVERSITY_MUTATION
} from 'Apollo/Exams/Mutations/userMedUniversity'

const OnBoardingForm = ({ form, ...props }) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const createSnackbar = useSnackbarContext()
    const [loading, setLoading] = useState({
        medUniversities: false,
        submit: false,
    })
    const [medUniversities, setMedUniversities] = useState<IMedUniversity[]>([])
    const [semesters, setSemesters] = useState<string[]>([])
    const [otherMethodology, setOtherMethodology] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(true)

    useEffect (() => {
        const disableSubmit = () => {
            const values = form.getFieldsValue()
            Object.keys(values).length === 0
                ? setDisable(true)
                : setDisable(Object.keys(values).some(field => values[field] === undefined))
        }
        disableSubmit()
    }, [form])

    useEffect(() => {
        const createSemestersList = () => {
            const currentYear = new Date().getFullYear()
            let startYear = 2011
            const semesters: string[] = []
            while (startYear <= currentYear) {
                semesters.push(String(startYear) + '.1', String(startYear) + '.2')
                startYear++
            }
            setSemesters(semesters.reverse());
        }
        createSemestersList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchMedUniversities = async () => {
            setLoading(old => ({ ...old, medUniversities: true }))
            try {
                const {
                    data: { medUniversities }
                } = await client.query<IMedUniversityQuery>({
                    query: GET_MED_UNIVERSITIES
                })
                setMedUniversities(medUniversities.data)
            } catch {
            }
            setLoading(old => ({ ...old, medUniversities: false }))
        }
        fetchMedUniversities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const pageOpened = () => {
            window.analytics.track('ExamsOnBoardingPageViewed')
        }
        pageOpened()
    }, [])

    const methodologies = Object.freeze([
        'Tradicional',
        'PBL - Problem Based Learning',
        'TBL - Team Based Learning',
        'Outra'
    ])

    const onChangeMethodology = (value) => setOtherMethodology(value === 'Outra')

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(old => ({ ...old, submit: true }))
        try {
            await form.validateFields()
            const {
                medUniversityId,
                ingressSemester,
                methodology,
                newMethodology
            } = form.getFieldsValue()
            const arrPeriod = ingressSemester.split('.')

            const response = await client.mutate({
                mutation: SAVE_USER_MED_UNIVERSITY_MUTATION,
                variables: {
                    medUniversityId: [medUniversityId],
                    ingressYear: arrPeriod[0],
                    ingressSemester: arrPeriod[1],
                    methodology: newMethodology ? newMethodology : methodology
                }
            })
            window.analytics.track('ExamsOnBoardingFormSubmitted')
            props.changePage(response.data.saveUserMedUniversity)
        } catch (e) {
            if (!!e.message) {
                createSnackbar({
                    message: e.message,
                    theme: 'error'
                })
            }
        }

        setLoading(old => ({ ...old, submit: false }))
    }

    const createLabel = (icon: string, label: string) => {
        return (
            <span style={{ display: 'flex' }}>
                <SANEvaIcon name={icon} style={{ marginRight: '6px' }}/>
                {t(label)}
            </span>
        )
    }

    const university = () => {
        if (props.userMedUniversity && props.userMedUniversity.medUniversity) {
            return props.userMedUniversity.medUniversity.id
        }
    }

    const ingressPeriod = () => {
        if (props.userMedUniversity && props.userMedUniversity.ingressSemester && props.userMedUniversity.ingressYear) {
            const savedYear = props.userMedUniversity.ingressYear
            const year = savedYear.length > 4
                ? format(new Date(savedYear), 'YYYY')
                : savedYear
            return `${year}.${props.userMedUniversity.ingressSemester}`
        }
    }

    return (
        <SANBox
            borderRadius={{ lg: 1 }}
            backgroundColor='#FFE6F0'
            py={{ lg: 5, _: 'md' }}
            px={{ lg: 5, _: 'md' }}
            mb={5}
        >
            <SANForm form={form} onSubmit={onSubmit}>
                <SANFormItem
                    name='medUniversityId'
                    initialValue={university() || undefined}
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: t(
                                'sanarui:formValidateMessages.required'
                            )
                        }
                    ]}
                >
                    <SANSelect
                        showSearch
                        optionFilterProp="children"
                        loading={loading.medUniversities}
                        size='large'
                        placeholder={createLabel('award-outline', 'exams.onBoarding.form.selectCollegeLabel')}
                    >
                        {medUniversities &&
                        medUniversities.map((item, index) => (
                            <SANSelectOption
                                key={index}
                                value={item.id}
                            >
                                {item.name}
                            </SANSelectOption>
                        ))}
                    </SANSelect>
                </SANFormItem>
                <SANFormItem
                    name='ingressSemester'
                    initialValue={ingressPeriod() || undefined}
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: t(
                                'sanarui:formValidateMessages.required'
                            )
                        }
                    ]}
                >
                    <SANSelect
                        size='large'
                        placeholder={createLabel('calendar-outline', 'exams.onBoarding.form.selectSemesterLabel')}
                    >
                        {semesters &&
                        semesters.map((item, index) => (
                            <SANSelectOption
                                key={index}
                                value={item}
                            >
                                {item}
                            </SANSelectOption>
                        ))}
                    </SANSelect>
                </SANFormItem>
                <SANFormItem
                    name='methodology'
                    initialValue={
                        props.userMedUniversity && props.userMedUniversity.methodology
                            ? props.userMedUniversity.methodology
                            : undefined
                    }
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: t(
                                'sanarui:formValidateMessages.required'
                            )
                        }
                    ]}
                >
                    <SANSelect
                        onChange={onChangeMethodology}
                        size='large'
                        placeholder={createLabel('book-open-outline', 'exams.onBoarding.form.selectMethodologyLabel')}
                    >
                        {methodologies &&
                        methodologies.map((item, index) => (
                            <SANSelectOption
                                key={index}
                                value={item}
                            >
                                {item}
                            </SANSelectOption>
                        ))}
                    </SANSelect>
                </SANFormItem>
                {otherMethodology ? (
                    <SANFormItem
                        mb={2}
                        name='newMethodology'
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            }
                        ]}
                    >
                        <SANInput
                            size='large'
                            placeholder={t('exams.onBoarding.form.selectMethodologyLabel')}
                        />
                    </SANFormItem>
                ) : null}
                <SANBox
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    pt={4}
                >
                    <SANButton
                        htmlType='submit'
                        color='primary'
                        variant='solid'
                        bold
                        uppercase
                        loading={loading.submit}
                        blockOnlyMobile
                        style={{ width: '100%' }}
                        disabled={disable}
                    >
                        {t('exams.onBoarding.form.button')}
                    </SANButton>
                </SANBox>
            </SANForm>
        </SANBox>
    )
}

export default withSANForm(OnBoardingForm)
