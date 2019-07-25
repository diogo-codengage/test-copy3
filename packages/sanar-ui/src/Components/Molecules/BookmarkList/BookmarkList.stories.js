import React from 'react'
import { storiesOf } from '@storybook/react'

import ESBookmarkList from './BookmarkList'
import ESBookmarkListItem from './BookmarkListItem'

import documentImage from '../../../assets/images/favorite-items/document.png'
import questionImage from '../../../assets/images/favorite-items/question.svg'
import videoImage from '../../../assets/images/favorite-items/video.png'

storiesOf('Molecules.Favorites', module)
    .add('Video', () => (
        <ESBookmarkList>
            {[0, 1, 2, 3, 4, 5].map(e => (
                <ESBookmarkListItem
                    key={e}
                    title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                    subtitle='Instituição porem ipsum, 2014'
                    extra={() => console.log('action clicked')}
                    extraIcon='trash-outline'
                    image={videoImage}
                    icon='play-circle-outline'
                    onRemove={() => console.log('remove clicked')}
                />
            ))}
        </ESBookmarkList>
    ))
    .add('Document', () => (
        <ESBookmarkList>
            {[0, 1, 2, 3, 4, 5].map(e => (
                <ESBookmarkListItem
                    key={e}
                    title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                    subtitle='Instituição porem ipsum, 2014'
                    extra={() => console.log('action clicked')}
                    extraIcon='trash-outline'
                    image={documentImage}
                    icon='book-open-outline'
                    onRemove={() => console.log('remove clicked')}
                />
            ))}
        </ESBookmarkList>
    ))
    .add('Question', () => (
        <ESBookmarkList>
            {[0, 1, 2, 3, 4, 5].map(e => (
                <ESBookmarkListItem
                    key={e}
                    title='Duis mauris augue, efficitur eu arcu sit amet'
                    subtitle='Instituição porem ipsum, 2014'
                    extra={() => console.log('action clicked')}
                    extraIcon='trash-outline'
                    image={questionImage}
                    icon='edit-outline'
                    onRemove={() => console.log('remove clicked')}
                />
            ))}
        </ESBookmarkList>
    ))
