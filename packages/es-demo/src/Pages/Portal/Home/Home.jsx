import React from 'react'
import { useTranslation } from 'react-i18next'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

function HomePage() {
    const { t, i18n } = useTranslation('esanar')

    const changeLng = lng => {
        i18n.changeLanguage(lng)
    }

    return (
        <div>
            {/* <span>{t('hello')}</span>
            <button onClick={() => changeLng('en')}>Change for English</button>
            <button onClick={() => changeLng('pt')}>
                Mudar para Português
            </button> */}
        </div>
    )
}

export default HomePage
