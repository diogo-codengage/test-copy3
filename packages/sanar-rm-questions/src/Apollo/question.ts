interface Alternative {
    id: string
    correct: boolean
}

interface AlternativeList {
    data: Alternative[]
}

export interface Question {
    id: string
    statement: string
    alternatives: AlternativeList
}
