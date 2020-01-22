import gql from 'graphql-tag'

export interface IOwner {
    value: string
    label: string
}

export interface IInstitutionsQuery {
    institutions: IOwner[]
}

export interface ICategoriesQuery {
    questionCategories: IOwner[]
}

export interface IMedResidencyCourseQuery {
    medResidencyCourses: IOwner[]
}

export interface IMedProfessionalSpecialtyQuery {
    medProfessionalSpecialties: IOwner[]
}

export interface IMedUniversitiesQuery {
    medUniversities: IOwner[]
}

export interface ISupplementaryItemsQuery
    extends IInstitutionsQuery,
        ICategoriesQuery,
        IMedResidencyCourseQuery,
        IMedProfessionalSpecialtyQuery,
        IMedUniversitiesQuery {}

export const GET_SUPPLEMENTARY_ITEMS = gql`
    {
        institutions {
            value: id
            label: name
        }
        questionCategories {
            value: id
            label: name
        }
        medResidencyCourses {
            value: id
            label: name
        }
        medProfessionalSpecialties {
            value: id
            label: name
        }
        medUniversities {
            value: id
            label: name
        }
    }
`
