import React, { useState } from 'react'
import classNames from 'classnames'
import ESCard from '../../Molecules/Card'
import ESFeedbackRate from '../../Molecules/FeedbackRate'
import ESButton from '../../Atoms/Button'
import { ESTextArea } from '../../Atoms/Input'
import ESRow from '../../Atoms/Grid/Row'
import ESCheckbox from '../../Atoms/Checkbox'
import ESSelect from '../../Atoms/Select'
import ESOption from '../../Atoms/Select/Option'
import ESFeedbackUpload from '../../Molecules/FeedbackUpload'
import ESTypography from '../../Atoms/Typography'

const Required = () => <span style={{ color: 'red' }}>*</span>

const ESFeedbackRow = (props) => <div style={{ marginTop: '1em' }}>{props.children}</div>

const ESFeedback = ({ onSend, className, ...props }) => {
    const subjects = ['Aparência', 'Mal funcionamento', 'Desempenho', 'Conteúdo', 'Outro']
    const classes = classNames('es-feedback', className)

    const [rate, setRate] = useState(undefined)
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(undefined)
    const [allowContact, setAllowContact] = useState(false)

    const feedback = {
        rate,
        subject,
        description,
        image,
        allowContact
    }
    return (
        <>
            <ESFeedbackRow>
                <ESTypography variant={'caption'} strong> O que você achou da experiência na
                    E-sanar? <Required/></ESTypography>
                <ESFeedbackRate onClick={(rate) => setRate(rate)}></ESFeedbackRate>
            </ESFeedbackRow>


            <ESFeedbackRow>
                <ESTypography variant={'caption'} strong>O Feedback se trata principalmente
                    sobre: <Required/></ESTypography>
                <ESSelect style={{ width: '100%' }}>
                    {subjects.filter(s => s !== subject)
                        .map(s => <ESOption key={s} onClick={() => setSubject(s)}>{s}</ESOption>)}
                </ESSelect>
            </ESFeedbackRow>

            <ESFeedbackRow>
                <ESTypography variant={'caption'} strong> O quer quer nos dizer? <Required/></ESTypography>
                <ESTextArea rows={4} style={{ resize: 'none' }}></ESTextArea>
            </ESFeedbackRow>

            <ESFeedbackRow>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                    <ESCheckbox style={{ paddingRight: '1em' }} checked={allowContact}
                                onChange={(e) => setAllowContact(e.target.checked)}/>
                    <ESTypography variant={'caption'} strong>Permitir o contato da Sanar para tirar dúvidas sobre o
                        feedback.</ESTypography>
                </div>
            </ESFeedbackRow>


            <ESFeedbackRow>
                <ESFeedbackUpload style={{ marginTop: '1em' }}></ESFeedbackUpload>
            </ESFeedbackRow>

            <ESFeedbackRow>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1em' }}>
                    <ESButton
                        variant='solid'
                        color='primary'
                        size='medium'
                        bold
                        uppercase
                        onClick={() => onSend(feedback)}>Enviar</ESButton>
                </div>
            </ESFeedbackRow>

        </>
    )
}


ESFeedback.propTypes = {
    // className: PropTypes.string,
    // onSend: PropTypes.func
}
ESFeedback.defaultProps = {}

export default ESFeedback
