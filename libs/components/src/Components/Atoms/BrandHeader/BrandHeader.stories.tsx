import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import SANBrandHeader from './BrandHeader'

storiesOf('Atoms.BrandHeader', module).add('Simple', () => (
    <SANBrandHeader dark={boolean('Dark', false)} />
))
