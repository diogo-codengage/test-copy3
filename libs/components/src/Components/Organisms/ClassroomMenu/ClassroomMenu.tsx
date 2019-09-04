import React from 'react'

import { SANBox } from 'Components/Atoms/Box'
import { SANTypography } from 'Components/Atoms/Typography'
import { SANCommonBadge } from 'Components/Atoms/CommonBadge'
import { SANDivider } from 'Components/Atoms/Divider'
import { useTranslation } from 'react-i18next'
import {
    SANDisciplineDropdown,
    ISANDisciplineDropdownProps
} from 'Components/Molecules/DisciplineDropdown'
import { ISANPlaylistProps, SANPlaylist } from 'Components/Molecules/Playlist'

interface ICourse {
    knowledgeArea: string
    name: string
    progress: number
}

interface IProps {
    course: ICourse
    DisciplineDropdownProps: ISANDisciplineDropdownProps
    PlaylistProps: ISANPlaylistProps
}

const SANClassroomMenu: React.FC<IProps> = ({
    course: { knowledgeArea, name, progress },
    DisciplineDropdownProps,
    PlaylistProps
}) => {
    const { t } = useTranslation('components')
    return (
        <SANBox height='100%' backgroundColor='grey-solid.8'>
            <SANBox px={4} pt={6}>
                <SANBox>
                    <SANTypography mb={1} color='white.7' variant='overline'>
                        {knowledgeArea}
                    </SANTypography>
                    <SANTypography
                        mb={1}
                        color='white.10'
                        level={5}
                        strong
                        ellipsis
                    >
                        {name}
                    </SANTypography>
                    <SANBox
                        displayFlex
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <SANTypography
                            strong
                            ellipsis
                            variant='caption'
                            color='white.5'
                        >
                            {t('global.courseProgress')}
                        </SANTypography>
                        <SANCommonBadge
                            count={progress}
                            suffix='%'
                            status='warning'
                        />
                    </SANBox>
                </SANBox>
                <SANDivider mt={5} mb={5} backgroundColor='grey.4' />
                <SANBox
                    displayFlex
                    alignItems='center'
                    justifyContent='space-between'
                    color='white.10'
                    mb={2}
                >
                    <SANTypography transform='uppercase' variant='caption'>
                        {t('global.theme')}
                    </SANTypography>
                    <SANTypography color='white.5' variant='caption'>
                        0 / 0
                    </SANTypography>
                </SANBox>
                <SANDisciplineDropdown
                    onSelect={DisciplineDropdownProps.onSelect}
                    activeItem={DisciplineDropdownProps.activeItem}
                    items={DisciplineDropdownProps.items}
                    loading={DisciplineDropdownProps.loading}
                    progress={DisciplineDropdownProps.progress}
                />
            </SANBox>
            <SANPlaylist
                loading={PlaylistProps.loading}
                items={PlaylistProps.items}
                currentIndex={PlaylistProps.currentIndex}
                goToResource={PlaylistProps.goToResource}
            />
        </SANBox>
    )
}

export default SANClassroomMenu