import React from 'react'
import { storiesOf } from '@storybook/react'

import ESCol from './Col'
import ESRow from './Row'

const props = {
    style: {}
}

storiesOf('Atoms.Grid', module).add(
    'Simple',
    () => (
        <div>
            <ESRow>
                <ESCol span={12}>col-12</ESCol>
                <ESCol span={12}>col-12</ESCol>
            </ESRow>
            <ESRow>
                <ESCol span={8}>col-8</ESCol>
                <ESCol span={8}>col-8</ESCol>
                <ESCol span={8}>col-8</ESCol>
            </ESRow>
            <ESRow>
                <ESCol span={6}>col-6</ESCol>
                <ESCol span={6}>col-6</ESCol>
                <ESCol span={6}>col-6</ESCol>
                <ESCol span={6}>col-6</ESCol>
            </ESRow>
        </div>
    ),
    {
        info: {
            propTablesExclude: ['div']
        }
    }
)
