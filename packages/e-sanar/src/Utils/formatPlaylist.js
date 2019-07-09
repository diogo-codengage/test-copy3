import { sortBy, prop } from 'ramda'

export const formatPlaylist = arr => {
    const ordered = sortBy(prop('index'), arr)

    const noEmpty = ordered
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

    return noEmpty
        .map((level, index) => ({
            ...level,
            ...(noEmpty[index + 1] &&
                noEmpty[index + 1]['resource_type'] === 'Quiz' && {
                    quiz: noEmpty[index + 1].quiz
                })
        }))
        .filter((level, index) => {
            if (
                level['resource_type'] === 'Quiz' &&
                noEmpty[index - 1] &&
                noEmpty[index - 1]['resource_type'] === 'Video' &&
                index < noEmpty.length
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
