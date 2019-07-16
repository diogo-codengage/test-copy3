import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ESFeedbackSimple from './FeedbackSimple'

storiesOf('Molecules.FeedbackSimple', module).add('Simple', () => (
    <ESFeedbackSimple visible onSubmit={action('onSubmit')} />
))
