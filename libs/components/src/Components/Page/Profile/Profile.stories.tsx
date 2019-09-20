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

const states = [
    { id: '1', name: 'Acre (AC)' },
    { id: '2', name: 'Alagoas (AL) ' },
    { id: '3', name: 'Amapá (AP)' },
    { id: '4', name: 'Amazonas (AM)' },
    { id: '5', name: 'Bahia (BA)' },
    { id: '6', name: 'Ceará (CE)' },
    { id: '7', name: 'Distrito Federal (DF)' }
]

storiesOf('Page.Profile', module).add(
    'Simple',
    () => (
        <SANProfile
            onBack={() => console.log('onBack')}
            states={states}
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
