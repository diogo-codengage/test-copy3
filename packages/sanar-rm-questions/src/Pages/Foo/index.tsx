import React, { useContext, useState } from 'react'
import { Query } from 'react-apollo'
import { GET_FILTERS } from '../../Apollo/Questions/get-filters'
import { FilterPage } from '../Questions/Filter/Filter'

export const FooPage = () => {

    const normalizeSpecialties = (list) => {
        list.forEach(e => e.tags = e.tags.data)
        const roots = list.filter(s => s.parent === null);
        roots.forEach(e => e.children = []);

        list.filter(s => s.parent !== null)
            .forEach(child => roots.find(r => r.value === child.parent.value).children.push(child));

        return roots
    }

    return <div>
        <Query query={GET_FILTERS}>
            {({ loading, error, data }) => {
                if(loading) return <pre>loading</pre>
                const specialties = normalizeSpecialties(data.specialties.data)
                return <FilterPage specialties={specialties} />
            }}
        </Query>
    </div>

}
