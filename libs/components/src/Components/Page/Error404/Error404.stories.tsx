import React from 'react'
import { storiesOf } from '@storybook/react'
import SANError404 from './Error404'

import { SANSearch } from '../../Molecules/Search'

storiesOf('Page.Error404', module).add(
    'Simple',
    () => (
        <SANError404>
            <SANSearch
                InputProps={{
                    placeholder:
                        'Busque por cursos, aulas, resumos e muito mais…',
                    size: 'large'
                }}
            />
        </SANError404>
    ),
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
