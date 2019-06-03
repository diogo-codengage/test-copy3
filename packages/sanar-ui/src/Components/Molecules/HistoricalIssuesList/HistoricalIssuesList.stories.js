import React from 'react'
import { storiesOf } from '@storybook/react'

import ESHistoricalIssuesList from './HistoricalIssuesList'
import ESHistoricalIssuesItem from './HistoricalIssuesItem'

storiesOf('Molecules.HistoricalIssues', module).add('Simple', () => (
    <ESHistoricalIssuesList>
        {[0, 1, 2, 3, 4, 5].map(e => (
            <ESHistoricalIssuesItem
                key={e}
                title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                subtitle='Instituição porem ipsum, 2014'
            />
        ))}
    </ESHistoricalIssuesList>
))
