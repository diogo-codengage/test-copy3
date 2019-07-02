import React from 'react'

import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'
import ESSessionTitle from '../../Molecules/SessionTitle'
import ESInputSearch from '../../Atoms/Input/InputSearch'

import { text } from '@storybook/addon-knobs'


const SANHelpHeader = () => {
        
    const searchClick = () => {
        console.log("teste click")
    }

    const SearchFilterFunction = (texto) => {
        console.log(texto)
    }
    
    return (
        <div className='es-help-center-template__header'>
            <div className='es-help-center-template__container'>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {'Central de Ajuda'}
                        </ESTypography>
                    }
                    subtitle={'Encontre aqui respostas para as principais dúvidas sobre a plataforma'}
                    extra={
                        <div className='d-flex align-items-center'>
                            <ESInputSearch
                                onClick={searchClick}
                                onChangeText={text => SearchFilterFunction(text)}
                                placeholder={text('Placeholder', 'Como podemos ajudar?')}
                                enterButton={text('Enter button', '')}
                            />
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default SANHelpHeader
