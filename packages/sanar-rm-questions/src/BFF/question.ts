interface Alternative {
    id: string
    correct: boolean
}

interface AlternativeList {
    data: Alternative[]
}

interface Comment {
    labels: string
}

interface CommentList {
    data: Comment[]
}

export interface Question {
    id: string
    statement: string
    alternatives: AlternativeList
    comments: CommentList
}
