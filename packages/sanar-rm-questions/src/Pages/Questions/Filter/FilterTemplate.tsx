import React, { useContext, useState } from 'react'

import CardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESSelect, { ESOption } from 'sanar-ui/dist/Components/Atoms/Select'
import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'
import ESDatePicker from 'sanar-ui/dist/Components/Atoms/DatePicker'

import ESCard from 'sanar-ui/dist/Components/Molecules/Card'

import iconSpecialties from '../../../assets/images/icon-specialties.png'
import iconSubSpecialties from '../../../assets/images/icon-subspecialties.png'
import iconTheme from '../../../assets/images/icon-theme.png'
import { BRAZIL_STATES } from './brazil-states'
import { RMContainer } from '../../../Components/RMContainer'
import { RMHeader } from '../../../Components/RMHeader'
import { IFormFilterState, QuestionPageType, useQuestionsContext } from '../QuestionsContext'
import { QuestionsInputFilter } from '../../../Apollo/QuestionsInputFilter'

// const toQuestionFilter = (formFilter: IFormFilterState): QuestionsInputFilter  => ({
//         specialtiesIds: formFilter.selectedSpecialties.map(s => s.value)
//             .concat( formFilter.selectedSubSpecialties.map(s => s.value)),
//         state: formFilter.selectedState ? formFilter.selectedState.value : null,
//         tagsIds: formFilter.selectedTags.map(t => t.value),
//         isCommentedByExpert: formFilter.isCommentedByExpert
// })

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

export const FilterTemplate = () => {
    console.log('re rendering')
    const questionsCtx = useQuestionsContext()
    const filters = questionsCtx.formFilterState;
    const setFilters = questionsCtx.setFormFilterState;

    const normalizeFiltersValues = () => {
        questionsCtx.allSpecialties = questionsCtx.specialties
        questionsCtx.allSubSpecialties = questionsCtx.selectedSpecialties.flatMap(s => s.children)
        questionsCtx.allTags = questionsCtx.allSpecialties.flatMap(s => s.tags).concat(
            // questionsCtx.allSubSpecialties.flatMap(s => s.children).flatMap(s => s.tags)
        );
    }

    if(questionsCtx.allSpecialties.length === 0) {
        normalizeFiltersValues();
    }

    const btnStart = <ESButton
        color='primary'
        variant='solid'
        uppercase
        blockOnlyMobile
        onClick={() => {
            console.log({filters})
            // questionsCtx.setFilters(toQuestionFilter(filters))
            questionsCtx.setCurrentPage(QuestionPageType.Question)
        }}
    >INICIAR PRÁTICA</ESButton>

    return (
        <>
            <RMHeader rightElement={btnStart}/>
            <RMContainer>
                <ESRow gutter={24} style={{ marginBottom: '24px' }}>
                    <ESCol span={8}>
                        <CardSelectFilter
                            filterName="Especialidade"
                            image={iconSpecialties}
                            items={questionsCtx.allSpecialties}
                            onChange={v => {
                                questionsCtx.setSelectedSpecialties(v)
                                normalizeFiltersValues()
                            }}
                            value={questionsCtx.selectedSpecialties}
                        />
                    </ESCol>
                    <ESCol span={8}>
                        <CardSelectFilter
                            // disabled={filters.selectedSpecialties.length === 0}
                            filterName="Subespecialidade"
                            image={iconSubSpecialties}
                            items={questionsCtx.allSubSpecialties}
                            onChange={v => {
                                questionsCtx.setSelectedSubSpecialties(v)
                                normalizeFiltersValues();
                            }}
                            value={questionsCtx.selectedSubSpecialties}
                        />
                    </ESCol>
                    <ESCol span={8}>
                        <CardSelectFilter
                            filterName="Tema"
                            image={iconTheme}
                            items={questionsCtx.allTags}
                            onChange={v => {
                                questionsCtx.setSelectedTags(v)
                                normalizeFiltersValues()
                            }}
                            value={questionsCtx.selectedTags}
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
                                    defaultValue={filters.selectedState}
                                    onSelect={v => setFilters({...filters, selectedState: v})}
                                >
                                    {BRAZIL_STATES.map(s =>  <ESOption key={s.value} value={s.value}>{s.label}</ESOption>) }
                                </ESSelect>}
                            />
                        </ESCol>

                        <ESCol span={8}>
                            <RMInputContainer
                                label={'Ano'}
                                input={<ESDatePicker onPanelChange={v => { setFilters({...filters, selectedYear: v})} }
                                                     value={filters.selectedYear}
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
                                Apenas comentadas<ESSwitch onChange={ v => setFilters({...filters, isCommentedByExpert: v}) } checked={filters.isCommentedByExpert}/>
                            </div>
                        </ESCol>
                    </ESRow>
                </ESCard>
            </RMContainer>
        </>
    )
}
