import 'styled-components'

// and extend them!
declare module 'styled-components' {
    export interface FLXThemeInterface {
        colors: {
            primary: string
            secondary: string
        }
    }
}
