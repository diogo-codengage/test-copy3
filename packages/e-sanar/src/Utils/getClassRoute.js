export const getClassRoute = type => {
    switch (type) {
        case 'Video':
            return 'video'
        case 'Document':
        case 'Download':
            return 'documento'
        case 'Quiz':
            return 'simulado'
        default:
            throw new Error()
    }
}
