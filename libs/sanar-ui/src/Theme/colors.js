import { tint, shade } from 'polished'

export const getColorVariantLight = (main, percentage = 0.6) =>
    tint(percentage, main)

export const getColorVariantDark = (main, percentage = 0.4) =>
    shade(percentage, main)

export const createColorVariants = main => ({
    main,
    light: getColorVariantLight(main),
    dark: getColorVariantDark(main)
})
