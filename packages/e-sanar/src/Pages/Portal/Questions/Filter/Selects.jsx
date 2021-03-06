import React from 'react'

import { useTranslation } from 'react-i18next'
import { Query } from 'react-apollo'

import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESCardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import bancaSvg from 'assets/images/questions/banca.svg'
import moduloSvg from 'assets/images/questions/modulo.svg'
import assuntoSvg from 'assets/images/questions/assunto.svg'
import provaSvg from 'assets/images/questions/prova.svg'

import { useQuestionsContext } from '../Context'
import { useAuthContext } from 'Hooks/auth'
import { GET_TAGS } from 'Apollo/Questions/queries/tags'
import { GET_EXAMS } from 'Apollo/Questions/queries/exams'
import { GET_BOARDS } from 'Apollo/Questions/queries/boards'
import { GET_MODULES } from 'Apollo/Questions/queries/modules'

import SANQuestionsFilterAdvanced from './Advanced'

const intlPath = 'questionBase.filter.'

const SANQuestionsFilterSelects = ({ defaultOpen }) => {
    const {
        enrollment: {
            course: { id: courseId },
            id: enrollmentId
        }
    } = useAuthContext()
    const { formState } = useQuestionsContext()
    const { t } = useTranslation('esanar')

    const makeItems = ({ loading, data }, entity) =>
        !loading && data ? data[entity].data : []

    return (
        <div className='questions-filter'>
            <SANPortalPagesContainer>
                <ESRow gutter={24}>
                    <ESCol sm={24} md={12}>
                        <Query
                            query={GET_MODULES}
                            variables={{
                                courseId,
                                enrollmentId
                            }}
                        >
                            {props => (
                                <ESFormItem
                                    name='levels'
                                    initialValue={formState && formState.levels}
                                >
                                    <ESCardSelectFilter
                                        labelSelecteds={t(
                                            `${intlPath}discipline.selecteds`
                                        )}
                                        placeholder={t(
                                            `${intlPath}discipline.choose`
                                        )}
                                        filterName={t(
                                            `${intlPath}discipline.title`
                                        )}
                                        image={assuntoSvg}
                                        items={makeItems(props, 'modules')}
                                    />
                                </ESFormItem>
                            )}
                        </Query>
                    </ESCol>
                    <ESCol sm={24} md={12}>
                        <Query
                            query={GET_TAGS}
                            variables={{ order: 'name', limit: 9999999 }}
                        >
                            {props => (
                                <ESFormItem
                                    name='tags'
                                    initialValue={formState && formState.tags}
                                >
                                    <ESCardSelectFilter
                                        labelSelecteds={t(
                                            `${intlPath}subject.selecteds`
                                        )}
                                        placeholder={t(
                                            `${intlPath}subject.choose`
                                        )}
                                        filterName={t(
                                            `${intlPath}subject.title`
                                        )}
                                        image={moduloSvg}
                                        items={makeItems(props, 'tags')}
                                    />
                                </ESFormItem>
                            )}
                        </Query>
                    </ESCol>
                    <ESCol sm={24} md={12}>
                        <Query
                            query={GET_BOARDS}
                            variables={{ order: 'name', limit: 9999999 }}
                        >
                            {props => (
                                <ESFormItem
                                    name='boards'
                                    className='mb-lg'
                                    initialValue={formState && formState.boards}
                                >
                                    <ESCardSelectFilter
                                        labelSelecteds={t(
                                            `${intlPath}bank.selecteds`
                                        )}
                                        placeholder={t(
                                            `${intlPath}bank.choose`
                                        )}
                                        filterName={t(`${intlPath}bank.title`)}
                                        image={bancaSvg}
                                        items={makeItems(props, 'boards')}
                                    />
                                </ESFormItem>
                            )}
                        </Query>
                    </ESCol>
                    <ESCol sm={24} md={12}>
                        <Query
                            query={GET_EXAMS}
                            variables={{ order: 'name', limit: 9999999 }}
                        >
                            {props => (
                                <ESFormItem
                                    name='exams'
                                    className='mb-lg'
                                    initialValue={formState && formState.exams}
                                >
                                    <ESCardSelectFilter
                                        labelSelecteds={t(
                                            `${intlPath}test.selecteds`
                                        )}
                                        placeholder={t(
                                            `${intlPath}test.choose`
                                        )}
                                        filterName={t(`${intlPath}test.title`)}
                                        image={provaSvg}
                                        items={makeItems(props, 'exams')}
                                    />
                                </ESFormItem>
                            )}
                        </Query>
                    </ESCol>
                </ESRow>
                <SANQuestionsFilterAdvanced defaultOpen={defaultOpen} />
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANQuestionsFilterSelects
