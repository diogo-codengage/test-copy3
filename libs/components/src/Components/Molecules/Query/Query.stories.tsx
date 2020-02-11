import React from 'react'
import { storiesOf } from '@storybook/react'

const Example = () => (
    <div>
        {`
            <SANQuery query={query}>
                {data => <div>{JSON.stringify(data)}</div>}
            </SANQuery>
        `}
    </div>
)

storiesOf('Molecules.Query', module).add('Simple', () => <Example />)
