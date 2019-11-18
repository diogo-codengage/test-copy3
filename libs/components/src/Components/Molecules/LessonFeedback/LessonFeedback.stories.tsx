import React from 'react'
import { storiesOf } from '@storybook/react'
import SANLessonFeedback from './LessonFeedback'

const onSend = (value, { setSubmitting }) => {
    console.log('onSend:', value)
    setTimeout(() => setSubmitting(false), 2000)
}
const onNext = () => console.log('onNext:')

storiesOf('Molecules.LessonFeedback', module).add('Simple', () => (
    <SANLessonFeedback onSend={onSend} onNext={onNext} />
))
