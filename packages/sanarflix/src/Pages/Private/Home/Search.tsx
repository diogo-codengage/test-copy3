import React from 'react'

import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'
import {
    SANTypography,
    SANLayoutContainer,
    SANStyled,
    SANBox,
    SANSkeleton
} from '@sanar/components'

import FLXSearch from 'Components/Search'

import { useAuthContext } from 'Hooks/auth'

const Wrapper = SANStyled.div`
    background-color: ${theme('colors.white.10')};
    box-shadow: 0 1px 2px ${theme('colors.grey.2')};
`

const SANSkeletonStyled = SANStyled(SANSkeleton)`
    && {
        & h3 {
            height: 50px;
            margin: 0 auto;
        }
    }
`

const FLXHomeSearch = () => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()

    return (
        <Wrapper>
            <SANLayoutContainer
                py={{ md: 9, _: 'xxl' }}
                display='flex'
                alignItems='center'
                flexDirection='column'
            >
                <SANSkeletonStyled
                    loading={!me}
                    paragraph={false}
                    active
                    title={{ width: '80%' }}
                >
                    <SANTypography
                        fontSize={{ md: 7, _: 'xxl' }}
                        color='grey.7'
                        strong
                        textAlign='center'
                    >
                        {t('search.title', { name: !!me && me.name })}
                    </SANTypography>
                </SANSkeletonStyled>
                <SANTypography
                    fontSize={{ md: 'xl', _: 'md' }}
                    mx={{ sm: '100px', _: 0 }}
                    regular
                    mb='xl'
                    mt='lg'
                    color='grey.6'
                    textAlign='center'
                >
                    {t('search.subtitle')}
                </SANTypography>
                <SANBox width={{ sm: '536px', _: '100%' }}>
                    <FLXSearch size='large' />
                </SANBox>
            </SANLayoutContainer>
        </Wrapper>
    )
}

export default FLXHomeSearch
