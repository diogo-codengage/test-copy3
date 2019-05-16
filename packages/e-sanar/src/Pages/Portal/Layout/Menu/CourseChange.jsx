import React from 'react'

import { useTranslation } from 'react-i18next'

import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESChangeCourse from 'sanar-ui/dist/Components/Molecules/ChangeCourse'
import ESSelect, { ESOption } from 'sanar-ui/dist/Components/Atoms/Select'

const intlPath = 'mainMenu.changeCourse.'

const SANCourseChange = ({ setTab }) => {
    const { t } = useTranslation()

    return (
        <>
            <div className='pl-md pr-md mb-md'>
                <ESButton
                    className='mb-md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    onClick={() => setTab(0)}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </ESButton>
            </div>
            <ESChangeCourse
                title='Trilha Sanar Enfermagem'
                date='23/05/2020'
                percent={45}
                coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
                icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:2eef4ded-78c2-4ef5-abe4-08b602aad71c&params=version:0&token=1558008652_da39a3ee_7a22c22a02018c4fd70f9f9f69150074add489ff&api_key=CometServer1'
                onContinue={console.log}
                module='Continuar no Módulo 2, aula 5'
                description='Per aumento de cachacis, eu reclamis.'
            />
            <div className='pl-md pr-md pt-md pb-md'>
                <ESTypography className='mb-md text-white-9' level={5}>
                    {t(`${intlPath}changeCourse`)}
                </ESTypography>

                <ESSelect style={{ width: '100%' }} defaultValue='todas'>
                    <ESOption value='todas'>Todas as áreas</ESOption>
                </ESSelect>
                <ESTypography
                    className='mb-md mt-md text-white-8'
                    variant='caption'
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: t(`${intlPath}message`, {
                                courses: 2,
                                filter: 'Todas as áreas'
                            })
                        }}
                    />
                </ESTypography>
                {[0, 1].map(i => (
                    <ESChangeCourse
                        key={i}
                        className='mb-md'
                        title='Trilha Sanar Enfermagem'
                        date='23/05/2020'
                        percent={45}
                        arrow
                        round
                        coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
                        icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:2eef4ded-78c2-4ef5-abe4-08b602aad71c&params=version:0&token=1558008652_da39a3ee_7a22c22a02018c4fd70f9f9f69150074add489ff&api_key=CometServer1'
                        onChange={console.log}
                    />
                ))}
            </div>
        </>
    )
}

export default SANCourseChange
