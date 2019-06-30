import { sortBy, prop } from 'ramda'

export const formatPlaylist = arr => {
    const ordered = sortBy(prop('index'), arr)

    return ordered
        .map(level => {
            if (
                level.resource_type === 'Quiz' &&
                !level.quiz.questionItems.data.length
            ) {
                return null
            } else {
                return level
            }
        })
        .filter(level => level && level)
        .map((level, index) => ({
            ...level,
            ...(ordered[index + 1] &&
                ordered[index + 1]['resource_type'] === 'Quiz' && {
                    quiz: ordered[index + 1].quiz
                })
        }))
        .filter((level, index) => {
            if (
                level['resource_type'] === 'Quiz' &&
                ordered[index - 1] &&
                ordered[index - 1]['resource_type'] === 'Video' &&
                index < ordered.length
            ) {
                return null
            }

            return level
        })
        .map((level, index) => ({
            ...level,
            index
        }))
}
