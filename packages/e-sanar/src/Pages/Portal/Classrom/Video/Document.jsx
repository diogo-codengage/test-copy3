import React from 'react'
import ESLessonHeader, {
    ESLessonHeaderExtra
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESPdfReader from 'sanar-ui/dist/Components/Atoms/PdfReader'
// import { useClassroomContext } from '../Context'

const SANClassRoomDocument = () => {
    // const [content, setContent] = useState({})

    // const { state, current } = useClassroomContext()

    // const handleNext = () => {}

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <ESLessonHeader
                leftChildren={
                    <>
                        <ESTypography ellipsis level={5}>
                            Aula 001
                        </ESTypography>
                        <div className='subtitle'>
                            <ESTypography
                                variant='subtitle2'
                                className='subtitle__path'
                                ellipsis
                            >
                                Subtitulo aula 001
                            </ESTypography>
                        </div>
                    </>
                }
                rightChildren={
                    <ESLessonHeaderExtra
                        previousLesson='Anterior'
                        nextLesson='Próxima'
                        bookmarkLabel='Favoritar material'
                    />
                }
            />
            <div style={{ height: '100%', width: '100%' }}>
                <ESPdfReader url='https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf' />
            </div>
        </div>
    )
}

export default SANClassRoomDocument
