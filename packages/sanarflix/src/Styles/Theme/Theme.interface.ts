import 'styled-components'

// and extend them!
declare module 'styled-components' {
    export interface FLXThemeInterface {
        colors: {
            primary: string
            secondary: string
        }
        margins: {
            xxs: string
            xs: string
            sm: string
            md: string
            lg: string
            xl: string
            xxl: string
        }
        paddings: {
            xxs: string
            xs: string
            sm: string
            md: string
            lg: string
            xl: string
            xxl: string
        }
    }
}
