import React from 'react'

export const HomePage = () => {
    return (
        <div  style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column',
            height: '60vh',
        }}>
            <a href={'/#/Questions'}> acesso direto </a>
            <a href={'/#/QuestionsFromCurse'}> acesso apartir de um curso </a>
        </div>
    )
}