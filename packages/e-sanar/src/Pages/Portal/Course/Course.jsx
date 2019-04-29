import React from 'react'
import { PageHeader, Typography, Divider, Tabs } from 'antd'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESProgressBar from 'sanar-ui/dist/Components/Molecules/ProgressBar'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import './style.less'

export const CoursePage = () => (
    <div className='course'>
        <PageHeader>
            <ESRow>
                <ESCol xs={24} md={12}>
                    <ESRow type='flex' align='middle' gutter={16}>
                        <ESCol>
                            <img
                                alt=''
                                src='https://freeiconshop.com/wp-content/uploads/edd/bulb-flat.png'
                            />
                        </ESCol>
                        <ESCol flex={1}>
                            <Typography.Text disabled>
                                CURSO DE ENFERMAGEM
                            </Typography.Text>{' '}
                            <br />
                            <Typography.Text strong>
                                Trilha Sanar Fisioterapia
                            </Typography.Text>
                        </ESCol>
                    </ESRow>
                </ESCol>
                <ESCol xs={24} md={12}>
                    <Divider type='vertical' />
                    <ESRow gutter={16}>
                        <ESCol>
                            <ESProgressBar percent={30} />
                        </ESCol>
                        <ESCol>
                            <ESButton ghost icon='download' disabled>
                                CERTIFICADO
                            </ESButton>
                        </ESCol>
                    </ESRow>
                </ESCol>
            </ESRow>
        </PageHeader>
        <Tabs defaultActiveKey='1' tabBarGutter={0}>
            <Tabs.TabPane tab='Visão Geral' key='1'>
                Visão Geral
            </Tabs.TabPane>
            <Tabs.TabPane tab='Conteúdo' key='2'>
                Conteúdo
            </Tabs.TabPane>
            <Tabs.TabPane tab='Comentários' key='3'>
                Comentários
            </Tabs.TabPane>
        </Tabs>
    </div>
)
