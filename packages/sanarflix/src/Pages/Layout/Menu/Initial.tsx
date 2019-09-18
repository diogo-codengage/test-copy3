import React from 'react'
import { withRouter } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANEvaIcon,
    SANLeftOff,
    SANLeftOffError
} from '@sanar/components'

import { useLayoutContext } from '../Context'
import { IType, ILastAccessed } from 'Apollo/Menu/Queries/last-accessed'

// Images
import questionImage from 'Assets/images/course-items/question.svg'
import mentalmapImage from 'Assets/images/course-items/mental-map.svg'
import flowchartImage from 'Assets/images/course-items/flow.svg'
import articleImage from 'Assets/images/course-items/article.svg'
import documentImage from 'Assets/images/course-items/document.svg'

const resources = {
    Document: 'documento',
    Video: 'video',
    Quiz: 'questoes'
}

const configureThumbnail = (type: IType, resourceType, image) => {
    switch (resourceType) {
        case 'Video':
            return image
        case 'Question':
            return questionImage
        case 'Document':
            switch (type) {
                case 'mentalmap':
                    return mentalmapImage
                case 'flowchart':
                    return flowchartImage
                case 'article':
                    return articleImage
                default:
                    return documentImage
            }
        default:
            return documentImage
    }
}

const FLXLeftOff = withRouter(({ history }) => {
    const { t } = useTranslation('sanarflix')
    const { lastAccessed } = useLayoutContext()

    const goToResource = (lastAccessed: ILastAccessed) => {
        history.push(
            `/portal/sala-aula/${lastAccessed.course.id}/${
                lastAccessed.theme_id
            }/${resources[lastAccessed.resource_type]}/${
                lastAccessed.resource_id
            }`
        )
    }

    if (lastAccessed && lastAccessed.hasError) {
        return <SANLeftOffError />
    }

    return (
        <SANLeftOff
            label={t('course.continue')}
            onClick={() => goToResource(lastAccessed)}
            title={lastAccessed && lastAccessed.course.name}
            resourceType={lastAccessed && lastAccessed.resource_type}
            thumbnail={
                lastAccessed &&
                configureThumbnail(
                    lastAccessed.type,
                    lastAccessed.resource_type,
                    lastAccessed.thumbnail
                )
            }
            classReference={lastAccessed && lastAccessed.content_name}
            moduleReference={lastAccessed && lastAccessed.theme_title}
        />
    )
})

const FLXMenuInitial: React.FC = () => {
    const { t } = useTranslation('sanarflix')
    const { onCloseMenu, setMenuTab } = useLayoutContext()

    const handleAccount = () => {
        setMenuTab(2)
        onCloseMenu()
    }

    return (
        <>
            <FLXLeftOff />

            <SANNavigationList>
                <SANNavigationListItem
                    to='/portal/inicio'
                    icon={<SANEvaIcon name='home-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--home'
                    title={t('mainMenu.initial.begin')}
                />
                <SANNavigationListItem
                    to='/portal/cursos'
                    icon={<SANEvaIcon name='book-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--allCourses'
                    title={t('mainMenu.initial.allCourses')}
                />
                <SANNavigationListItem
                    to='/portal/banco-questoes/filtro'
                    icon={<SANEvaIcon name='edit-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--questions'
                    title={t('mainMenu.initial.questions')}
                />
                <SANNavigationListItem
                    to='/portal/minha-conta'
                    icon={<SANEvaIcon name='person-outline' color='default' />}
                    onClick={handleAccount}
                    dataTestid='flx-menu__go-to--account'
                    title={t('mainMenu.initial.account')}
                />
            </SANNavigationList>
        </>
    )
}

export default FLXMenuInitial
