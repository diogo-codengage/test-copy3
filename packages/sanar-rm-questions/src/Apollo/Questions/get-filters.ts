import gql from 'graphql-tag'


export const GET_FILTERS = gql`
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
