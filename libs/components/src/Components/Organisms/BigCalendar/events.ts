import { IEvent } from './BigCalendar'

export const events: IEvent[] = [
    {
        id: '1',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 2),
        status: 'views'
    },
    {
        id: '2',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 2),
        status: 'exams'
    },
    {
        id: '3',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 5),
        status: 'views',
        startEditable: true
    },
    {
        id: '4',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 5),
        status: 'exams',
        startEditable: true
    },
    {
        id: '5',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 6),
        status: 'views',
        startEditable: true
    },
    {
        id: '6',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '7',
        title: 'Aulas vistas',
        start: new Date(2019, 11, 6),
        status: 'views',
        startEditable: true
    },
    {
        id: '8',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '9',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '10',
        title: 'Provas e Inscrições',
        start: new Date(2019, 11, 6),
        status: 'exams',
        startEditable: true
    },
    {
        id: '11',
        title: 'Aulas não vistas',
        start: new Date(2019, 11, 4, 23, 59),
        status: 'unseen',
        startEditable: true
    },
    {
        id: '11',
        title: 'Aulas não vistas lorem ipsum',
        start: new Date(2019, 11, 26),
        status: 'unseen',
        startEditable: true
    },
    {
        id: '12',
        title: 'Live',
        start: new Date(2019, 11, 2),
        status: 'live'
    }
]
