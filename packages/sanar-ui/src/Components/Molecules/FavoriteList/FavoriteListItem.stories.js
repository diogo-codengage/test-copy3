import React from 'react'
import { storiesOf } from '@storybook/react'

import ESFavoriteList from './FavoriteList'
import ESFavoriteListItem from './FavoriteItem'

import documentImage from '../../../assets/images/favorite-items/document.png'
import questionImage from '../../../assets/images/favorite-items/question.svg'
import videoImage from '../../../assets/images/favorite-items/video.png'

storiesOf('Molecules.Favorites', module)
    .add('Video', () => (
        <ESFavoriteList>
            {[0, 1, 2, 3, 4, 5].map(e => (
                <ESFavoriteListItem
                    key={e}
                    title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                    subtitle='Instituição porem ipsum, 2014'
                    extra={() => console.log('action clicked')}
                    extraIcon='trash-outline'
                    image={videoImage}
                    icon='play-circle-outline'
                />
            ))}
        </ESFavoriteList>
    ))
    .add('Document', () => (
        <ESFavoriteList>
            {[0, 1, 2, 3, 4, 5].map(e => (
                <ESFavoriteListItem
                    key={e}
                    title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                    subtitle='Instituição porem ipsum, 2014'
                    extra={() => console.log('action clicked')}
                    extraIcon='trash-outline'
                    image={documentImage}
                    icon='book-open-outline'
                />
            ))}
        </ESFavoriteList>
    ))
    .add('Question', () => (
        <ESFavoriteList>
            {[0, 1, 2, 3, 4, 5].map(e => (
                <ESFavoriteListItem
                    key={e}
                    title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                    subtitle='Instituição porem ipsum, 2014'
                    extra={() => console.log('action clicked')}
                    extraIcon='trash-outline'
                    image={questionImage}
                    icon='edit-outline'
                />
            ))}
        </ESFavoriteList>
    ))
