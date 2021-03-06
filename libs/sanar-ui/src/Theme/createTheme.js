import { createColorVariants } from './colors'

const defaultColors = {
    // default
    white: '#ffffff',
    black: '#000000',

    // brand
    primary: '#255ad0',
    secondary: '#edc26d',

    // actions
    info: '#255AD0',
    success: '#4aa62e',
    warning: '#edc26d',
    error: '#d94a4b',

    blue: ['#ADC7FF', '#4277EB', '#255AD0', '#0F44B8', '#002A85'],

    purple: ['#e1ccff', ' #905adb', '#753dc3', ' #45108f'],

    red: ['#ffbdbd', '#ff7d7d', '#d94a4b', '#a61717'],

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
        '#ffffff',
        '#f7f9fa',
        '#ebeef2',
        '#d1d9e8',
        '#bfc7d9',
        '#a4adbf',
        '#5a6275',
        '#37404f',
        '#242938',
        '#0f1117'
    ],

    white: [
        'rgba(255, 255, 255, 0.05)',
        'rgba(255, 255, 255, 0.1)',
        'rgba(255, 255, 255, 0.15)',
        'rgba(255, 255, 255, 0.25)',
        'rgba(255, 255, 255, 0.4)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(255, 255, 255, 0.65)',
        'rgba(255, 255, 255, 0.75)',
        'rgba(255, 255, 255, 0.85)',
        'rgba(255, 255, 255, 0.95)'
    ]
}

const defaultBreakpoints = [
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

const defaultBorderRadius = [2, 4]
defaultBorderRadius.sm = defaultBorderRadius[0]
defaultBorderRadius.base = defaultBorderRadius[1]

const defaultFonts = {
    default: "'Nunito Sans', sans-serif"
}

const defaultFontSizes = [10, 12, 14, 16, 20, 24, 34, 48, 60]
defaultFontSizes.xs = defaultFontSizes[0]
defaultFontSizes.sm = defaultFontSizes[1]
defaultFontSizes.md = defaultFontSizes[2]
defaultFontSizes.lg = defaultFontSizes[3]
defaultFontSizes.xl = defaultFontSizes[4]
defaultFontSizes.xxl = defaultFontSizes[5]

const defaultFontWeights = [400, 500, 700]
defaultFontWeights.regular = defaultFontWeights[0]
defaultFontWeights.medium = defaultFontWeights[1]
defaultFontWeights.bold = defaultFontWeights[2]

const defaultSpace = [0, 4, 8, 12, 16, 20, 24, 32, 48]
defaultSpace.xs = defaultSpace[2]
defaultSpace.sm = defaultSpace[3]
defaultSpace.md = defaultSpace[4]
defaultSpace.lg = defaultSpace[5]
defaultSpace.xl = defaultSpace[6]
defaultSpace.xxl = defaultSpace[7]

const defaultShadows = [
    'none',
    '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
    '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
    '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
]

const defaultZIndices = []
defaultZIndices.sidebar = 1200
defaultZIndices.modal = 1300

export const createTheme = ({
    name = 'default',
    assets = {},
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
}) => {
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
        (prev, [key, val]) => ({
            up: {
                ...prev.up,
                [key]: `@media screen and (min-width: ${val})`
            },
            down: {
                ...prev.down,
                [key]: `@media screen and (max-width: ${val - 1})`
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
        assets,

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
