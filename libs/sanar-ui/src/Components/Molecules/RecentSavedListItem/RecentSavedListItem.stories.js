import React from 'react'
import { storiesOf } from '@storybook/react'
import ESRecentSavedListItem from './RecentSavedListItem'
import { text } from '@storybook/addon-knobs'

storiesOf('Molecules.RecentSavedListItem', module).add('Simple', () => (
    <ESRecentSavedListItem
        title={text(
            'Title',
            'Legislação do Sistema Único de Saúde e Saúde Coletiva'
        )}
        description={text('Description', 'Módulo 2, aula 5')}
    />
))
