import React, { useEffect, useState } from 'react'

import ESCardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
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

import { useQuestionsContext } from '../QuestionsContext'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

const RMInputContainer = ({ label, input }) =>
    <div style={
        {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }
    }>
        {label}{input}
    </div>

export const FilterTemplate = () => {

    const { width } = useWindowSize()
    const isSmall = width < 768
    const cardSpan = isSmall ? 24 : 8

    const questionsCtx = useQuestionsContext()
    const filters = questionsCtx.formFilterState
    const setFilters = questionsCtx.setFormFilterState

    const {
        specialties,
        //
        // allTags,
        allSpecialties,
        // allSubSpecialties,
        // selectedSpecialties,
        // selectedSubSpecialties,
        // setSelectedSubSpecialties,
        setSelectedTags,
        // selectedTags,
        setAllSubSpecialties,
        setAllSpecialties,
        setAllTags

    } = questionsCtx

    const [openCalendar, setOpenCalendar] = useState(false)

    const clearQuestions = () => {
        questionsCtx.setQuestions([])
        questionsCtx.setCurrentQuestion(null)
    }

    interface HasValue {
        value: string,
    }
    const distinctFilter = (value:HasValue, index: number, arr: HasValue[]): boolean => {
        const items =  arr.filter(v => v.value === value.value);
        if (items.length > 1){
            return (items[0] === value)
        }
        return true;
    }

    if (allSpecialties.length === 0) {
        setAllSpecialties(specialties
            .filter(distinctFilter)
            .sort((o1,o2) => (o1.label.localeCompare(o2.label))))
        setAllSubSpecialties(specialties.flatMap(s => s.children)
            .filter(distinctFilter)
            .sort((o1,o2) => (o1.label.localeCompare(o2.label)))
        )
        setAllTags(specialties.flatMap(s => s.tags)
            .concat(specialties.flatMap(s => s.children)
                .flatMap( s=>  s.tags))
            .filter(distinctFilter)
            .sort((o1,o2) => (o1.label.localeCompare(o2.label))))
    }

    const changeSelectedTags = (newSelectedTags) => {
        setSelectedTags(newSelectedTags);
        clearQuestions()
    }

    return <>
        <RMContainer>
            <ESRow gutter={24} style={{ marginBottom: 12 }}>
                <ESCol span={cardSpan}>
                    <ESCardSelectFilter
                        style={{marginTop: isSmall ?  20 : 0 }}
                        filterName="Especialidade"
                        image={iconSpecialties}
                        items={questionsCtx.allSpecialties}
                        onChange={v => {
                            console.log( {v} , questionsCtx.selectedSpecialties )
                            questionsCtx.setSelectedSpecialties(v)
                            clearQuestions()
                        }}
                        value={questionsCtx.selectedSpecialties}
                        labelSelecteds={ questionsCtx.selectedSpecialties.map(e => e.label).join(', ') }
                    />
                </ESCol>
                <ESCol span={cardSpan}  style={{marginTop: isSmall ?  12 : 0 }}>
                    <ESCardSelectFilter

                        filterName="Subespecialidade"
                        image={iconSubSpecialties}
                        items={questionsCtx.allSubSpecialties}
                        onChange={v => {
                            questionsCtx.setSelectedSubSpecialties(v)
                            clearQuestions()
                        }}
                        value={questionsCtx.selectedSubSpecialties}
                        labelSelecteds={ questionsCtx.selectedSubSpecialties.map(e => e.label).join(', ') }
                    />
                </ESCol>
                <ESCol span={cardSpan} style={{marginTop: isSmall ?  12 : 0 }}>
                    <ESCardSelectFilter
                        filterName="Tema"
                        image={iconTheme}
                        items={questionsCtx.allTags}
                        onChange={changeSelectedTags}
                        value={questionsCtx.selectedTags}
                        labelSelecteds={ questionsCtx.selectedTags.map(e => e.label).join(', ') }
                    />
                </ESCol>
            </ESRow>

            <ESRow style={{marginBottom: 20}}>
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

                    <ESRow gutter={24} style={{ margin: isSmall ? 0 : 60 }}>
                        <ESCol span={cardSpan}>
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
                        <ESCol span={cardSpan}>
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

                        <ESCol span={cardSpan} style={{ display: 'flex' }}>
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
            </ESRow>
        </RMContainer>
    </>
}
