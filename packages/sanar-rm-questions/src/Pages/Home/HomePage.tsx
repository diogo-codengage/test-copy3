import React from 'react'
import { isLocalhost } from '../../Util/environment'

export const HomePage = () => {

    if(isLocalhost()){
        return (
            <div  style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexFlow: 'column',
                height: '60vh',
            }}>
                <a href={`./#/pratica`}> acesso direto </a>
                <a href={`./#/pratica-curso/eyJlbnJvbGxtZW50SWQiOiI1YzU2YWI5NTc1NmQ2NzAwMjY5Y2E1MTgiLCJtb2R1bGVJZCI6IjVjNTY5NDA0MGNlOGU2MDAxYzlmMTE4ZCIsImNvbnRlbnRJZCI6IjVjNTY5NDA1NjQ2OWNjMDAxYzQzZWEyMCIsIm1vZHVsZU5hbWUiOiJTYXJjb21hcyIsInN1YlNwZWNpYWx0eU5hbWUiOiJDaXJ1cmdpYSBHZXJhbCIsInNwZWNpYWx0eU5hbWUiOiJDaXJ1cmdpYSJ9`}> acesso apartir de um curso </a>
            </div>
        )
    }

    setTimeout(() => {
        window.open(`./#/pratica`)
    })

    return <></>

}
