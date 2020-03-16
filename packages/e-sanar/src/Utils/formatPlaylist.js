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
        .filter((level) => {
            if (level['resource_type'] === 'Quiz' && !level['display']) {
                return null
            }

            return level
        })
        .map((level, index) => ({
            ...level,
            index
        }))
}
