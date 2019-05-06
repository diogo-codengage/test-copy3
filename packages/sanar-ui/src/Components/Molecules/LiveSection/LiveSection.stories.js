import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, number } from '@storybook/addon-knobs'

import ESLiveSection from './LiveSection'

import ESButton from '../../Atoms/Button'

storiesOf('Molecules.LiveSection', module).add('Simple', () => (
    <ESLiveSection
        videoSrc={text(
            'Video src',
            'https://www.youtube.com/embed/j870-92BoaE'
        )}
        title={text('Title', 'Live de Correção da prova SUS-SP 2019 - Parte 1')}
        date={text('Date', '27/04/2019')}
        name={text('Name', 'Camila Carla Gianna')}
        courses={number('Courses', 4)}
        description={text(
            'Description',
            `Essa é a oportunidade de você aprender como planejar
            seus estudos em 2019! Saiba como montar um
            cronograma, quanto tempo deverá dedicar ao estudo
            por dia, quantas horas para cada matéria.`
        )}
        action={
            <ESButton size='small' block>
                VER LIVES ANTERIORES
            </ESButton>
        }
    />
))
