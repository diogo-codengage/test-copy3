import React from 'react'
import { useTranslation } from 'react-i18next'

function HomePage() {
    const { t, i18n } = useTranslation()

    const changeLng = lng => {
        i18n.changeLanguage(lng)
    }

    return (
        <div>
            <span>{t('hello')}</span>
            <button onClick={() => changeLng('en')}>Change for English</button>
            <button onClick={() => changeLng('pt')}>Mudar para Português</button>
        </div>
    )
}

export default HomePage
