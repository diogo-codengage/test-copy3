import React, { useState } from 'react'

import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { useTranslation } from 'react-i18next'

import ESListView, {
    ESListViewItem
} from 'sanar-ui/dist/Components/Atoms/ListView'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

import { GET_MODULES } from 'Apollo/CourseDetails/queries/modules'
import { useAuthContext } from 'Hooks/auth'
import { getClassRoute } from 'Utils/getClassRoute'

import ESDivider from 'sanar-ui/dist/Components/Atoms/Divider'

const SANCourseModules = ({ history }) => {
    const { t } = useTranslation('esanar')
    const { getEnrollment } = useAuthContext()
    const [current, setCurrent] = useState(1)
    const [pageSize] = useState(12)

    const {
        course: { id: courseId },
        id: enrollmentId
    } = getEnrollment()

    const goClassrom = module => () => {
        const type = getClassRoute(module.last_resource_type)
        history.push(
            `/aluno/sala-aula/${module.id}/${type}/${module.last_resource_id}`
        )
    }

    const renderDiscipline = item => (
        <ESListViewItem>
            <ESCardCourseModule
                className='san-tab-course-content__continue--card'
                moduleName={`${t(
                    'courseDetails.tabContent.discipline.discipline.key'
                )} ${item.index}`}
                title={item.name}
                badge={
                    item.progress
                        ? `${item.progress.done}/${item.progress.total}`
                        : '0/0'
                }
                progress={
                    item.progress
                        ? (item.progress.done * 100) / item.progress.total
                        : 0
                }
                actionName={
                    <span className='san-tab-course-content__modules--card-action'>
                        {t('courseDetails.tabContent.cardModuleAction')}
                    </span>
                }
                moduleTime={`${item.duration || 0}min`}
                image={item.cover_picture_url}
                onClick={goClassrom(item)}
            />
        </ESListViewItem>
    )

    return (
        <Query
            query={GET_MODULES}
            variables={{
                courseId,
                enrollmentId,
                limit: pageSize,
                skip: pageSize * current - pageSize
            }}
        >
            {({ loading, error, data }) => {
                if (loading) {
                    return (
                        <ESSpin
                            className='w-100 d-flex justify-content-center align-items-center'
                            style={{ height: 685 }}
                        />
                    )
                }
                if (error) {
                    return (
                        <SANErrorPiece
                            message={t(
                                'courseDetails.tabContent.discipline.error.defaultMessage'
                            )}
                        />
                    )
                }

                const { count, data: modules } = data.modules
                return (
                    <div className='san-tab-course-content__modules pt-md'>
                        <SANPortalPagesContainer>
                            {/*FIXME: <ESRow type='flex' align='middle' gutter={24}>
                                <ESCol xs={24} md={10} lg={9} xxl={8}>
                                    <ESSessionTitle
                                        className='san-tab-course-content__modules--module-feature'
                                        title={t(
                                            'courseDetails.tabContent.modules.whatCourseHas'
                                        )}
                                        subtitle={t(
                                            'courseDetails.tabContent.modules.whatCourseHasSubtitle'
                                        )}
                                    />
                                </ESCol>
                                <ESCol xs={24} md={14} lg={15} xxl={16}>
                                    <ESCarousel
                                        slidesToScroll={1}
                                        infinite={false}
                                        dots={false}
                                        draggable
                                        responsive={responsive}
                                    >
                                        {courseFeatures.map((course, index) => (
                                            <ESCardInfo
                                                key={index}
                                                image={course.image}
                                                count={course.count}
                                                limit={course.limit}
                                                text={course.text}
                                            />
                                        ))}
                                    </ESCarousel>
                                </ESCol>
                            </ESRow>

                            <ESDivider className='san-tab-course-content__modules--divider' /> */}

                            <ESSessionTitle
                                title={`${count} ${t(
                                    'courseDetails.tabContent.discipline.title.key',
                                    { count }
                                )}`}
                                //FIXME: extraOnLeft
                                // extra={
                                //     <ESRadioGroup defaultValue='all' blocks>
                                //         <ESRadioButton value='all'>
                                //             {t(
                                //                 'courseDetails.tabContent.modules.status.all'
                                //             )}
                                //         </ESRadioButton>
                                //         <ESRadioButton value='done'>
                                //             {t(
                                //                 'courseDetails.tabContent.modules.status.done'
                                //             )}
                                //         </ESRadioButton>
                                //         <ESRadioButton value='incomplete'>
                                //             {t(
                                //                 'courseDetails.tabContent.modules.status.incomplete'
                                //             )}
                                //         </ESRadioButton>
                                //     </ESRadioGroup>
                                // }
                            />
                            <ESListView
                                grid={{
                                    gutter: 24,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    xl: 4
                                }}
                                dataSource={modules}
                                renderItem={renderDiscipline}
                                footer={
                                    <ESPagination
                                        pageSize={pageSize}
                                        total={count}
                                        current={current}
                                        onChange={setCurrent}
                                    />
                                }
                            />
                            <ESDivider className='mt-xxl mb-md' />
                        </SANPortalPagesContainer>
                    </div>
                )
            }}
        </Query>
    )
}

export default withRouter(SANCourseModules)
