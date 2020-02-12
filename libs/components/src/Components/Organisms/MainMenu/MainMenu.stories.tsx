import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, number, select } from '@storybook/addon-knobs'

import { SANLeftOff } from './LeftOff'

// Images
import questionImage from 'Assets/images/course-items/question.svg'
import mentalmapImage from 'Assets/images/course-items/mental-map.svg'
import flowchartImage from 'Assets/images/course-items/flow.svg'
import articleImage from 'Assets/images/course-items/article.svg'
import documentImage from 'Assets/images/course-items/document.svg'

const LeftOffExample = ({ resourceType, type }) => {
    const configureThumbnail = (type, resourceType) => {
        switch (resourceType) {
            case 'Video':
                return 'https://cdn.jwplayer.com/thumbs/eqXRiD4T-720.jpg'
            case 'Question':
                return questionImage
            case 'Document':
                switch (type) {
                    case 'mentalmap':
                        return mentalmapImage
                    case 'flowchart':
                        return flowchartImage
                    case 'article':
                        return articleImage
                    default:
                        return documentImage
                }
            default:
                return documentImage
        }
    }

    return (
        <div style={{ width: 320 }}>
            <SANLeftOff
                label={text('Label', 'This is a label')}
                onClick={console.log}
                title={text('Title', 'This is a title')}
                resourceType={resourceType}
                thumbnail={configureThumbnail(type, resourceType)}
                classReference={text('Class Reference', 'Class 1')}
                moduleReference={text('Module Reference', 'Module 1')}
            />
        </div>
    )
}

const resourceTypeOptions: any = {
    Video: 'Video',
    Document: 'Document',
    Question: 'Question'
}

const typeOptions: any = {
    Resume: 'resume',
    Mentalmap: 'mentalmap',
    Flowchart: 'flowchart',
    Article: 'article',
    Lesson: 'lesson',
    Question: 'question'
}

storiesOf('Organisms.MainMenu', module).add(
    'LeftOff',
    () => {
        return (
            <LeftOffExample
                resourceType={select(
                    'Resource Type',
                    resourceTypeOptions,
                    resourceTypeOptions.Question
                )}
                type={select('Type', typeOptions, typeOptions.Question)}
            />
        )
    },
    {
        style: {
            background: '#7A2044'
        }
    }
)
