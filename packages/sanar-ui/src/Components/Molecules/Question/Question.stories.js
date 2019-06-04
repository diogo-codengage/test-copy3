import React from 'react'
import { storiesOf } from '@storybook/react'
import ESQuestion from './Question'

/**
 * situation,
    answer,
    value,
    striped,
    onStripeClicked
 */

const allUnSelected = {
    title: 'Instituição porem ipsum, 2014',
    content: `Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis.
     Nulla porta risus id neque tempor, in efficitur justo imperdiet.
     Etiam a ex at ante tincidunt imperdiet. Nunc congue ex vel nisl viverra,
     sit amet aliquet lectus ullamcorper. Praesent luctus lacus non lorem elementum,
     eu tristique sapien suscipit. Sed bibendum, ipsum nec viverra malesuada,
     erat nisi sodales purus, eget hendrerit dui ligula eu enim. Ut non est nisi.
     Pellentesque tristique pretium dolor eu commodo. Proin iaculis nibh vitae lectus
     mollis bibendum. Quisque varius eget urna sit amet luctus. Suspendisse potenti.
     Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor,
     ullamcorper turpis pharetra, facilisis quam.`,
    alternatives: [
        {
            situation: 'none',
            answer: 'A',
            value:
                'Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh',
            striped: true,
            onStripeClicked: () => console.log('On Striped clicked!')
        },
        {
            situation: 'missed',
            answer: 'B',
            value:
                'Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh',
            striped: false,
            onStripeClicked: () => console.log('On Striped clicked!')
        },
        {
            situation: 'none',
            answer: 'C',
            value:
                'Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh',
            striped: true,
            onStripeClicked: () => console.log('On Striped clicked!')
        },
        {
            situation: 'none',
            answer: 'D',
            value:
                'Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh',
            striped: true,
            onStripeClicked: () => console.log('On Striped clicked!')
        },
        {
            situation: 'none',
            answer: 'E',
            value:
                'Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh',
            striped: false,
            onStripeClicked: () => console.log('On Striped clicked!')
        }
    ],
    comment: {
        author: {
            name: 'San Holo',
            avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        content: `We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully
        and efficiently.`
    }
}

storiesOf('Molecules.Question', module).add('One selected and striped', () => (
    <ESQuestion {...allUnSelected} />
))
