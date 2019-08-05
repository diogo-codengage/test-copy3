import React from 'react'
import PropTypes from 'prop-types'

import { I18nextProvider } from 'react-i18next'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESI18nProvider: React.FC<IProps>=({ children, i18n }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

const propTypes = Object.assign({
    children: PropTypes.node,
    i18n: PropTypes.object
})

ESI18nProvider.propTypes = propTypes

ESI18nProvider.defaultProps = {}

export default ESI18nProvider
