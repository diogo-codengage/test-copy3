const pad = number => (number < 10 ? `0${number}` : number)

const esConvertSecondsToTime = seconds => {
    let hour = Math.floor(seconds / 3600)
    let min = Math.floor((seconds - hour * 3600) / 60)
    seconds = seconds - hour * 3600 - min * 60
    seconds = Math.round(seconds * 100) / 100

    return `${pad(hour)}:${pad(min)}:${pad(seconds)}`
}

export default esConvertSecondsToTime
