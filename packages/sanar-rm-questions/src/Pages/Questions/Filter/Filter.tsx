import React, { useState } from 'react'

import CardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESSelect, { ESOption } from 'sanar-ui/dist/Components/Atoms/Select'
import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'
import ESDatePicker from 'sanar-ui/dist/Components/Atoms/DatePicker'

import { RMHeader } from '../../../components/RMHeader'
import { RMContainer } from '../../../components/RMContainer'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'

import iconSpecialties from '../../../assets/images/icon-specialties.png'
import iconSubSpecialties from '../../../assets/images/icon-subspecialties.png'
import iconTheme from '../../../assets/images/icon-theme.png'
import { Speciality } from '../../../Apollo/speciality'
import { BRAZIL_STATES } from './brazil-states'

interface IProps {
    specialties: Speciality[]
}

const RMInputContainer = ({ label, input }) =>
    <div style={
        {
            width: '100%',
            display: 'flex',
            flexDirection: 'row'
        }
    }>
        {label}{input}
    </div>

interface SelectFilterItem {
    label: string,
    value: any,
}

const specialityToSelectFilterItem = (s: Speciality): SelectFilterItem => {
    return {
        label: s.label,
        value: s.value
    }
}

export const FilterPage = ({ specialties }: IProps) => {

    const [filters, setFilters] = useState({
        specialties: [],
        subSpecialties: [],
        tags: [],
        state: null,
        year: null,
        onlyWithComments: false
    })
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [subSpecialties, setSubSpecialties] = useState([])

    const states = ['PR', 'SC']
    const tags = specialties.flatMap(s => s.tags);

    const btnStart = <ESButton
        color='primary'
        variant='solid'
        uppercase
        blockOnlyMobile
        onClick={() => console.log({filters})}
    >INICIAR PRÁTICA</ESButton>

    const setSpecialties = (v: SelectFilterItem[]) => {

        const _subs = v.map(i => specialties.find(s => s.value === i.value))
            .flatMap(s => s.children).map(specialityToSelectFilterItem);

        const _subSelected =  filters.subSpecialties.filter( subSpecialtySelected => _subs.find( sub => sub.value === subSpecialtySelected.value ))

        setSubSpecialties(_subs)
        setFilters({ ...filters, specialties: v, subSpecialties: _subSelected })

    }

    return (
        <>
            <RMHeader title={'Área de Prática'} rightElement={btnStart}/>
            <RMContainer>
                <ESRow gutter={24} style={{ marginBottom: '24px' }}>
                    <ESCol span={8}>
                        <CardSelectFilter
                            filterName="Especialidade"
                            image={iconSpecialties}
                            items={specialties.map(specialityToSelectFilterItem)}
                            onChange={v => setSpecialties(v)}
                            value={filters.specialties}
                        />
                    </ESCol>
                    <ESCol span={8}>
                        <CardSelectFilter
                            disabled={subSpecialties.length === 0}
                            filterName="Subespecialidade"
                            image={iconSubSpecialties}
                            items={subSpecialties}
                            onChange={v => setFilters({ ...filters, subSpecialties: v })}
                            value={filters.subSpecialties}
                        />
                    </ESCol>
                    <ESCol span={8}>
                        <CardSelectFilter
                            filterName="Tema"
                            image={iconTheme}
                            items={tags}
                            onChange={v => setFilters({...filters, tags: v})}
                            value={filters.tags}
                        />
                    </ESCol>
                </ESRow>
                <ESCard title={'Ver filtros avançados'}>

                    <ESRow gutter={24} style={{ margin: 60 }}>
                        <ESCol span={8}>
                            <RMInputContainer
                                label={<label>Estado</label>}
                                input={<ESSelect
                                    style={{ width: '100%' }}
                                    onSelect={v => setFilters({...filters, state: v})}

                                >
                                    {BRAZIL_STATES.map(s =>  <ESOption key={s.value} value={s.value}>{s.label}</ESOption>) }
                                </ESSelect>}
                            />
                        </ESCol>

                        <ESCol span={8}>
                            <RMInputContainer
                                label={'Ano'}
                                input={<ESDatePicker onPanelChange={v => { setFilters({...filters, year: v})} }
                                                     value={filters.year}
                                                     d
                                                     mode={'year'} style={{ width: '100%' }}/>}
                            />
                        </ESCol>

                        <ESCol span={8}>
                            <div style={
                                {
                                    padding: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#F7F9FA',
                                    border: '1px solid rgba(17,19,23,0.1)',
                                    borderRadius: '4px'
                                }
                            }>
                                Apenas comentadas<ESSwitch onChange={ v => setFilters({...filters, onlyWithComments: v}) } value={filters.onlyWithComments}/>
                            </div>
                        </ESCol>
                    </ESRow>
                </ESCard>
            </RMContainer>
        </>
    )
}
