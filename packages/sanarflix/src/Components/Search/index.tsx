import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANSearch } from '@sanar/components'
import { useThrottle } from '@sanar/utils/dist/Hooks/useThrottle'

import { events } from 'Config/Segment'

import { GET_GLOBAL_SEARCH_SUGGEST } from 'Apollo/Search/Queries/global-search-suggest'

interface IProps extends RouteComponentProps {
    size?: 'large' | 'medium' | 'small'
    initialValue?: string
}

const FLXSearch = ({ size = 'medium', initialValue, history }: IProps) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const [value, setValue] = useState(initialValue)
    const [items, setItems] = useState([])

    const onSearch = async search => {
        if (!search || search.length < 4) return
        window.analytics.track(events['Content Searched'].event, {
            term: search
        })
        try {
            const {
                data: { globalSearch }
            } = await client.query({
                query: GET_GLOBAL_SEARCH_SUGGEST,
                variables: { limit: 5, value: search }
            })
            const data = globalSearch.data.map(item => ({
                ...item,
                onClick: () =>
                    history.push(`/portal/busca?pesquisa=${item.title}`)
            }))
            setItems(data)
        } catch {}
    }

    const onChange = e => {
        const value = e.target.value
        if (!value.trim()) {
            setItems([])
        }
        setValue(value)
        debounceOnSearch(value)
    }

    const seeMore = () => history.push(`/portal/busca?pesquisa=${value}`)

    const debounceOnSearch = useThrottle(onSearch, 500)

    return (
        <SANSearch
            InputProps={{
                placeholder: t('global.search'),
                size,
                value,
                onChange
            }}
            seeMore={seeMore}
            onEnter={seeMore}
            data={items}
        />
    )
}

export default withRouter(FLXSearch)
