import React from 'react'
import { storiesOf } from '@storybook/react'
import ESQuestion from './Question'

const allUnSelected = {
    id: 'id-question-1',
    statement: `Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis.
    Nulla porta risus id neque tempor, in efficitur justo imperdiet.
    Etiam a ex at ante tincidunt imperdiet. Nunc congue ex vel nisl viverra,
    sit amet aliquet lectus ullamcorper. Praesent luctus lacus non lorem elementum,
    eu tristique sapien suscipit. Sed bibendum, ipsum nec viverra malesuada,
    erat nisi sodales purus, eget hendrerit dui ligula eu enim. Ut non est nisi.
    Pellentesque tristique pretium dolor eu commodo. Proin iaculis nibh vitae lectus
    mollis bibendum. Quisque varius eget urna sit amet luctus. Suspendisse potenti.
    Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor,
    ullamcorper turpis pharetra, facilisis quam.`,
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
    alternatives: [
        {
            id: 'id-alternative-1',
            text: 'Nulla facilisis commodo ante 1'
        },
        {
            id: 'id-alternative-2',
            text: 'Nulla facilisis commodo ante 2'
        },
        {
            id: 'id-alternative-3',
            text: 'Nulla facilisis commodo ante 3'
        },
        {
            id: 'id-alternative-4',
            text: 'Nulla facilisis commodo ante 4'
        },
        {
            id: 'id-alternative-5',
            text: 'Nulla facilisis commodo ante 5'
        }
    ]
}

storiesOf('Molecules.Question', module)
    .add('Not anwered and selected yet', () => (
        <ESQuestion
            {...allUnSelected}
            answered={false}
            nextText='Confirmar'
            onConfirm={() => alert('You clicked on confirm!')}
            onJump={() => alert('You clicked on jump!')}
            title='Question 1 / 999+'
        />
    ))
    .add('Anwered correctlly', () => (
        <ESQuestion
            {...allUnSelected}
            answered={true}
            selectedAlternative='id-alternative-5'
            answer='id-alternative-5'
            nextText='Confirmar'
            onConfirm={() => alert('You clicked on confirm!')}
            onJump={() => alert('You clicked on jump!')}
            title='Question 1 / 999+'
        />
    ))
    .add('Anwered wronglly', () => (
        <ESQuestion
            {...allUnSelected}
            answered={true}
            selectedAlternative='id-alternative-4'
            answer='id-alternative-5'
            nextText='Confirmar'
            onConfirm={() => alert('You clicked on confirm!')}
            onJump={() => alert('You clicked on jump!')}
            title='Question 1 / 999+'
        />
    ))
    .add('Selected only', () => (
        <ESQuestion
            {...allUnSelected}
            answered={false}
            selectedAlternative='id-alternative-4'
            nextText='Confirmar'
            onConfirm={() => alert('You clicked on confirm!')}
            onJump={() => alert('You clicked on jump!')}
            title='Question 1 / 999+'
        />
    ))
