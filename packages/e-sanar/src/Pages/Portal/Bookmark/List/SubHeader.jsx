import React from 'react'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import {
    ESRadioGroup,
    ESRadioButton
} from 'sanar-ui/dist/Components/Atoms/Radio'

const intlPath = 'bookmark.subHeader.'

const SANBookmarkSubHeader = ({
    amount,
    onSelectFilter,
    onSelectVisualization
}) => {
    const { t } = useTranslation('esanar')

    return (
        <ESRow type='flex' justify='space-between'>
            <ESCol xs={24} sm={12} md={8} className='mb-md'>
                <ESTypography variant='body2'>
                    {t(`${intlPath}counter.keyWithCount`, {
                        count: amount
                    })}
                </ESTypography>
            </ESCol>
            <ESCol xs={24} sm={12} md={8}>
                <ESRadioGroup
                    defaultValue={null}
                    onChange={e => onSelectFilter(e.target.value)}
                    className='d-flex justify-content-between'
                    blocks
                >
                    <ESRadioButton value={null}>
                        {t(`${intlPath}all`)}
                    </ESRadioButton>
                    <ESRadioButton value='Video'>
                        {t(`${intlPath}videos`)}
                    </ESRadioButton>
                    <ESRadioButton value='Document'>
                        {t(`${intlPath}documents`)}
                    </ESRadioButton>
                    <ESRadioButton value='Question'>
                        {t(`${intlPath}questions`)}
                    </ESRadioButton>
                </ESRadioGroup>
            </ESCol>
            <ESCol
                xs={0}
                sm={0}
                md={8}
                className='d-flex justify-content-flex-end'
            >
                <ESButton
                    onClick={() => onSelectVisualization('grid')}
                    size='small'
                    variant='text'
                    circle
                >
                    <ESEvaIcon name='grid-outline' />
                </ESButton>
                <ESButton
                    onClick={() => onSelectVisualization('list')}
                    size='small'
                    variant='text'
                    circle
                >
                    <ESEvaIcon name='list-outline' />
                </ESButton>
            </ESCol>
        </ESRow>
    )
}

SANBookmarkSubHeader.propTypes = {
    amount: PropTypes.number,
    filter: PropTypes.string,
    loading: PropTypes.bool,
    visualization: PropTypes.string
}

export default SANBookmarkSubHeader
