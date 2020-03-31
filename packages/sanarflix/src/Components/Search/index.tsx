import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANSearch } from '@sanar/components'
import { useThrottle } from '@sanar/utils/dist/Hooks/useThrottle'

import { GET_GLOBAL_SEARCH_SUGGESTIONS } from 'Apollo/Search/Queries/suggestions'

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
        try {
            const {
                data: { suggestions }
            } = await client.query({
                query: GET_GLOBAL_SEARCH_SUGGESTIONS,
                variables: { value: search }
            })
            const data = suggestions.data.map(item => ({
                ...item,
                onClick: () => {
                    window.analytics.track('Search Result Clicked', {
                        term: item.title
                    })
                    history.push(`/portal/busca?pesquisa=${item.title}`)
                }
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

    const seeMore = () => {
        if(value) {
            window.analytics.track('Content Searched', {
                term: value
            })
            
            history.push(`/portal/busca?pesquisa=${value}`)
        }
    }

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
