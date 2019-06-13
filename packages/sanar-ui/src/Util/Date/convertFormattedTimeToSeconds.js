const esConvertFormattedTimeToSeconds = time => {
    let splitted = time.split(':')

    return +splitted[0] * 60 * 60 + +splitted[1] * 60 + +splitted[2]
}

export default esConvertFormattedTimeToSeconds
