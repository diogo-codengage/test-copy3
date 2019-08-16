import React from 'react'
import PropTypes from 'prop-types'

import { I18nextProvider } from 'react-i18next'

// import i18n from '../../../Config/i18n'

const ESI18nProvider = ({ children, i18n }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

ESI18nProvider.propTypes = {
    children: PropTypes.node,
    i18n: PropTypes.object
}
ESI18nProvider.defaultProps = {
    // i18n
}

export default ESI18nProvider
