import React from 'react'
import { storiesOf } from '@storybook/react'
import ESHelpCenterTemplate from './HelpCenter'
import { select, boolean } from '@storybook/addon-knobs'

const helpKnobs = {
    bordered: true,
    accordion: false,
    positionOptions: {
        Left: 'left',
        Right: 'right'
    },
    placeholder: 'Como podemos ajudar?'
}


storiesOf('Templates.HelpCenter', module).add(
    'Simple',
    () => <ESHelpCenterTemplate 
        bordered={boolean('Bordered', helpKnobs.bordered)}
        accordion={boolean('Accordion', helpKnobs.accordion)}
        expandIconPosition={select(
            'Expand Icon Position',
            helpKnobs.positionOptions,
            'right'
        )}
        placeholder={helpKnobs.placeholder}
    />,
    {
        style: {
            padding: 0,
            height: '100%'
        }
    }
)
