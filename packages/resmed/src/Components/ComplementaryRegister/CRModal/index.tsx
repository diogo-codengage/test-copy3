import React, { useState, useRef, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANPage,
    SANForm,
    SANInput,
    SANModal,
    SANButton,
    SANSelect,
    SANTypography,
    SANRadioButton,
    SANSelectFilter
} from '@sanar/components'

import styled from 'styled-components'
import { theme } from 'styled-tools'

const RMProfile = ({ form, update }) => {
    const { t } = useTranslation('resmed')

    return <SANModal></SANModal>
}
