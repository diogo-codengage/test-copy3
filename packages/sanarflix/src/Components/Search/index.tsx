import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SANSearch } from '@sanar/components'

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
        if (!search || search.length < 3) return
        try {
            const {
                data: { globalSearchAux }
            } = await client.query({
                query: GET_GLOBAL_SEARCH_SUGGEST,
                variables: { limit: 5, value: search }
            })
            const data = globalSearchAux.data.map(item => ({
                ...item,
                onClick: () =>
                    history.push(`/portal/busca?pesquisa=${item.title}`)
            }))
            setItems(data)
        } catch {}
    }

    const onChange = value => {
        const valueTrim = value.trim()
        if (!valueTrim.length) {
            setItems([])
        }
        window.analytics.track(events['Content Searched'].event, {
            term: valueTrim
        })
        setValue(valueTrim)
        onSearch(valueTrim)
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
