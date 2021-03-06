import React from 'react'
import { uniqBy } from 'lodash'

import ESCardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import ESCollapse, { ESCollapsePanel } from 'sanar-ui/dist/Components/Atoms/Collapse'

import iconSpecialties from '../../../assets/images/icon-specialties.png'
import iconSubSpecialties from '../../../assets/images/icon-subspecialties.png'
import iconTheme from '../../../assets/images/icon-theme.png'
import iconCategories from '../../../assets/images/icon-categories.png'

import { RMContainer } from '../../../Components/RMContainer'
import { YEARS } from './years'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'
import { ESSelect, ISelectOption } from '../../../Components/ESSelect'

import { FilterInputContainer } from './FilterInputContainer'
import { Speciality } from '../../../BFF/speciality'
import { Tag } from '../../../BFF/tag'
import { createDistinctFilter } from '../../../Util/distinct'
import { BRAZIL_STATES } from './brazil-states'

export interface IFilterTemplateProps {
  allSpecialties: Speciality[],
  allSubSpecialties: Speciality[],
  allTags: Tag[],

  setSelectedSpecialties: (values: Speciality[]) => void,
  setSelectedSubSpecialties: (values: Speciality[]) => void,
  setSelectedTags: (values: Tag[]) => void,
  setSelectedState: (value: string) => void,
  setSelectedYears: (values: ISelectOption[]) => void,
  setCommentedByExpert: (value: boolean) => void,
  setWithImagesOnly: (value: boolean) => void,

  selectedSpecialties: Speciality[],
  selectedSubSpecialties: Speciality[],
  selectedTags: Tag[],
  selectedState: string,
  selectedYears: ISelectOption[],
  isCommentedByExpert: boolean,
  withImagesOnly: boolean,

  allInstitutions: ISelectOption[]
  selectedInstitutions: ISelectOption[]
  setSelectedInstitutions: (values: ISelectOption[]) => void
  allCategories: ISelectOption[]
  selectedCategories: ISelectOption[]
  setSelectedCategories: (values: ISelectOption[]) => void

  showAdvancedFilters: boolean,
  setShowAdvancedFilters: (value: boolean) => {},
}

const sortByLabel = (o1: ISelectOption, o2: ISelectOption) => o1.label.localeCompare(o2.label)

export const FilterTemplate: React.FC<IFilterTemplateProps> = (props) => {

  const { width } = useWindowSize()
  const isSmall = width < 768
  const cardSpan = isSmall ? 24 : 6
  const filterSpan = isSmall ? 24 : 12
  const filterSpan2 = isSmall ? 24 : 8

  let placeholderInstitutions = ''
  if (props.selectedInstitutions.length === 1) {
    placeholderInstitutions = props.selectedInstitutions[0].label
  }
  if (props.selectedInstitutions.length > 1) {
    placeholderInstitutions = `${props.selectedInstitutions.length} selecionadas`
  }

  let allTags = props.allTags.filter(createDistinctFilter<Tag>(t => t.value)).sort(sortByLabel)
  let allSpecialties = props.allSpecialties.filter((value) => value.tags.length > 0)
  let allSubSpecialties = props.allSpecialties.flatMap(s => s.children).sort(sortByLabel)

  if (props.selectedTags.length > 0) {
    allSpecialties = allSpecialties.filter(v => {
      return !!v.tags.concat(v.children.flatMap(c => c.tags))
        .map(t => t.value).find(v => props.selectedTags.map(t => t.value).includes(v))
    })
  }

  if (props.selectedSpecialties.length > 0) {
    const specialtiesTags = props.selectedSpecialties.flatMap(s => s.tags)
    const childrenTags = (props.selectedSpecialties.flatMap(s => s.children)).flatMap(c => c.tags)
    allTags = uniqBy((specialtiesTags.concat(childrenTags)).sort(sortByLabel), 'value')
    allSubSpecialties = props.selectedSpecialties.flatMap(s => s.children)
  }

  const switchStyle = {
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

    return <>
        <RMContainer>
            <ESRow gutter={24} style={{ marginBottom: 12 }}>
                <ESCol span={cardSpan}>
                    <ESCardSelectFilter
                      style={{marginTop: isSmall ?  20 : 0 }}
                      filterName="Categoria de prova"
                      image={iconCategories}
                      items={props.allCategories}
                      onChange={props.setSelectedCategories}
                      value={props.selectedCategories}
                      labelSelecteds={props.selectedCategories.map(e => e.label).join(', ') }
                    />
                </ESCol>
                <ESCol span={cardSpan}>
                    <ESCardSelectFilter
                        style={{marginTop: isSmall ?  20 : 0 }}
                        filterName="Especialidade"
                        image={iconSpecialties}
                        items={allSpecialties}
                        onChange={props.setSelectedSpecialties}
                        value={props.selectedSpecialties}
                        labelSelecteds={props.selectedSpecialties.map(e => e.label).join(', ') }
                    />
                </ESCol>
                <ESCol span={cardSpan}  style={{marginTop: isSmall ?  12 : 0 }}>
                    <ESCardSelectFilter
                        filterName="Subespecialidade"
                        image={iconSubSpecialties}
                        items={allSubSpecialties}
                        onChange={props.setSelectedSubSpecialties}
                        value={props.selectedSubSpecialties}
                        labelSelecteds={ props.selectedSubSpecialties.map(e => e.label).join(', ') }
                    />
                </ESCol>
                <ESCol span={cardSpan} style={{marginTop: isSmall ?  12 : 0 }}>
                    <ESCardSelectFilter
                        filterName="Tema"
                        image={iconTheme}
                        items={allTags}
                        onChange={props.setSelectedTags}
                        value={props.selectedTags}
                        labelSelecteds={props.selectedTags.map(e => e.label).join(', ') }
                    />
                </ESCol>
            </ESRow>

      <ESRow style={{ marginBottom: 20 }}>
        <ESCollapse
          accordion={true}
          onChange={keyPanelOpen => props.setShowAdvancedFilters(keyPanelOpen === '0')}
          activeKey={props.showAdvancedFilters ? '0' : undefined}
        >
          <ESCollapsePanel showArrow={false} header={<div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ESEvaIcon name="options-2-outline"/>
            {props.showAdvancedFilters ? 'Ocultar' : 'Ver'} filtros avançados
          </div>}>
            <ESRow gutter={24} style={{ margin: isSmall ? 0 : 60 }}>
              <ESCol span={filterSpan}>
                <FilterInputContainer
                  label={'Instituição'}>
                  <ESSelect
                    isMultiple={true}
                    style={{ width: '100%' }}
                    mode={'multiple'}
                    defaultValue={props.selectedInstitutions}
                    onSelect={props.setSelectedInstitutions}
                    options={props.allInstitutions}
                    placeholder={placeholderInstitutions}
                  >
                  </ESSelect>
                </FilterInputContainer>
              </ESCol>
              <ESCol span={filterSpan}>
                <FilterInputContainer
                  label={'Ano'}>
                  <ESSelect
                    isMultiple={true}
                    style={{ width: '100%' }}
                    mode={'tags'}
                    defaultValue={props.selectedYears}
                    onSelect={props.setSelectedYears}
                    options={YEARS}
                    placeholder={props.selectedYears.map(v => v.label).join(', ')}
                  />
                </FilterInputContainer>
              </ESCol>
            </ESRow>
            <ESRow gutter={24} style={{ margin: isSmall ? 0 : 60 }}>
              <ESCol span={filterSpan2}>
                <FilterInputContainer
                  label={'Estado'}>
                  <ESSelect
                    isMultiple={false}
                    style={{ width: '100%' }}
                    onUniqSelect={props.setSelectedState}
                    options={BRAZIL_STATES}
                    placeholder={props.selectedState}
                    selected={props.selectedState}
                  >
                  </ESSelect>
                </FilterInputContainer>
              </ESCol>
              <ESCol span={filterSpan2} style={{ display: 'flex' }}>
                <div style={switchStyle}>
                  Apenas comentadas
                  <ESSwitch
                    onChange={props.setCommentedByExpert}
                    checked={props.isCommentedByExpert}
                  />
                </div>
              </ESCol>
              <ESCol span={filterSpan2} style={{ display: 'flex' }}>
                <div style={switchStyle}>
                  Apenas com imagens
                  <ESSwitch
                    onChange={props.setWithImagesOnly}
                    checked={props.withImagesOnly}
                  />
                </div>
              </ESCol>
            </ESRow>
          </ESCollapsePanel>
        </ESCollapse>
      </ESRow>
    </RMContainer>
  </>
}
