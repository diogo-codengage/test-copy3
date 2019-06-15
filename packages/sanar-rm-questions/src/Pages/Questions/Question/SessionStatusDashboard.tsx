import React, { useContext } from 'react'

import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'

import { RMContainer } from '../../../Components/RMContainer'
import { QuestionPageType, useQuestionsContext } from '../QuestionsContext'

const ESCircleProgressWrapper = ({ label, percent, status }) => {

    return <div style={
        {
            marginRight: 40,
            display: 'flex',
            alignItems: 'center'
        }
    }><span style={{ marginRight: 6 }}>{label}</span>
        <ESCircleProgress
            strokeWidth={12}
            showInfo
            width={44}
            percent={percent}
            status={status}
        />
    </div>
}

const calc = ({ totalCorrect, totalSkipped, totalWrong }) => {

    let correct = 0
    let skipped = 0
    let wrong = 0

    const total = totalCorrect + totalSkipped + totalWrong

    if (total > 0) {

        if (totalCorrect) {
            correct = Math.trunc((totalCorrect / total) * 100)
        }
        if (totalSkipped) {
            skipped = Math.trunc((totalSkipped / total) * 100)
        }
        if (totalWrong) {
            wrong = Math.trunc((totalWrong / total) * 100)
        }

        //fix rounding
        if(totalSkipped > 0){
            skipped = 100 - correct - wrong
        } else if(totalCorrect > 0) {
            correct = 100 - wrong - skipped
        }

        if((correct + wrong + skipped) !== 100){
            console.log(`ooops, total = ${correct + wrong + skipped}  is not equal 100
            correct ${correct}
            wrong ${wrong}
            skipped ${skipped}`);
        }

    }

    return {
        correct,
        skipped,
        wrong
    }
}

export const SessionStatusDashboard = () => {

    const {
        totalCorrect,
        totalSkipped,
        totalWrong,
        setCurrentPage
    } = useQuestionsContext()

    const {
        correct,
        wrong,
        skipped
    } = calc({ totalCorrect, totalSkipped, totalWrong })

    return <div style={
        {
            marginTop: '1em',
            marginBottom: '1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }
    >
        <div className="" style={{ display: 'flex' }}>
            <ESCircleProgressWrapper
                label={'Corretas:'}
                percent={correct}
                status={'success'}
            />
            <ESCircleProgressWrapper
                label={'Erradas:'}
                percent={wrong}
                status={'error'}
            />
            <ESCircleProgressWrapper
                label={'Puladas:'}
                percent={skipped}
                status={'normal'}
            />
        </div>
    </div>
}
