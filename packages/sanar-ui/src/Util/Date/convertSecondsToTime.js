const pad = number => (number < 10 ? `0${number}` : number)

const esConvertSecondsToTime = seconds => {
    let min = Math.floor(seconds / 60)
    seconds = seconds - min * 60

    return `${pad(min)}:${pad(seconds)}`
}

export default esConvertSecondsToTime
