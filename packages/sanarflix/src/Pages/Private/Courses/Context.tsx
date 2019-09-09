import React, { useContext, createContext, useState } from 'react'

import { ICompletenessFiltersValues } from 'Components/CompletenessFilters'

interface IFLXCoursesProviderValue {
    completenessFilter: ICompletenessFiltersValues
    onChangeCompletenessFilters: (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => void
}

const Context = createContext<IFLXCoursesProviderValue>({} as any)
export const useCoursesContext = () => useContext(Context)

const FLXCoursesProvider: React.FC = ({ children }) => {
    const [completenessFilter, setCompletenessFilter] = useState<
        ICompletenessFiltersValues
    >('all')

    const onChangeCompletenessFilters = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => setCompletenessFilter(e.target.value as ICompletenessFiltersValues)

    const value: IFLXCoursesProviderValue = {
        completenessFilter,
        onChangeCompletenessFilters
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXCoursesProvider
