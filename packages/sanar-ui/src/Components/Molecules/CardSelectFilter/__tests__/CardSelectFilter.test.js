import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardSelectFilter from '../'

it('renders correctly', () => {
    const component = (
        <ESCardSelectFilter
            labelSelecteds='Especialidades'
            placeholder='Escolher especialidades'
            filterName='Especialidade'
            image='https://public-v2links.adobecc.com/4c410069-6394-48fa-541c-bc910177739e/component?params=component_id:dd16791c-b71d-445b-a86d-e4d7439afb08&params=version:0&token=1559235271_da39a3ee_ba23828d0c23e3335a51dd740aef643486573a74&api_key=CometServer1'
            items={[
                {
                    label: 'Aparência',
                    value: 1
                },
                {
                    label: 'Mal funcionamento',
                    value: 2
                }
            ]}
        />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
