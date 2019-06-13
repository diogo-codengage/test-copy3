import React from 'react'
import { FilterTemplate } from './FilterTemplate'
import Query from 'react-apollo/Query'
import { GET_FILTERS } from '../../../Apollo/Questions/get-filters'
import { RMSplashLoader } from '../../../Components/RMSplashLoader'

const normalizeSpecialties = (list) => {
    list.forEach(e => e.tags = e.tags.data)
    const roots = list.filter(s => s.parent === null)
    roots.forEach(e => e.children = [])

    list.filter(s => s.parent !== null)
        .forEach(child => roots.find(r => r.value === child.parent.value).children.push(child))

    return roots
}

interface IProps {
    onStart: Function
}

export const Filter = ({onStart}:IProps) => {
    return (
        <Query query={GET_FILTERS}>
            {({ loading, error, data }) => {
                if(loading) return <RMSplashLoader />
                const specialties = normalizeSpecialties(data.specialties.data)
                return <FilterTemplate  specialties={specialties} onStart={onStart}/>
            }}
        </Query>
    )
}
