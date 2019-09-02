import { ISelectOption } from '../../../Components/ESSelect'

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

export const BRAZIL_STATES: ISelectOption[] = abreviations.sort().map(s =>
    ({
        value: s,
        label: s,
    })
)
