import React, { useCallback } from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'
import { useLazyQuery } from '@apollo/react-hooks'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter,
    SANBox,
    SANEvaIcon,
    SANScroll,
    SANSpin
} from '@sanar/components'

import { ISANModalProps } from '@sanar/components/dist/Components/Molecules/Modal'
import {
    ILessonLastAccessedQuery,
    GET_LESSON_LAST_ACCESSED
} from 'Apollo/Subspecialties/Queries/lessons'

import { useMainContext } from 'Pages/Private/Context'

const ItemStyled = styled(SANBox)<{ blocked?: boolean }>`
    &:nth-child(even) {
        background-color: ${theme('colors.grey-solid.1')};
    }

    ${ifProp(
        'blocked',
        css`
            opacity: 0.5;
            cursor: not-allowed;
        `,
        css`
            &:hover {
                background-color: ${theme('colors.grey-solid.2')};
            }
            cursor: pointer;
        `
    )}
`

const Item = ({ index, name, completed, status, onClick }) => (
    <ItemStyled
        py='md'
        px='lg'
        pr='sm'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        blocked={status !== 'active'}
        onClick={status === 'active' && onClick}
        mr='xs'
    >
        <SANBox display='flex' alignItems='center'>
            <SANTypography
                color={completed ? 'primary' : 'grey.5'}
                fontSize='md'
                fontWeight='bold'
                lineHeight='1'
                mr='xs'
            >
                {index}
            </SANTypography>
            <SANTypography fontSize='lg' lineHeight='1' mr='xs'>
                {name}
            </SANTypography>
        </SANBox>
        {completed ? (
            <SANEvaIcon
                name='checkmark-circle-2'
                color='primary'
                size='xlarge'
            />
        ) : (
            <SANEvaIcon name='arrow-ios-forward-outline' size='large' />
        )}
    </ItemStyled>
)

interface ITheme {
    name: string
    completed?: boolean
    status?: string
}

interface IRMModalThemesProps extends ISANModalProps, RouteComponentProps {
    themes: ITheme[]
    visible: boolean
    loading: boolean
    title: string
    onCancel: () => void
    onContinue: () => void
}

const RMModalThemes: React.FC<IRMModalThemesProps> = ({
    onContinue,
    themes,
    loading,
    history,
    ...props
}) => {
    const { t } = useTranslation('resmed')
    const { handleTrack } = useMainContext()
    const [getLastAccessed] = useLazyQuery<ILessonLastAccessedQuery>(
        GET_LESSON_LAST_ACCESSED,
        {
            onCompleted: ({ lesson }) => goToClassroom(lesson)
        }
    )

    const goToClassroom = lessonProp => {
        try {
            const {
                specialtyId,
                subSpecialtyId,
                lesson,
                collectionId,
                resource
            } = lessonProp.lastAccessed
            handleTrack('Lesson clicked', {
                'Specialty ID': specialtyId,
                'Subspecialty ID': subSpecialtyId,
                'Lesson ID': lesson.id,
                'Clicker ID': collectionId
            })
            const type = resource.type.toLocaleLowerCase()
            if (type === 'quiz') {
                history.push(
                    `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${lesson.id}/${collectionId}/quiz/${resource.id}/0`
                )
            } else {
                history.push(
                    `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${lesson.id}/${collectionId}/video/${resource.id}`
                )
            }
        } catch {}
    }

    const renderTheme = useCallback(
        (theme, index) => (
            <Item
                {...theme}
                index={index + 1}
                key={index}
                onClick={() =>
                    getLastAccessed({ variables: { parentId: theme.id } })
                }
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <SANModal
            centered
            width={360}
            style={{ overflow: 'hidden' }}
            {...props}
        >
            <SANSpin spinning={loading}>
                <SANBox margin='-24px' mb='lg' py='sm' height={345}>
                    <SANScroll>{themes.map(renderTheme)}</SANScroll>
                </SANBox>
                <SANModalFooter
                    justifyContent='center'
                    borderTop='1px solid'
                    borderColor='grey.2'
                    margin='-24px'
                    padding='sm'
                >
                    <SANButton
                        size='small'
                        variant='text'
                        color='primary'
                        uppercase
                        bold
                        onClick={onContinue}
                    >
                        {t('modalThemes.continue')}
                    </SANButton>
                </SANModalFooter>
            </SANSpin>
        </SANModal>
    )
}

export default withRouter(RMModalThemes)
