import { Tag } from './tag'

export interface Speciality {
    value: string,
    label: string,
    parent?: Speciality,
    children?: Speciality[],
    tags?: Tag[]
}
