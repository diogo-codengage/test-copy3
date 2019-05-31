import React from 'react'
import ESModal, { ESModalFooter } from 'sanar-ui/dist/Components/Atoms/Modal'
import ESFeedback from 'sanar-ui/dist/Components/Organisms/Feedback'

const SANFeedback = ({onSendEnd, ...props}) => {

    return (
        <ESModal
            title='Dar feedback'
            {...props}
            centered
            closable={true}
            width={436}
        >
        <ESFeedback
            onSend={(e) =>  { console.log(e); onSendEnd();} }
        >
        </ESFeedback>
        <ESModalFooter>
        </ESModalFooter>
        </ESModal>
    )
}

export default SANFeedback
