declare module 'config' {
    global {
        interface Window {
            analytics: any
            sanarflix_user_name: string | null | undefined
            sanarflix_user_email: string | null | undefined
            Conpass: any
        }
    }
}
