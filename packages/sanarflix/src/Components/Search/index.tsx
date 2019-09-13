import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SANSearch } from '@sanar/components'

import { GET_GLOBAL_SEARCH } from 'Apollo/Search/Queries/global-search'

interface IProps extends RouteComponentProps {
    size?: 'large' | 'medium' | 'small'
}

const FLXSearch = ({ size = 'medium', history }: IProps) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const [value, setValue] = useState('')
    const [items, setItems] = useState([])

    const onSearch = async search => {
        if (!search || search.length < 3) return
        try {
            const {
                data: { globalSearch }
            } = await client.query({
                query: GET_GLOBAL_SEARCH,
                variables: { limit: 5, value: search }
            })
            setItems(globalSearch.data)
        } catch {}
    }

    const onChange = value => {
        if (!value.trim().length) {
            setItems([])
        }
        setValue(value.trim())
        onSearch(value.trim())
    }

    const seeMore = () => history.push(`/portal/busca?pesquisa=${value}`)

    return (
        <SANSearch
            InputProps={{
                placeholder: t('global.search'),
                size,
                value,
                onChange: e => onChange(e.target.value)
            }}
            seeMore={seeMore}
            onEnter={seeMore}
            data={items}
        />
    )
}

export default withRouter(FLXSearch)
