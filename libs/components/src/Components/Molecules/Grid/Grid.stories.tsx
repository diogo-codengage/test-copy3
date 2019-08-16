import React from 'react'
import { storiesOf } from '@storybook/react'

import SANRow from './Row'
import SANCol from './Col'

storiesOf('Molecules.Grid', module).add('Simple', () => (
    <>
        <SANRow>
            <SANCol span={12}>col-12</SANCol>
            <SANCol span={12}>col-12</SANCol>
        </SANRow>
        <SANRow>
            <SANCol span={8}>col-8</SANCol>
            <SANCol span={8}>col-8</SANCol>
            <SANCol span={8}>col-8</SANCol>
        </SANRow>
        <SANRow>
            <SANCol span={6}>col-6</SANCol>
            <SANCol span={6}>col-6</SANCol>
            <SANCol span={6}>col-6</SANCol>
            <SANCol span={6}>col-6</SANCol>
        </SANRow>
    </>
))
