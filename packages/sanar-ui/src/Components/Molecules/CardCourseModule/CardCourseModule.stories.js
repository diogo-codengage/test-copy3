import React from 'react'
import { storiesOf } from '@storybook/react'
import ESCardCourseModule from './CardCourseModule'

import imageExample from '../../../assets/images/card-course-module/example.png'
import { text, number, boolean } from '@storybook/addon-knobs'

storiesOf('Molecules.CardCourseModule', module).add('Simple', () => (
    <ESCardCourseModule
        image={imageExample}
        moduleName={text('Module name', 'MÓDULO 1')}
        title={text('Title', 'Planner de estudo')}
        badge={text('Badge', '15/30')}
        progress={number('Progress', 50)}
        redirectTo={text('Redirect to', 'foo')}
        actionName={text('Action name', 'Ver aulas')}
        moduleTime={text('Module time', '30 min')}
        disabled={boolean('Disabled', false)}
    />
))
