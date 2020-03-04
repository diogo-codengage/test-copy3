import React from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useMutation } from '@apollo/react-hooks'

import {
    SANBox,
    SANModal,
    SANDivider,
    SANTypography,
    SANScroll
} from '@sanar/components'
import { ISANModalProps } from '@sanar/components/dist/Components/Molecules/Modal'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import logo from 'Assets/images/brand/logo.svg'
import { useAuthContext } from 'Hooks/auth'
import { SUPPLEMENTARY_DATA } from 'Apollo/User/Mutations/supplementary-data'

import { RMComplementaryRegisterForm } from '../'

const SANStyledModal = styled(SANModal)`
    &&& {
        width: 744px !important;
        max-width: 100%;
        top: 0;
        margin: 0;
        padding: 0;

        ${theme('mediaQueries.down.sm')} {
            div.ant-modal-content {
                border-radius: 0 !important;
            }
        }
        ${theme('mediaQueries.up.sm')} {
            max-height: 85vh;

            .ant-modal-content {
                max-height: inherit;

                .ant-modal-body {
                    max-height: inherit;

                    .modal-scroll {
                        max-height: inherit;
                    }
                }
            }
        }
    }
`

const SANImageBox = styled(SANBox)`
    ${theme('mediaQueries.up.sm')} {
        display: none;
    }
`

const styleToModalBodyMobile = {
    padding: 0,
    'border-radius': 0
}

const styleToModalBody = {
    padding: 0
}

const RMComplementaryRegisterModal: React.FC<ISANModalProps> = ({
    onCancel,
    ...props
}) => {
    const { t } = useTranslation('resmed')
    const { width } = useWindowSize()
    const { me } = useAuthContext()
    const [changeCourse] = useMutation(SUPPLEMENTARY_DATA)

    const handleCancel = () => {
        changeCourse({ variables: { data: {} } })
        !!onCancel && onCancel()
    }

    return (
        <SANStyledModal
            centered={width >= 480}
            maxWidth={{ _: '100%', sm: '744px' }}
            bodyStyle={width < 576 ? styleToModalBodyMobile : styleToModalBody}
            onCancel={handleCancel}
            closable={!!me && !!me.userMedUniversity}
            {...props}
        >
            <SANImageBox textAlign='center'>
                <SANBox
                    as='img'
                    src={logo}
                    height={{ _: '24px', xs: '32px' } as any}
                    mx='auto'
                    my='sm'
                />
                <SANDivider my='0' mx='auto' bg='grey.2' />
            </SANImageBox>
            <SANScroll className='modal-scroll'>
                <SANBox
                    px={{ _: 'md', sm: '60px' }}
                    py={{ _: 'xl', sm: 'xxxl' }}
                >
                    <SANTypography
                        fontSize='xl'
                        fontWeight='bold'
                        color='grey.7'
                        mb='xs'
                    >
                        {t('userProfile.title')}
                    </SANTypography>
                    <SANTypography fontSize='md' color='grey.6'>
                        {t(
                            `userProfile.${
                                !!me && !!me.userMedUniversity
                                    ? 'pageSubtitle'
                                    : 'modalSubtitle'
                            }`
                        )}
                    </SANTypography>
                    <SANDivider my='xl' mx='auto' bg='grey.2' />
                    <RMComplementaryRegisterForm closeModal={onCancel} />
                </SANBox>
            </SANScroll>
        </SANStyledModal>
    )
}

export default RMComplementaryRegisterModal
