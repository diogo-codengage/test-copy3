import React, { useEffect, useState } from 'react'
import { QuestionsPageProvider } from './QuestionsPageProvider'
import { VideoParams } from './QuestionsContext'
import { RMSplashLoader } from '../../Components/RMSplashLoader'
import { BFFService } from '../../BFF/BFFService'
import { toCorrelacaoTagName } from '../../Util/corelacaoEntrePlataformas'
import { normalizeString } from '../../Util/normalizeString'

const normalizeEndCompare = (o1: string, o2: string) =>{
    return  normalizeString(o1) === normalizeString(o2)
}

interface IProps {
    course?: VideoParams
}

export const QuestionsPage:React.FC<IProps> = (props) => {

    const [allSpecialties, setAllSpecialties ] = useState();
    const [allTags, setAllTags ] = useState()
    const [allInstitutions, setAllInstitutions] = useState()
    const [allCategories, setAllCategories] = useState()

    useEffect(() => {
        BFFService.getSpecialties().then((specialties) => {
            setAllSpecialties(specialties)
            setAllTags(specialties.flatMap(s => s.tags).concat( specialties
                .flatMap(s => s.children).flatMap(s => s.tags)));
        })
        BFFService.getInstitutions().then(setAllInstitutions)
        BFFService.getCategories().then(setAllCategories)
    }, [])

    if( !!allSpecialties && !!allTags ) {
        const selectedSpecialties = [];
        const selectedSubSpecialties = [];
        const selectedTags = [];
        const selectedCategories = [];

        if(props.course){
            const specialty = allSpecialties
                .find(v => normalizeEndCompare(v.label, props.course.specialtyName))
            if(specialty) {
                selectedSpecialties.push(specialty)
            }

            const subSpecialty = allSpecialties.flatMap(s => s.children)
                .find(v => normalizeEndCompare(v.label, props.course.subSpecialtyName))
            if(subSpecialty) {
                selectedSubSpecialties.push(subSpecialty)
            }

            const tag = allTags
                .find(t => normalizeEndCompare(t.label, toCorrelacaoTagName(props.course.moduleName)))
            if(tag) {
                selectedTags.push(tag)
            }
        }

        return (
            <QuestionsPageProvider
                course={props.course}

                allSpecialties={allSpecialties}
                allTags={allTags}
                allInstitutions={allInstitutions}
                allCategories={allCategories}

                selectedSpecialties={selectedSpecialties}
                selectedSubSpecialties={selectedSubSpecialties}
                selectedTags={selectedTags}
                selectedCategories={selectedCategories}
            />
        )
    } else {
        return <RMSplashLoader />
    }

}