import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCollapseTheme from './CollapseTheme'

const Icon = () => (
    <img src='https://lh6.googleusercontent.com/proxy/RvgTRICCMRQatVtmAql3Ekbq-hygP6Jl2-1326m1osHhT8shndAeJ72pePJkGFrEX7YUke7q221d3x6MVVa4rU0rECXXsvV8N66yClXWsqfVUNFI2eY5drQlCxzlFzdDdg7c6U06INMIJVqlnjNg8O7rdxZP1dx-4JRaRq4olw=w1200-h630-p-k-no-nu' />
)

const lessons = [
    {
        icon: <Icon />,
        title: 'Nome da aula - Subtítulo da Aula',
        subtitle: 'Aula Aprofunde',
        checked: true
    },
    {
        icon: <Icon />,
        title: 'Nome do Resumo',
        subtitle: 'Resumo',
        checked: true
    },
    {
        icon: <Icon />,
        title: 'Nome do Tema Abordado nas Questões',
        subtitle: 'Questão',
        checked: false
    },
    {
        icon: <Icon />,
        title: 'Nome do Mapa Mental',
        subtitle: 'Mapa Mental',
        checked: false
    },
    {
        icon: <Icon />,
        title: 'Nome do Fluxograma',
        subtitle: 'Fluxograma',
        checked: false
    },
    {
        icon: <Icon />,
        title: 'Nome do Artigo e Diretriz',
        subtitle: 'Artigos e Diretrizes',
        checked: false
    }
]

const themes = [
    {
        title: 'Anatomia dos Órgãos e Sistemas',
        lessons
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    },
    {
        title: 'Anatomia dos Órgãos e Sistemas'
    }
]

storiesOf('Molecules.CollapseTheme', module).add(
    'Simple',
    () => <SANCollapseTheme data={themes} />,
    {
        style: {
            backgroundColor: '#ffff'
        }
    }
)
