import React from 'react'
import { useTranslation } from 'react-i18next'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

function HomePage() {
    const { t, i18n } = useTranslation()

    const changeLng = lng => {
        i18n.changeLanguage(lng)
    }

    return (
        <div>
            <span>{t('hello')}</span>
            <ESButton type='primary' onClick={() => changeLng('en')}>
                Change for English
            </ESButton>
            <ESButton type='danger' onClick={() => changeLng('pt')}>
                Mudar para Português
            </ESButton>
        </div>
    )
}

export default HomePage
