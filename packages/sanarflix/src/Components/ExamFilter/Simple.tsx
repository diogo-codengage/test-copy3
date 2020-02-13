import React from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import {
    SANBox,
    SANSelect,
    SANSelectOption,
    SANCol,
    SANSessionTitle,
    SANLayoutContainer,
    SANDivider
} from '@sanar/components'

interface IFLXFilterSimpleProps {}

const TextCol = styled(SANCol)`
    ${theme('mediaQueries.down.sm')} {
        order: 2;
    }
`

const FLXFilterSimple: React.FC<IFLXFilterSimpleProps> = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANBox px={{ md: '8', _: 'md' }} pb={{ md: 'xxl', _: 'xl' }}>
            <SANLayoutContainer>
                <SANSessionTitle
                    title='Filtros selecionados'
                    subtitle='Aqui você pode editar os filtros escolhidos anteriormente'
                />
                <SANSelect
                    allowClear
                    placeholder={t('examFilter.college.select')}
                    size='large'
                >
                    <SANSelectOption value='1'>1</SANSelectOption>
                    <SANSelectOption value='2'>2</SANSelectOption>
                    <SANSelectOption value='3'>3</SANSelectOption>
                </SANSelect>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default FLXFilterSimple
