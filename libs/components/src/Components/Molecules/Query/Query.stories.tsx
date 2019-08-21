import React from 'react'
import { storiesOf } from '@storybook/react'

import gql from 'graphql-tag'

import SANQuery from './Query'

const query = gql`
    {
        courses(order: lastAdded, limit: 20) {
            data {
                id
                name
                cover_picture_url
            }
        }
    }
`

storiesOf('Molecules.Query', module).add('Simple', () => (
    <SANQuery query={query}>
        {data => <div>{JSON.stringify(data)}</div>}
    </SANQuery>
))
