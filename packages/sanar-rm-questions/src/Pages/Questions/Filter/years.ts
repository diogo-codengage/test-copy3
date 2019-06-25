interface Year {
    value: string,
    label: string,
}

const getCurrentYear = () => {
    return new Date().getFullYear()
}

export const getYears = () => {
    const start = 2009
    const currentYear = getCurrentYear()
    const years: Array<Year> = []

    for (let i = start; i <= currentYear; i++) {
        years.push(
            {
                label: i.toString(),
                value: i.toString()
            }
        )
    }

    return years
}

export const YEARS = getYears();
