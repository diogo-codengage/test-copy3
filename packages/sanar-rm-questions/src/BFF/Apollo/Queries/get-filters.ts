import gql from 'graphql-tag'

export const GET_INSTITUTIONS= gql`
query {
  institutions (limit: 1000) {
    data {
        value: id
        label: name
    }
  }
}
`

export const GET_TAGS = gql`
    {
        tags {
            data {
                value:id,
                label: name
            }
        }
    }`

export const GET_SPECIALTIES_WITH_TAGS = gql`
    {
        specialties: specialties {
            data {
                ...specialtyFragment
                parent {
                    ...specialtyFragment
                }
            }
        }

    }

    fragment specialtyFragment on Specialty {
        value: id
        label: name
        tags {
            data {
                value: id
                label: name
            }
        }
    }

`

export const GET_CATEGORIES = gql`
query {
  categories {
    data {
        value: id
        label: name
    }
  }
}
`
