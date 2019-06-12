import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { object } from '@storybook/addon-knobs'
import ESModalTabs from './ModalTabs'
import Button from 'antd/lib/button/button'

const content = [
    {
        title: 'Termos de uso',
        content: [
            {
                title: 'Termo 1',
                content:
                    'A E-Sanar constitui plataforma on-line ("Plataforma"), disponibilizada a você, doravante denominado "Usuário", por meio do endereço http://www.e-sanar.com.br, desenvolvida e provida por Editora Sanar LTDA ME, pessoa jurídica de direito privado, com Matriz em Av. Prof. Magalhães Neto, 1856 - Pituba, Condomínio Edifício TK TOWER, Sala 1403, CEP 41810-012, Salvador - BA - Brasil Tel.: 71 3497-7689, CNPJ 18.990.682/0001-92.'
            }
        ]
    },
    {
        title: 'Políticas de privacidade',
        content: [
            {
                title: 'Termo 1',
                content:
                    'A E-Sanar constitui plataforma on-line ("Plataforma"), disponibilizada a você, doravante denominado "Usuário", por meio do endereço http://www.e-sanar.com.br, desenvolvida e provida por Editora Sanar LTDA ME, pessoa jurídica de direito privado, com Matriz em Av. Prof. Magalhães Neto, 1856 - Pituba, Condomínio Edifício TK TOWER, Sala 1403, CEP 41810-012, Salvador - BA - Brasil Tel.: 71 3497-7689, CNPJ 18.990.682/0001-92. \n\n A E-Sanar constitui plataforma on-line ("Plataforma"), disponibilizada a você, doravante denominado "Usuário", por meio do endereço http://www.e-sanar.com.br, desenvolvida e provida por Editora Sanar LTDA ME, pessoa jurídica de direito privado, com Matriz em Av. Prof. Magalhães Neto, 1856 - Pituba, Condomínio Edifício TK TOWER, Sala 1403, CEP 41810-012, Salvador - BA - Brasil Tel.: 71 3497-7689, CNPJ 18.990.682/0001-92.'
            }
        ]
    }
]

const ModalExample = () => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button onClick={() => setVisible(!visible)}>Open modal</Button>
            <ESModalTabs
                onCancel={() => setVisible(false)}
                visible={visible}
                content={object('Content', content)}
            />
        </>
    )
}

storiesOf('Organisms.ModalTabs', module).add('Simple', () => <ModalExample />)
