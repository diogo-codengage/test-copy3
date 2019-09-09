import React from 'react'
import { storiesOf } from '@storybook/react'
import ESAuthTemplate from './Auth'
import { text } from '@storybook/addon-knobs'

import ESSignInForm from '../../Organisms/SignInForm'

const example = {
    description:
        'Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s',
    terms: 'Ang Lorem Ipsum ay ginagamit na modelo',
    marketing: {
        title: 'Ang Lorem Ipsum ay ginagamit na modelo',
        description:
            'Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset.',
        linkDescription: 'Ang Lorem Ipsum',
        link: '#'
    },
    image:
        'https://stmed.net/sites/default/files/blur-wallpapers-25172-8781392.jpg'
}

storiesOf('Templates.Auth', module).add(
    'Simple',
    () => (
        <ESAuthTemplate
            description={text('Description', example.description)}
            terms={text('Terms', example.terms)}
            marketing={example.marketing}
            image={example.image}
            form={
                <ESSignInForm
                    keepMeLoggedIn='Keep me logged in'
                    forgotPassword='I forgot my password'
                    login='Do Login'
                />
            }
        />
    ),
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
