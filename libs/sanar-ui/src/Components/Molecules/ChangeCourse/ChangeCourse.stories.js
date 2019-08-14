import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number, text, boolean } from '@storybook/addon-knobs'

import ESChangeCourse from './ChangeCourse'

storiesOf('Molecules.ChangeCourse', module).add('Simple', () => (
    <ESChangeCourse
        title={text('Title', 'Trilha Sanar Enfermagem')}
        date={text('Date', '23/05/2020')}
        percent={number('Percent', 45)}
        arrow={boolean('Arrow', false)}
        round={boolean('Round', false)}
        coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
        icon='https://public-v2links.adobecc.com/708e2f04-215d-454f-6692-c1d3b53d580f/component?params=component_id:2eef4ded-78c2-4ef5-abe4-08b602aad71c&params=version:0&token=1558008652_da39a3ee_7a22c22a02018c4fd70f9f9f69150074add489ff&api_key=CometServer1'
        onChange={action('onChange')}
        onContinue={action('onContinue')}
        module={text('Module', 'Continuar no Módulo 2, aula 5')}
        description={text(
            'Description',
            'Per aumento de cachacis, eu reclamis.'
        )}
    />
))
