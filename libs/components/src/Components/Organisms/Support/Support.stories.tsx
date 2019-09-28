import React from 'react'
import { storiesOf } from '@storybook/react'
import SANSupport from './Support'

storiesOf('Organisms.Support', module).add('Simple', () => (
    <SANSupport
        ModalProps={{ visible: true }}
        onSubmit={console.log}
        data={{ email: 'diogo@codengage.com' }}
    />
))
