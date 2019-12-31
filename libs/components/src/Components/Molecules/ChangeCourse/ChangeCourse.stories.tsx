import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number, text, boolean } from '@storybook/addon-knobs'

import SANChangeCourse from './ChangeCourse'

storiesOf('Molecules.ChangeCourse', module)
    .add('Simple', () => (
        <SANChangeCourse
            id='1'
            title={text('Title', 'Extensivo')}
            date={text('Date', '23/05/2020')}
            percent={number('Percent', 45)}
            loading={boolean('Loading', false)}
            coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
            onChange={action('onChange')}
            ContinueProps={{
                onClick: action('on continue'),
                title: 'Continuar na aula 5',
                subtitle: 'Duis rhoncus dui venenatis consequa'
            }}
        />
    ))
    .add('Without Coninue', () => (
        <SANChangeCourse
            id='1'
            title={text('Title', 'Avançado')}
            date={text('Date', '23/05/2020')}
            percent={number('Percent', 100)}
            loading={boolean('Loading', false)}
            coverPicture='http://sites.psu.edu/huangnutr360/files/2017/04/lesson-0-1ta118a.png'
            onChange={action('onChange')}
        />
    ))
