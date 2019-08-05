import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean, object } from '@storybook/addon-knobs'

import ESTypography from './Typography'

const variantOptions = {
    '': '',
    Subtitle1: 'subtitle1',
    Subtitle2: 'subtitle2',
    Body1: 'body1',
    Body2: 'body2',
    Caption: 'caption',
    Overline: 'overline'
}

const typeOptions = {
    Default: 'default',
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Muted: 'muted'
}

const transformOptions = {
    Initial: 'initial',
    Uppercase: 'uppercase'
}

const levelOptions = {
    '': null,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6
}

const ellipsisObject = {
    rows: 1,
    showAction: true,
    basedOn: 'letters'
}

storiesOf('Atoms.Typography', module)
    .add('Simple', () => (
        <ESTypography
            delete={boolean('Delete', false)}
            disabled={boolean('Disabled', false)}
            ellipsis={object('Ellipsis', ellipsisObject)}
            strong={boolean('Strong', false)}
            regular={boolean('Regular', false)}
            level={select('Level', levelOptions, '')}
            type={select('Type', typeOptions, 'default')}
            variant={select('Variant', variantOptions, undefined)}
            transform={select('Transform', transformOptions, undefined)}
        >
            Every year, I took a holiday. I went to Florence, this cafe on the
            banks of the Arno. Every fine evening, I would sit there and order a
            Fernet Branca. I had this fantasy, that I would look across the
            tables and I would see you there with a wife maybe a couple of kids.
            You wouldn't say anything to me, nor me to you. But we would both
            know that you've made it, that you were happy. I never wanted you to
            come back to Gotham. I always knew there was nothing here for you
            except pain and tragedy and I wanted something more for you than
            that. I still do.
        </ESTypography>
    ))
    .add('Dark', () => (
        <ESTypography type='light'>Another text in dark mode</ESTypography>
    ))
