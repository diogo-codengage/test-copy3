import styled, {
    ThemedStyledInterface,
    StyledComponent
} from 'styled-components'

import logoAssets from 'Assets/images/brand/sanar.svg'
import {
    typeIconPrimaryBook,
    typeIconPrimaryFile,
    typeIconPrimaryFlowchart,
    typeIconPrimaryMentalchart,
    typeIconPrimaryQuestion,
    typeIconPrimaryVideo,
    typeIconPrimaryCourse,
    logoLight,
    logoDark,
    changePassword,
    error404,
    error500,
    errorGeneric,
    question,
    flowchart,
    mentalmap,
    article,
    document,
    lessonResultSuccess,
    lessonResultError,
    blocked
} from 'Assets'

import { createColorVariants } from './colors'

export const defaultColors = {
    // default
    black: '#000000',

    // brand
    primary: '#255ad0',
    'primary-1': '#d6fff4',
    'primary-2': '#9ef0da',
    'primary-3': '#4bcca9',
    'primary-4': '#099e76',
    'primary-5': '#066b50',

    secondary: '#edc26d',

    // actions
    info: '#255AD0',
    success: '#4aa62e',
    warning: '#edc26d',
    error: '#d94a4b',

    blue: ['#ADC7FF', '#4277EB', '#255AD0', '#0F44B8', '#002A85'],

    purple: ['#e1ccff', ' #905adb', '#753dc3', ' #45108f'],

    red: ['#ffbdbd', '#ff7d7d', '#d94a4b', '#a61717', '#f7d4d4', '#FDF6F6'],

    burgundy: ['#ffdbe7', '#ba5677', '#882445', '#6e1230'],

    yellow: ['#ffdf78', '#e6b33e', '#cc8b23'],

    gold: ['#ffebc2', '#edc26d', '#a1741a', '#6e4b07'],

    green: ['#c4fcb3', '#82d968', '4aa62e', '#337320'],

    'pool-green': ['#acfae9', '#5cedce', '#0ea181', '#006e56'],

    grey: [
        'rgba(17, 19, 23, 0.05)',
        'rgba(17, 19, 23, 0.1)',
        'rgba(17, 19, 23, 0.15)',
        'rgba(17, 19, 23, 0.25)',
        'rgba(17, 19, 23, 0.4)',
        'rgba(17, 19, 23, 0.5)',
        'rgba(17, 19, 23, 0.65)',
        'rgba(17, 19, 23, 0.75)',
        'rgba(17, 19, 23, 0.85)',
        'rgba(17, 19, 23, 0.95)'
    ],

    'grey-solid': [
        '#ffffff', // 0
        '#f7f9fa', // 1
        '#ebeef2', // 2
        '#d1d9e8', // 3
        '#bfc7d9', // 4
        '#a4adbf', // 5
        '#5a6275', // 6
        '#37404f', // 7
        '#242938', // 8
        '#0f1117' // 9
    ],

    white: [
        'rgba(255, 255, 255, 0.05)', // 0
        'rgba(255, 255, 255, 0.1)', // 1
        'rgba(255, 255, 255, 0.15)', // 2
        'rgba(255, 255, 255, 0.25)', // 3
        'rgba(255, 255, 255, 0.4)', // 4
        'rgba(255, 255, 255, 0.5)', // 5
        'rgba(255, 255, 255, 0.65)', // 6
        'rgba(255, 255, 255, 0.75)', // 7
        'rgba(255, 255, 255, 0.85)', // 8
        'rgba(255, 255, 255, 0.95)', // 9
        'rgba(255, 255, 255)' // 10
    ]
}

const defaultBreakpoints: any = [
    '480px',
    '576px',
    '768px',
    '992px',
    '1200px',
    '1600px'
]
defaultBreakpoints.xs = defaultBreakpoints[0]
defaultBreakpoints.sm = defaultBreakpoints[1]
defaultBreakpoints.md = defaultBreakpoints[2]
defaultBreakpoints.lg = defaultBreakpoints[3]
defaultBreakpoints.xl = defaultBreakpoints[4]
defaultBreakpoints.xxl = defaultBreakpoints[5]

const defaultBorderRadius: any = ['2px', '4px']
defaultBorderRadius.sm = defaultBorderRadius[0]
defaultBorderRadius.base = defaultBorderRadius[1]

const defaultFonts = {
    default: "'Nunito Sans', sans-serif"
}

const defaultFontSizes: any = [
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
    '34px',
    '48px',
    '60px'
]
defaultFontSizes.xs = defaultFontSizes[0]
defaultFontSizes.sm = defaultFontSizes[1]
defaultFontSizes.md = defaultFontSizes[2]
defaultFontSizes.lg = defaultFontSizes[3]
defaultFontSizes.xl = defaultFontSizes[4]
defaultFontSizes.xxl = defaultFontSizes[5]

const defaultFontWeights: any = [400, 500, 700]
defaultFontWeights.regular = defaultFontWeights[0]
defaultFontWeights.medium = defaultFontWeights[1]
defaultFontWeights.bold = defaultFontWeights[2]

