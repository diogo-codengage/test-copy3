import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
    SANForm,
    SANFormItem,
    withSANForm,
    SANSelect,
    SANSelectOption,
    SANBox,
    SANButton,
    useSnackbarContext,
    SANDivider,
} from '@sanar/components'
import ESIcon from 'sanar-ui/dist/Components/Atoms/Icon'

const OnBoardingForm: React.FC = withSANForm(
    ({ form }) => {
        const { t } = useTranslation('sanarflix')
        const createSnackbar = useSnackbarContext()
        // const { me } = useAuthContext()
        const [loading, setLoading] = useState(false)

        const onSubmit = async e => {
            e.preventDefault()
            setLoading(true)
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

            setLoading(false)
        }

        //TODO create request to get lists
        // const {
        //     data: { cancelSubsctiptionsCauses: reasons }
        // }: any = useQuery(GET_CANCEL_REASONS)

        const colleges = ['UFBA', 'UFMG', 'USP']
        const semesters = ['2018.1', '2015.2', '2019.1']
        const methodologies = ['Metodologia 1', 'Metodologia 2', 'Metodologia 3']
        const createLabel = (icon: string, label: string) => {
            return (
                <span>
                    <ESIcon type={icon} style={{marginRight: 3}}/>
                    {t(label)}
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
                        name='college'
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
                            placeholder={createLabel('medicine-box', 'exams.onBoarding.form.selectCollegeLabel')}
                        >
                            {colleges &&
                            colleges.map((item, index) => (
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
                            loading={loading}
                            blockOnlyMobile
                            style={{width: '100%'}}
                        >
                            {t('exams.onBoarding.form.button')}
                        </SANButton>
                    </SANBox>
                </SANForm>
            </SANBox>
        )
    }
)

export default OnBoardingForm
