module.exports = {
    // Colors
    '@normal-color': '#d9d9d9',

    // Typography
    '@font-size-base': '14px',
    '@font-size-xs': '@font-size-base - 4px',
    '@heading-4-size': 'ceil(@font-size-base * 1.42)',

    // Spacing
    '@padding-lg': '24px',
    '@padding-md': '16px',
    '@padding-sm': '12px',
    '@padding-xs': '8px',
    '@margin-lg': '@padding-lg',
    '@margin-md': '@padding-md',
    '@margin-sm': '@padding-sm',
    '@margin-xs': '@padding-xs',

    // Media queries breakpoints
    // Extra small screen / phone
    '@screen-xs': '480px',
    '@screen-xs-min': '@screen-xs',

    // Small screen / tablet
    '@screen-sm': '576px',
    '@screen-sm-min': '@screen-sm',

    // Medium screen / desktop
    '@screen-md': '768px',
    '@screen-md-min': '@screen-md',

    // Large screen / wide desktop
    '@screen-lg': '992px',
    '@screen-lg-min': '@screen-lg',

    // Extra large screen / full hd
    '@screen-xl': '1200px',
    '@screen-xl-min': '@screen-xl',

    // Extra extra large screen / large desktop
    '@screen-xxl': '1600px',
    '@screen-xxl-min': '@screen-xxl',

    '@screen-xs-max': '@screen-sm-min - 1px)',
    '@screen-sm-max': '@screen-md-min - 1px)',
    '@screen-md-max': '@screen-lg-min - 1px)',
    '@screen-lg-max': '@screen-xl-min - 1px)',
    '@screen-xl-max': '@screen-xxl-min - 1px'
}
