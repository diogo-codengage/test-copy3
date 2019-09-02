import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import SANClassroomHeader from './ClassroomHeader'

storiesOf('Molecules.ClassroomHeader', module).add('Simple', () => (
    <SANClassroomHeader title='Title' subtitle='Subtitle' />
))
