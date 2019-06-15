import React, { useContext, useState } from 'react'

import CardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESSelect, { ESOption } from 'sanar-ui/dist/Components/Atoms/Select'
import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'
import ESDatePicker from 'sanar-ui/dist/Components/Atoms/DatePicker'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import ESCollapse, { ESCollapsePanel } from 'sanar-ui/dist/Components/Atoms/Collapse'

import iconSpecialties from '../../../assets/images/icon-specialties.png'
import iconSubSpecialties from '../../../assets/images/icon-subspecialties.png'
import iconTheme from '../../../assets/images/icon-theme.png'
import { BRAZIL_STATES } from './brazil-states'
import { RMContainer } from '../../../Components/RMContainer'

import { IFormFilterState, QuestionPageType, useQuestionsContext } from '../QuestionsContext'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

const RMInputContainer = ({ label, input }) =>
    <div style={
        {
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }
    }>
        {label}{input}
    </div>

export const FilterTemplate = () => {

    const { width } = useWindowSize()
    const isSmall = width < 770
    const cardSpan = isSmall ? 24 : 8

    const questionsCtx = useQuestionsContext()
    const filters = questionsCtx.formFilterState
    const setFilters = questionsCtx.setFormFilterState

    const [ openCalendar, setOpenCalendar ] = useState(false);

    const clearQuestions = () => {
        questionsCtx.setQuestions([])
        questionsCtx.setCurrentQuestion(null)
    }

    const normalizeFiltersValues = () => {
        questionsCtx.allSpecialties = questionsCtx.specialties
        questionsCtx.allSubSpecialties = questionsCtx.selectedSpecialties.flatMap(s => s.children)
        questionsCtx.allTags = questionsCtx.allSpecialties.flatMap(s => s.tags).concat(
            // questionsCtx.allSubSpecialties.flatMap(s => s.children).flatMap(s => s.tags)
        )
    }

    if (questionsCtx.allSpecialties.length === 0) {
        normalizeFiltersValues()
    }

    return <>
        <RMContainer>
            <ESRow gutter={24} style={{ marginBottom: '24px' }}>
                <ESCol span={cardSpan}>
                    <CardSelectFilter
                        filterName="Especialidade"
                        image={iconSpecialties}
                        items={questionsCtx.allSpecialties}
                        onChange={v => {
                            questionsCtx.setSelectedSpecialties(v)
                            normalizeFiltersValues()
                            clearQuestions()
                        }}
                        value={questionsCtx.selectedSpecialties}
                    />
                </ESCol>
                <ESCol span={cardSpan}>
                    <CardSelectFilter
                        filterName="Subespecialidade"
                        image={iconSubSpecialties}
                        items={questionsCtx.allSubSpecialties}
                        onChange={v => {
                            questionsCtx.setSelectedSubSpecialties(v)
                            normalizeFiltersValues()
                            clearQuestions()
                        }}
                        value={questionsCtx.selectedSubSpecialties}
                    />
                </ESCol>
                <ESCol span={cardSpan}>
                    <CardSelectFilter
                        filterName="Tema"
                        image={iconTheme}
                        items={questionsCtx.allTags}
                        onChange={v => {
                            questionsCtx.setSelectedTags(v)
                            normalizeFiltersValues()
                            clearQuestions()
                        }}
                        value={questionsCtx.selectedTags}
                    />
                </ESCol>
            </ESRow>

            <ESCollapse
                accordion={true}
                onChange={keyPanelOpen => questionsCtx.setShowAdvancedFilters(keyPanelOpen === '0')}
                activeKey={questionsCtx.showAdvancedFilters ? '0' : undefined}
            >
                <ESCollapsePanel showArrow={false} header={<div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ESEvaIcon name="options-2-outline"/>
                    {questionsCtx.showAdvancedFilters ? 'Ocultar' : 'Ver'} filtros avançados
                </div>}>

                    <ESRow gutter={24} style={{ margin: 60 }}>
                        <ESCol span={8}>
                            <RMInputContainer
                                label={<label>Estado</label>}
                                input={<ESSelect
                                    style={{ width: '100%' }}
                                    defaultValue={filters.selectedState}
                                    onSelect={v => {
                                        setFilters({ ...filters, selectedState: v })
                                        clearQuestions()
                                    }}
                                >
                                    {BRAZIL_STATES.map(s => <ESOption key={s.value}
                                                                      value={s.value}>{s.label}</ESOption>)}
                                </ESSelect>}
                            />
                        </ESCol>
                        <ESCol span={8}>
                            <RMInputContainer
                                label={'Ano'}
                                input={<ESDatePicker
                                    onPanelChange={v => {
                                        setFilters({ ...filters, selectedYear: v })
                                        setOpenCalendar(false)
                                        clearQuestions()
                                    }}
                                    onClear={() => setFilters({ ...filters, selectedYear: null })}
                                    value={filters.selectedYear}
                                    showTime={{ format: 'YYYY' }}
                                    format="YYYY"
                                    mode={'year'} style={{ width: '100%' }}
                                    open={openCalendar}
                                    allowClear={false}
                                    onOpenChange={() => setOpenCalendar(true)}

                                />}
                            />
                        </ESCol>

                        <ESCol span={8} style={{ display: 'flex' }}>
                            <div style={
                                {
                                    marginTop: '20px',
                                    padding: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#F7F9FA',
                                    border: '1px solid rgba(17,19,23,0.1)',
                                    borderRadius: '4px',
                                    flexGrow: 1,
                                    height: '100%'
                                }
                            }>
                                Apenas comentadas<ESSwitch
                                onChange={v => {
                                    setFilters({ ...filters, isCommentedByExpert: v })
                                    clearQuestions()
                                }}
                                checked={filters.isCommentedByExpert}/>
                            </div>
                        </ESCol>
                    </ESRow>
                </ESCollapsePanel>
            </ESCollapse>
        </RMContainer>
    </>
}
