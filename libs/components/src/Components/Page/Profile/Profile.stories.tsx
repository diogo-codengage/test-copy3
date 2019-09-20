import React from 'react'
import { storiesOf } from '@storybook/react'

import SANProfile from './Profile'

const user = {
    id: '1',
    name: 'Diogo Biz',
    profilePicture:
        'http://www.maxmoto.com.br/wp-content/uploads/2015/09/Biz-125-Cinza-3.4-FD-copy-3.jpg',
    document: '00000000000',
    email: 'diogo@codengage.com',
    phone: '46999375562',
    college: 'UNISEP',
    semester: 8,
    postalCode: '85660000',
    address: 'R. Estevão Skorek, 111',
    neighborhood: 'Jardim Concórdia',
    complement: '',
    city: 'Dois Vizinhos',
    state: 'Paraná'
}

storiesOf('Page.Profile', module).add(
    'Simple',
    () => (
        <SANProfile
            onBack={() => console.log('onBack')}
            user={user}
            onSubmit={console.log}
        />
    ),
    {
        style: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 0
        }
    }
)
