import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANButton } from '@sanar/components'

import RMSubheader from './Subheader'
import RMFilterSelects from '../Filter/Selects'
import RMFilterAdvanced from '../Filter/Advanced'
import { useQuestionsContext } from '../Context'

const FLXFilter = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const { startStopwatch, pauseStopwatch } = useQuestionsContext()

    const handleStart = () => {
        history.push('./pratica')
    }

    useEffect(() => {
        pauseStopwatch()
        return () => startStopwatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <RMSubheader>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    bold
                    uppercase
                    onClick={handleStart}
                >
                    {t('practicalArea.question.continue')}
                </SANButton>
            </RMSubheader>
            <RMFilterSelects />
            <RMFilterAdvanced />
        </>
    )
}

export default withRouter(FLXFilter)
