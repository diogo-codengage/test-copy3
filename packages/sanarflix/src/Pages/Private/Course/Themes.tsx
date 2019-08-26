import React from 'react'

import { useTranslation } from 'react-i18next'
import { theme } from 'styled-tools'

import {
    SANLayoutContainer,
    SANTypography,
    SANSessionTitle,
    SANInfiniteScroll,
    SANCollapseTheme,
    SANCollapseThemePanel,
    SANStyled,
    SANQuery
} from '@sanar/components'
import { renderClass } from '@sanar/components/dist/Components/Molecules/CollapseTheme'

import { FLXCompletenessFilters } from 'Components/CompletenessFilters'
import { GET_THEMES, IThemes } from 'Apollo/Course/Queries/themes'
import {
    GET_THEME_CONTENTS,
    IThemeContents
} from 'Apollo/Course/Queries/theme-contents'

const SANSessionTitleStyled = SANStyled(SANSessionTitle)`
    & > div:nth-child(2) {
        display: block;
        flex: inherit;
        margin: 0;

        ${theme('mediaQueries.down.xs')} {
            margin-top: ${theme('space.md')};
        }
    }
`

const updateCacheThemes = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        courses: {
            ...prev.themes,
            data: [...prev.themes.data, ...fetchMoreResult.themes.data]
        }
    })
}

const lessons = {
    // icon: <Icon />,
    title: 'Nome do Artigo e Diretriz',
    subtitle: 'Artigos e Diretrizes',
    checked: false
}

const renderTheme = (theme, index) => (
    <SANCollapseThemePanel key={theme.id} index={index} title={theme.name}>
        <div>dsad</div>
        <SANQuery<IThemeContents>
            query={GET_THEME_CONTENTS}
            options={{ variables: { themeId: theme.id } }}
        >
            {({ data: { themeContents } }: { data: IThemeContents }) => (
                <div>dsad</div>
            )}
        </SANQuery>
    </SANCollapseThemePanel>
)

const Themes = ({ courseId }: { courseId: string }) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANQuery query={GET_THEMES} options={{ variables: { courseId } }}>
            {({
                data: { themes },
                fetchMore
            }: {
                data: IThemes
                fetchMore: (data: any) => Object
            }) => (
                <>
                    <SANLayoutContainer pt={8} pb={7}>
                        <SANSessionTitleStyled
                            title={t('course.subheader.keyWithCount', {
                                count: themes.count
                            })}
                            extra={
                                <FLXCompletenessFilters
                                    defaultValue='all'
                                    value={'all'}
                                    onChange={() => {}}
                                />
                            }
                            extraOnLeft
                            m='0'
                        />
                    </SANLayoutContainer>
                    <SANLayoutContainer pb={8}>
                        <SANInfiniteScroll
                            threshold={71}
                            loadMore={() =>
                                fetchMore({
                                    variables: {
                                        offset: themes.data.length
                                    },
                                    updateQuery: updateCacheThemes
                                })
                            }
                            hasMore={themes.data.length < themes.count}
                        >
                            <SANCollapseTheme>
                                {themes.data.map(renderTheme)}
                            </SANCollapseTheme>
                        </SANInfiniteScroll>
                    </SANLayoutContainer>
                </>
            )}
        </SANQuery>
    )
}

export default Themes
