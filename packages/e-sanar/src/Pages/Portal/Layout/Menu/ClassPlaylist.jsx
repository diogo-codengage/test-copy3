import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESDisciplineDropdown from 'sanar-ui/dist/Components/Molecules/DisciplineDropdown'
import ESPlaylist from 'sanar-ui/dist/Components/Molecules/Playlist'
import ESSkeleton from 'sanar-ui/dist/Components/Atoms/Skeleton'
import ESCommonBadge from 'sanar-ui/dist/Components/Atoms/CommonBadge'
import ESDivider from 'sanar-ui/dist/Components/Atoms/Divider'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { usePortalContext } from 'Pages/Portal/Context'
import { GET_MODULES } from 'Apollo/CourseDetails/queries/modules'
import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'
import { getClassRoute } from 'Utils/getClassRoute'

import { useLayoutContext } from '../../Layout/Context'

export const SANClassPlaylistMenuHeader = () => {
    const { setOpenMenu, setMenuTab } = useLayoutContext()

    const exitClassroom = () => {
        setMenuTab(0)
    }

    return (
        <>
            <div className='d-flex justify-content-between align-items-center pl-md pt-md pr-md pb-xs'>
                <ESButton
                    variant='text'
                    color='white'
                    className='pl-no'
                    uppercase
                    onClick={exitClassroom}
                >
                    <ESEvaIcon className='mr-xs' name='arrow-back-outline' />
                    <ESTypography variant='caption'>
                        Voltar para início
                    </ESTypography>
                </ESButton>
                <ESButton
                    variant='text'
                    color='white'
                    className='pl-no pr-no'
                    uppercase
                    onClick={() => setOpenMenu(old => !old)}
                >
                    <ESEvaIcon name='close-outline' />
                </ESButton>
            </div>
            <ESDivider className='mt-no mb-sm' color='grey' />
        </>
    )
}

const SANClassPlaylist = ({ history }) => {
    const client = useApolloContext()
    const {
        currentResource,
        setCurrentResource,
        state: { loading, currentModule },
        getResource
    } = usePortalContext()

    const { getEnrollment } = useAuthContext()
    const { setOpenMenu } = useLayoutContext()

    const [modules, setModules] = useState(null)
    const { course, progress_percentage, id } = getEnrollment()

    const goToResource = resource => {
        setCurrentResource(resource)
        setOpenMenu(oldOpenMenu => !oldOpenMenu)
        history.push(
            `/aluno/sala-aula/${
                currentModule.id
            }/${resource.resource_type.toLowerCase()}/${
                getResource(resource).id
            }`
        )
    }

    const renderPlaylist = () => {
        const {
            level_contents: { data: playlist }
        } = currentModule

        return (
            <ESPlaylist
                loading={loading}
                items={playlist}
                currentIndex={currentResource && currentResource.index}
                goToResource={goToResource}
            />
        )
    }

    useEffect(() => {
        const getModules = async () => {
            const {
                data: { modules }
            } = await client.query({
                query: GET_MODULES,
                fetchPolicy: 'network-only',
                variables: {
                    courseId: course.id,
                    enrollmentId: id
                }
            })

            setModules(modules)
        }

        getModules()
    }, [modules, client, course.id, id])

    const onSelect = item => {
        const type = getClassRoute(item.last_resource_type)
        history.push(
            `/aluno/sala-aula/${item.id}/${type}/${item.last_resource_id}`
        )
    }

    return (
        <div>
            <div className='pl-md pr-md'>
                <ESTypography className='mb-xs text-white-6' variant='overline'>
                    {course.knowledge_area}
                </ESTypography>
                <ESTypography className='mb-xs' strong ellipsis level={5}>
                    {course.name}
                </ESTypography>
                <div className='d-flex justify-content-between align-items-center'>
                    <ESTypography
                        className='text-white-6'
                        strong
                        ellipsis
                        variant='caption'
                    >
                        Progresso do curso
                    </ESTypography>
                    <ESCommonBadge
                        count={progress_percentage.toFixed(0)}
                        status='warning'
                        suffix='%'
                    />
                </div>
                <ESDivider color='grey' type='horizontal' />
            </div>
            {!currentModule || !modules ? (
                <ESSkeleton className='pl-md pr-md' active avatar dark />
            ) : (
                <>
                    <div className='d-flex justify-content-between mb-xs pl-md pr-md'>
                        <ESTypography transform='uppercase' variant='caption'>
                            Disciplina
                        </ESTypography>
                        <ESTypography
                            className='text-white-6'
                            variant='caption'
                        >
                            {currentModule.index + 1}/{modules.count}
                        </ESTypography>
                    </div>
                    <div className='pl-md pr-md'>
                        <ESDisciplineDropdown
                            className='mb-lg'
                            onSelect={onSelect}
                            activeItem={currentModule}
                            items={modules.data}
                            loading={loading}
                        />
                    </div>
                    {renderPlaylist()}
                </>
            )}
        </div>
    )
}

export default withRouter(SANClassPlaylist)
