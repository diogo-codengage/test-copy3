interface State {
    value: string,
    label: string,
}

const abreviations = [
    'DF',
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO']

export const BRAZIL_STATES: State[] = abreviations.sort().map(s =>
    ({
        value: s,
        label: s,
    })
)
