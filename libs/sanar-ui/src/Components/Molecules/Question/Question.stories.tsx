import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import ESQuestion from './Question'

const question = {
    id: 'id-question-1',
    images: {
        data: [
            {
                sizedImages: {
                    small: {
                        width: 665,
                        height: 429,
                        url:
                            'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg'
                    },
                    medium: {
                        width: 665,
                        height: 429,
                        url:
                            'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg'
                    },
                    large: {
                        width: 665,
                        height: 429,
                        url:
                            'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg'
                    }
                }
            }
        ]
    },
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
    institution: {
        id: 'id-instituition-ufba',
        name: 'Ufba'
    },
    alternatives: {
        data: [
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
}

const comment = {
    id: '5c49fedaf7d3a400265ec0dd',
    text:
        'Os enunciados das questões de ECG são tão importantes quanto o próprio traçado. Numa paciente tabagista e diabética com precordialgia irradiada para membro superior esquerdo e náuseas, o que esperamos do ECG? Síndrome Coronariana Aguda! ECG com supradesnivelamento em DII, DIIII e AVR? Parede inferior! Mas calma lá...Além disso, temos infradesnivelamento em D1 + aVL (parede lateral alta) e em precordiais, mais evidente em V1, V2 e V3. O que isso pode ser? Uma imagem em espelho da parede posterior. Idealmente precisaríamos complementar o ECG com as derivações V7 e V8 (e também V3R+V4R, para avaliar acometimento de VD, já que estamos diante de um IAMCSST de parede inferior). Qual a provável artéria acometida? Coronária Direita! Resposta: letra A.',
    user: {
        name: 'San Holo',
        profile_picture:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    },
    labels: 'expert',
    time: '2018-08-07T08:40:51.620Z'
}

const Example = () => {
    const [currentQuestion, setCurrentQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [loading, setLoading] = useState(true)
    const [especialist, setEspecialist] = useState()

    useEffect(() => {
        setTimeout(() => {
            setCurrentQuestion(question)
            setLoading(false)
        }, 1000)
    }, [])

    const handleConfirm = id => {
        setLoading(true)
        setTimeout(() => {
            setAnswer(`id-alternative-${Math.floor(Math.random() * 4)}`)
            setEspecialist(comment)
            setLoading(false)
        }, 1000)
    }

    const handleNext = () => fetch()

    const handleJump = () => fetch()

    const fetch = () => {
        setLoading(true)
        setTimeout(() => {
            setAnswer(null)
            setEspecialist(null)
            setCurrentQuestion({
                ...question,
                id: Math.floor(Math.random() * 100).toString()
            })
            setLoading(false)
        }, 1000)
    }

    return (
        <ESQuestion
            loading={loading}
            question={currentQuestion}
            answer={answer}
            comment={especialist}
            onConfirm={handleConfirm}
            onNext={handleNext}
            onJump={handleJump}
            onlyStep={boolean('Only step', false)}
        />
    )
}

storiesOf('Molecules.Question', module)
    .add('Example', () => <Example />)
    .add('Simple', () => (
        <ESQuestion question={question} loading={boolean('Loading', true)} />
    ))
