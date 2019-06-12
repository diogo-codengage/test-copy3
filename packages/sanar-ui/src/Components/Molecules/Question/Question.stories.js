import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'

import ESQuestion from './Question'

const question = {
    id: 'id-question-1',
    image:
        'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg',
    statement:
        'Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet. Etiam a ex at ante tincidunt imperdiet. Nunc congue ex vel nisl viverra, sit amet aliquet lectus ullamcorper. Praesent luctus lacus non lorem elementum, eu tristique sapien suscipit. Sed bibendum, ipsum nec viverra malesuada, erat nisi sodales purus, eget hendrerit dui ligula eu enim. Ut non est nisi. Pellentesque tristique pretium dolor eu commodo. Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit amet luctus. Suspendisse potenti. Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor, ullamcorper turpis pharetra, facilisis quam.',
    year: 2019,
    observation: 'Vestibulum magna urna, sagittis sit amet magna id',
    type: 'radiobox',
    difficulty: {
        level: 1,
        name: 'low'
    },
    instituition: {
        id: 'id-instituition-ufba',
        name: 'Ufba'
    },
    comment: {
        author: {
            name: 'San Holo',
            avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        content:
            'Mauris imperdiet orci dapibus, commodo libero nec, interdum tortor. Morbi in nibh faucibus, iaculis lorem vitae, cursus velit. Etiam non blandit ex. Mauris in fringilla velit. Fusce eu dictum neque. Maecenas tristique sem neque, vel congue libero efficitur at. Cras molestie ipsum at sem sollicitudin consectetur.',
        time: 'Há 24 dias'
    },
    alternatives: [
        {
            id: 'id-alternative-0',
            text:
                'In consequat, quam id sodales hendrerit, eros mi molestie leo, nec lacinia risus neque tristique augue.'
        },
        {
            id: 'id-alternative-1',
            text:
                'In consequat, quam id sodales hendrerit, eros mi molestie leo, nec lacinia risus neque tristique augue.'
        },
        {
            id: 'id-alternative-2',
            text:
                'In consequat, quam id sodales hendrerit, eros mi molestie leo, nec lacinia risus neque tristique augue.'
        },
        {
            id: 'id-alternative-3',
            text:
                'In consequat, quam id sodales hendrerit, eros mi molestie leo, nec lacinia risus neque tristique augue.'
        }
    ]
}

const Example = () => {
    const [currentQuestion, setCurrentQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setCurrentQuestion(question)
            setLoading(false)
        }, 2000)
    }, [])

    const handleConfirm = () => {
        setLoading(true)
        setTimeout(() => {
            setAnswer(`id-alternative-${Math.floor(Math.random() * 4)}`)
            setLoading(false)
        }, 3000)
    }

    const handleNext = () => fetch()

    const handleJump = () => fetch()

    const fetch = () => {
        setLoading(true)
        setTimeout(() => {
            setAnswer()
            setCurrentQuestion({
                ...question,
                id: Math.floor(Math.random() * 100).toString()
            })
            setLoading(false)
        }, 3000)
    }

    return (
        <ESQuestion
            loading={loading}
            question={currentQuestion}
            answer={answer}
            onConfirm={handleConfirm}
            onNext={handleNext}
            onJump={handleJump}
            onlyStep={boolean('Only step', false)}
        />
    )
}

storiesOf('Molecules.Question', module)
    .add('Example', () => <Example />)
    .add('Not anwered and selected yet', () => (
        <ESQuestion
            question={question}
            answered={false}
            onConfirm={action('You clicked on confirm!')}
            onNext={action('You clicked on confirm!')}
            onJump={action('You clicked on jump!')}
        />
    ))
    .add('Anwered correctlly', () => (
        <ESQuestion
            question={question}
            answered={true}
            selectedAlternative='id-alternative-3'
            answer='id-alternative-3'
            onConfirm={action('You clicked on confirm!')}
            onJump={action('You clicked on jump!')}
        />
    ))
    .add('Anwered wronglly', () => (
        <ESQuestion
            question={question}
            answered={true}
            selectedAlternative='id-alternative-4'
            answer='id-alternative-3'
            onConfirm={action('You clicked on confirm!')}
            onJump={action('You clicked on jump!')}
        />
    ))
    .add('Selected only', () => (
        <ESQuestion
            question={question}
            answered={false}
            selectedAlternative='id-alternative-4'
            onConfirm={action('You clicked on confirm!')}
            onJump={action('You clicked on jump!')}
        />
    ))
