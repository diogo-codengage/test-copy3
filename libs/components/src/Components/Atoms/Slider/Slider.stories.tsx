import React from 'react'
import { storiesOf } from '@storybook/react'
import SANSlider from './Slider'

storiesOf('Molecules.Slider', module).add('Simple', () => (
    <SANSlider initialValue={8} onChange={console.log} />
))
