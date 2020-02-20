import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import SANChat from './Chat'

const arr = new Array(100).fill(1).map(e => {
    let date = new Date()
    date.setHours(19)
    date.setMinutes(17)

    return {
        name: 'Sandra Gibson',
        message: 'Mauris imperdiet orci dapibus, commodo libero nec.',
        time: date.toString()
    }
})

const Example = () => {
    const [messages, setMessages] = useState(arr)
    const [value, setValue] = useState('')

    const handleSetValue = (val, { setSubmitting }) => {
        setTimeout(() => {
            setValue(val)
            setSubmitting(false)
        }, 500)
    }

    const loadMore = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                setMessages(old => [
                    ...old,
                    {
                        name: 'Fetch people',
                        message: 'Carregamento',
                        time: new Date().toString()
                    }
                ])
                resolve()
            }, 100)
        })
    }

    useEffect(() => {
        if (!!value.trim()) {
            setMessages(old => [
                ...old,
                {
                    name: 'Diogo Biz',
                    message: value,
                    time: new Date().toString()
                }
            ])
        }
    }, [value])

    return (
        <SANChat
            blocked={boolean('Blocked', false)}
            loading={boolean('Loading', false)}
            messages={messages}
            onSend={handleSetValue}
            loadMore={loadMore}
            hasMore={false}
        />
    )
}

storiesOf('Organisms.Chat', module).add('Simple', () => <Example />, {
    style: {
        background: '#FFFF',
        width: 272,
        margin: '0 auto'
    }
})
