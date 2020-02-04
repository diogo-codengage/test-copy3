import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import ESIcon from 'sanar-ui/dist/Components/Atoms/Icon'
import {
    SANForm,
    SANFormItem,
    SANInput,
    SANSelect,
    SANSelectOption,
    SANBox,
    SANButton,
    useSnackbarContext,
    SANDivider,
    withSANForm,
} from '@sanar/components'

import {
    GET_INSTITUTIONS,
    IInstitutionsQuery,
    IInstitution
} from 'Apollo/Exams/Queries/institutions'

const OnBoardingForm = ({ form }) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const createSnackbar = useSnackbarContext()
    const [loading, setLoading] = useState({
        institutions: false,
        submit: false,
    })
    const [institutions, setInstitutions] = useState<IInstitution[]>([])
    const [semesters, setSemesters] = useState<string[]>([])
    const [otherMethodology, setOtherMethodology] = useState<boolean>(false)

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
        const fetchInstitutions = async () => {
            setLoading(old => ({ ...old, institutions: true }))
            try {
                const {
                    data: { institutions }
                } = await client.query<IInstitutionsQuery>({
                    query: GET_INSTITUTIONS
                })
                setInstitutions(
                    institutions.map(v => ({
                        ...v,
                        label: v.label.toLowerCase()
                    }))
                )
            } catch {
            }
            setLoading(old => ({ ...old, institutions: false }))
        }
        fetchInstitutions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const methodologies = [
        'Tradicional',
        'PBL - Problem Based Learning',
        'TBL - Team Based Learning',
        'Outra'
    ]

    const onChangeMethodology = (value) => setOtherMethodology(value === 'Outra')

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(old => ({ ...old, submit: true }))
        try {
            await form.validateFields()
            //TODO send request
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
            <span>
                <ESIcon type={icon} style={{ marginRight: 3 }}/>{t(label)}
            </span>
        )
    }

    return (
        <SANBox
            borderRadius={{ lg: 1 }}
            backgroundColor='#FFE6F0'
            py={{ lg: 5, _: 'md' }}
            px={{ lg: 5, _: 'md' }}
            m={{ _: '0 -16px -60px -16px', lg: 0 }}
        >
            <SANDivider
                display={{ lg: 'none', _: 'block' }}
                bg='grey.2'
                mb='xl'
                mx='-16px'
            />
            <SANForm form={form} onSubmit={onSubmit}>
                <SANFormItem
                    name='institution'
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
                        loading={loading.institutions}
                        size='large'
                        placeholder={createLabel('medicine-box', 'exams.onBoarding.form.selectCollegeLabel')}
                    >
                        {institutions &&
                        institutions.map((item, index) => (
                            <SANSelectOption
                                key={index}
                                value={item.value}
                            >
                                {item.label}
                            </SANSelectOption>
                        ))}
                    </SANSelect>
                </SANFormItem>
                <SANFormItem
                    name='semester'
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
                        placeholder={createLabel('calendar', 'exams.onBoarding.form.selectSemesterLabel')}
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
                        placeholder={createLabel('form', 'exams.onBoarding.form.selectMethodologyLabel')}
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
                        name='new-methodology'
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
                    >
                        {t('exams.onBoarding.form.button')}
                    </SANButton>
                </SANBox>
            </SANForm>
        </SANBox>
    )
}

export default withSANForm(OnBoardingForm)
