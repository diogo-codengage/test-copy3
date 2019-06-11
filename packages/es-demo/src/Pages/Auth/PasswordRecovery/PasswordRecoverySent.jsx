import React from 'react'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import image from 'assets/images/auth/mail.png'

//TODO: change to real behavior.
const SANPasswordRecoverySent = ({ location, history }) => {
    const params = new URLSearchParams(location.search)
    return (
        <div className='san-password-recovery__success'>
            <ESPasswordRecoveryTemplate
                title='Enviado com sucesso!'
                subtitle='Um link de recuperação foi enviado para:'
                image={image}
                actions={
                    <>
                        <ESTypography
                            className='san-password-recovery__success--email'
                            level={6}
                        >
                            {params.get('email')}
                        </ESTypography>
                        <ESTypography
                            variant='subtitle2'
                            className='san-password-recovery__success--info'
                        >
                            Fique atento a caixa de spam caso não encontre o
                            e-mail de recuperação.
                        </ESTypography>
                        <ESButton
                            href='../../'
                            uppercase
                            block
                            variant='solid'
                            color='primary'
                        >
                            Acessar conta
                        </ESButton>
                    </>
                }
            />
        </div>
    )
}

export default SANPasswordRecoverySent
