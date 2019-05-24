import React from 'react'

import { useTranslation } from 'react-i18next'

import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESInputSearch } from 'sanar-ui/dist/Components/Atoms/Input'
import ESChangeCourse from 'sanar-ui/dist/Components/Molecules/ChangeCourse'

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
                coverPicture='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:899c6240-1561-47a3-b425-036d434af138&params=version:0&token=1558439368_da39a3ee_68fc0088bfa72e77be9860d55ddd139582a2974a&api_key=CometServer1'
                icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:4bebafd6-cbae-4b0f-a8b3-9dcc45696d90&params=version:0&token=1558439368_da39a3ee_68fc0088bfa72e77be9860d55ddd139582a2974a&api_key=CometServer1'
                onContinue={console.log}
                module='Continuar no Módulo 2, aula 5'
                description='Per aumento de cachacis, eu reclamis.'
            />
            <div className='pl-md pr-md pt-md pb-md'>
                <ESTypography className='mb-md text-white-9' level={5}>
                    {t(`${intlPath}changeCourse`)}
                </ESTypography>

                <ESInputSearch placeholder='Todas as áreas' />
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
                        coverPicture='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:0350b44a-5d5b-4fc8-a46e-e69fbe91c118&params=version:0&token=1558439368_da39a3ee_68fc0088bfa72e77be9860d55ddd139582a2974a&api_key=CometServer1'
                        icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:4bebafd6-cbae-4b0f-a8b3-9dcc45696d90&params=version:0&token=1558439368_da39a3ee_68fc0088bfa72e77be9860d55ddd139582a2974a&api_key=CometServer1'
                        onChange={console.log}
                    />
                ))}
            </div>
        </>
    )
}

export default SANCourseChange
