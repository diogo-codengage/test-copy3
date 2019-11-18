import React from 'react'
import { storiesOf } from '@storybook/react'
import SANLessonFeedback from './LessonFeedback'

const onSend = value => {
    console.log('onSend:', value)
    return false
}
const onNext = () => {
    console.log('onNext:')
    return false
}
storiesOf('Molecules.LessonFeedback', module).add('Simple', () => (
    <SANLessonFeedback  onSend={(rt) => onSend(rt)} onNext={() => onNext()}/>
))
