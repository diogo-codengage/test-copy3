import React from 'react'
import SANPortalLayoutContainer from 'Pages/Portal/Layout/Container'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { withRouter } from 'react-router'

const SANPracticeCompletedHeader = ({ history }) => (
    <div className='san-practice-completed__header'>
        <SANPortalLayoutContainer>
            <ESSessionTitle
                title={<ESTypography level={4}>Resultado</ESTypography>}
                subtitle='Verifique como você se saiu nessa sessão de prática'
                extra={
                    <div className='d-flex align-items-center'>
                        <ESButton
                            variant='text'
                            uppercase
                            bold
                            size='small'
                            className='mr-lg'
                            onClick={() => history.push('./historico')}
                        >
                            Histórico
                        </ESButton>
                        <ESButton
                            variant='solid'
                            color='primary'
                            uppercase
                            bold
                            size='small'
                            onClick={() => history.push('./')}
                        >
                            Banco de questões
                        </ESButton>
                    </div>
                }
            />
        </SANPortalLayoutContainer>
    </div>
)

export default withRouter(SANPracticeCompletedHeader)
