import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardCourseModule from './CardCourseModule'

storiesOf('Molecules.CardCourseModule', module).add('Simple', () => (
    <SANCardCourseModule resourceType='Document' />
))
