import React from 'react'
import { render, cleanup } from 'react-testing-library'

import ESButton from '../../../Atoms/Button'
import ESLiveSection from '../'

afterEach(cleanup)

it('renders correctly', () => {
    const { getByText, asFragment } = render(
        <ESLiveSection
            videoSrc='https://www.youtube.com/embed/j870-92BoaE'
            title='Live de Correção da prova SUS-SP 2019 - Parte 1'
            date='27/04/2019'
            name='Camila Carla Gianna'
            description={`Essa é a oportunidade de você aprender como planejar
            seus estudos em 2019! Saiba como montar um
            cronograma, quanto tempo deverá dedicar ao estudo
            por dia, quantas horas para cada matéria.`}
            action={
                <ESButton size='small' block>
                    VER LIVES ANTERIORES
                </ESButton>
            }
        />
    )

    getByText('Camila Carla Gianna')
    expect(asFragment()).toMatchSnapshot()
})
