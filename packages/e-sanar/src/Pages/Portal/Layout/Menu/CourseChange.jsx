import React, { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { format } from 'date-fns'
import { filter, sortBy, path } from 'ramda'
import { message } from 'antd'

import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESInputSearch } from 'sanar-ui/dist/Components/Atoms/Input'
import ESChangeCourse from 'sanar-ui/dist/Components/Molecules/ChangeCourse'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import { normalize } from 'sanar-ui/dist/Util/Normalize'

import { getClassRoute } from 'Utils/getClassRoute'
import { useApolloContext } from 'Hooks/apollo'
import { CHANGE_COURSE } from 'Apollo/Me/change-course'

import { useAuthContext } from 'Hooks/auth'
import { usePortalContext } from 'Pages/Portal/Context'

const intlPath = 'mainMenu.changeCourse.'

const SANCourseChange = ({ handleBack, history }) => {
    const client = useApolloContext()
    const { t } = useTranslation('esanar')
    const { lastAccessed, error } = usePortalContext()
    const { enrollment, me, setEnrollment } = useAuthContext()
    const [search, setSearch] = useState()
    const [loading, setLoading] = useState(false)

    const moduleReference = last =>
        `${t('global.subject')} ${last.module_order}, ${t('global.activity')} ${
            last.resource_order
        }`

    const goClassroom = () =>
        history.push(
            `/aluno/sala-aula/${lastAccessed.module_id}/${getClassRoute(
                lastAccessed.resource_type
            )}/${lastAccessed.resource_id}`
        )

    const onSearch = e => setSearch(e.target.value)

    const onChangeCourse = async enrollmentId => {
        setLoading(true)
        try {
            history.push('/aluno/curso')
            const {
                data: { setLastEnrollmentAccessed }
            } = await client.mutate({
                mutation: CHANGE_COURSE,
                variables: {
                    enrollmentId
                }
            })
            setEnrollment(setLastEnrollmentAccessed)
        } catch {
            message.error(t('mainMenu.changeCourse.failChange'))
        }
        setLoading(false)
    }

    const getCoverPicture = coverPictures => {
        if (!!coverPictures) {
            const { small, medium, large, original } = coverPictures
            if (!!large) {
                return large.url
            } else if (!!medium) {
                return medium.url
            } else if (!!small) {
                return small.url
            } else if (!!original) {
                return original.url
            }
        }
        return
    }

    const renderEnrollment = enrollment => (
        <ESChangeCourse
            loading={loading}
            key={enrollment.id}
            id={enrollment.id}
            title={enrollment.course.name}
            date={
                enrollment.expires_at &&
                format(enrollment.expires_at, 'DD/MM/YYYY')
            }
            percent={parseInt(enrollment.progress_percentage)}
            coverPicture={getCoverPicture(enrollment.course.cover_pictures)}
            icon={enrollment.course.icon}
            module={moduleReference(lastAccessed)}
            description={lastAccessed.module_title}
            onChange={onChangeCourse}
            className='mb-md'
            arrow
            round
        />
    )

    const allEnrollments = useMemo(() => {
        const filtered = filter(e => e.id !== enrollment.id, me.enrollments)
        return sortBy(path(['course', 'name']))(filtered)
    }, [me.enrollments, enrollment])

    const expr = new RegExp(search, 'i')

    return (
        <>
            <div className='pl-md pr-md mb-md'>
                <ESButton
                    className='mb-md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    onClick={handleBack}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </ESButton>
            </div>
            {!error ? (
                <ESChangeCourse
                    loading={loading}
                    title={enrollment.course.name}
                    date={
                        enrollment.expires_at &&
                        format(enrollment.expires_at, 'DD/MM/YYYY')
                    }
                    percent={parseInt(enrollment.progress_percentage)}
                    coverPicture={getCoverPicture(
                        enrollment.course.cover_pictures
                    )}
                    icon={enrollment.course.icon}
                    onContinue={goClassroom}
                    module={moduleReference(lastAccessed)}
                    description={lastAccessed.module_title}
                />
            ) : (
                <SANErrorPiece
                    message={t(
                        'courseDetails.tabContent.continue.error.defaultMessage'
                    )}
                />
            )}
            <div className='pl-md pr-md pt-md pb-md'>
                <ESTypography className='mb-md text-white-9' level={5} regular>
                    {t(`${intlPath}changeCourse`)}
                </ESTypography>

                <ESInputSearch
                    placeholder={t(`${intlPath}placeholder`)}
                    dark
                    value={search}
                    onChange={onSearch}
                />
                <ESTypography
                    className='mb-md mt-md text-white-8'
                    variant='caption'
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: t(`${intlPath}message.keyWithCount`, {
                                count: allEnrollments.length
                            })
                        }}
                    />
                </ESTypography>
                {allEnrollments
                    .filter(e => expr.test(normalize(e.course.name)))
                    .map(renderEnrollment)}
            </div>
        </>
    )
}

export default withRouter(SANCourseChange)