const defaultSpace: any = [
    '0px', // 0
    '4px', // 1
    '8px', // 2
    '12px', // 3
    '16px', // 4
    '20px', // 5
    '24px', // 6
    '32px', // 7
    '48px', // 8
    '60px' // 9
]

defaultSpace.xxs = defaultSpace[1]
defaultSpace.xs = defaultSpace[2]
defaultSpace.sm = defaultSpace[3]
defaultSpace.md = defaultSpace[4]
defaultSpace.lg = defaultSpace[5]
defaultSpace.xl = defaultSpace[6]
defaultSpace.xxl = defaultSpace[7]
defaultSpace.xxxl = defaultSpace[8]

const defaultShadows = [
    'none',
    '0px 1px 2px rgba(17, 19, 23, 0.15)',
    '0px 3px 6px rgba(0, 0, 0, 0.16)'
]

const defaultZIndices: any = []
defaultZIndices.sidebar = 1200
defaultZIndices.modal = 1300

const assetsDefault = {
    logo: logoAssets,
    icons: {
        logo: {
            light: logoLight,
            dark: logoDark
        },
        auth: {
            changePassword
        },
        errors: {
            error404,
            error500,
            errorGeneric
        }
    },
    cardCourseModuleThumbs: {
        flowchart,
        mentalmap,
        article,
        document,
        question
    },
    cardSubSpecialty: {
        blocked
    },
    typeIcons: {
        primary: {
            book: typeIconPrimaryBook,
            file: typeIconPrimaryFile,
            flowchart: typeIconPrimaryFlowchart,
            mentalmap: typeIconPrimaryMentalchart,
            question: typeIconPrimaryQuestion,
            video: typeIconPrimaryVideo,
            course: typeIconPrimaryCourse
        }
    },
    lessonResult: {
        success: lessonResultSuccess,
        error: lessonResultError
    }
}

export const createTheme = ({
    name = 'default',
    assets,
    colors = {},
    breakpoints = defaultBreakpoints,
    borderRadius = defaultBorderRadius,
    fonts = defaultFonts,
    fontSizes = defaultFontSizes,
    lineHeightScale = 4,
    fontWeights = defaultFontWeights,
    space = defaultSpace,
    shadows = defaultShadows,
    zIndices = defaultZIndices,
    ...rest
}: any) => {
    // merge colors with base colors
    colors = {
        ...defaultColors,
        ...colors
    }

    // create palette variations
    const palette = {
        primary: createColorVariants(colors.primary),
        secondary: createColorVariants(colors.secondary),
        info: createColorVariants(colors.info),
        success: createColorVariants(colors.success),
        warning: createColorVariants(colors.warning),
        error: createColorVariants(colors.error),
        neutral: {
            main: defaultColors.grey[7],
            dark: defaultColors.grey[8],
            light: defaultColors.grey[5]
        }
    }

    // add color variations
    colors.primaryLight = palette.primary.light
    colors.primaryDark = palette.primary.dark
    colors.secondaryLight = palette.secondary.light
    colors.secondaryDark = palette.secondary.dark
    colors.infoLight = palette.info.light
    colors.infoDark = palette.info.dark
    colors.successLight = palette.success.light
    colors.successDark = palette.success.dark
    colors.warningLight = palette.warning.light
    colors.warningDark = palette.warning.dark
    colors.errorLight = palette.error.light
    colors.errorDark = palette.error.dark

    const mediaQueries = Object.entries(breakpoints).reduce(
        (prev, [key, val]): any => ({
            up: {
                ...prev.up,
                [key]: `@media screen and (min-width: ${val})`
            },
            down: {
                ...prev.down,
                [key]: `@media screen and (max-width: ${val})`
            }
        }),
        {
            up: {},
            down: {}
        }
    )

    return {
        // theme name,
        name,

        // theme assets
        assets: {
            ...assetsDefault,
            ...assets,
            icons: {
                ...assetsDefault.icons,
                ...(!!assets && assets.icons && assets.icons)
            }
        },

        // colors
        colors,

        // color palette
        palette,

        // font family
        fonts,

        // font size
        fontSizes,

        // line height scale
        lineHeightScale,

        // font weight
        fontWeights,

        // margin and padding
        space,

        // media querys
        breakpoints,

        // border radius
        radii: borderRadius,

        // shadows
        shadows,

        // mediaQueries
        mediaQueries,

        // zIndex
        zIndices,

        // other theme props
        ...rest
    }
}

type Theme = {
    name: string
    colors: (typeof defaultColors) | any
    breakpoints: typeof defaultBreakpoints
    borderRadius: typeof defaultBorderRadius
    fonts: typeof defaultFonts
    fontSizes: typeof defaultFontSizes
    fontWeights: typeof defaultFontWeights
    space: typeof defaultSpace
    shadows: typeof defaultShadows
    zIndices: typeof defaultZIndices
} & { [key: string]: any }

export type SANElement<T> = StyledComponent<React.FC<T>, Theme>

export const SANStyled = styled as ThemedStyledInterface<Theme>
