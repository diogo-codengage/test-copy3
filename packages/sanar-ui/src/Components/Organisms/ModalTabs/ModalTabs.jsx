import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESModal from '../../Atoms/Modal'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'
import ESBrandHeader from '../../Atoms/BrandHeader'
import useWindowSize from '../../../Hooks/useWindowSize'

const ESModalTabs = ({ className, visible, onCancel, content }) => {
    const classes = classNames('es-modal-tabs', className)
    const [tabPosition, setTabPosition] = useState('top')
    const { width } = useWindowSize()

    useEffect(() => {
        setTabPosition(width > 1023 ? 'left' : 'top')
    }, [width])

    const renderItem = useCallback(
        (item, index) => (
            <ESTabPane tab={item.title} key={index}>
                {item.content}
            </ESTabPane>
        ),
        [content]
    )

    return (
        <ESModal
            visible={visible}
            onCancel={onCancel}
            closable
            maskClosable
            className={classes}
            width={width > 1023 ? '75vw' : 'auto'}
        >
            <div className='es-modal-tabs__content'>
                <ESBrandHeader size={width > 1023 ? 'large' : 'small'} />
                <ESTabs tabPosition={tabPosition}>
                    {content.map(renderItem)}
                </ESTabs>
            </div>
        </ESModal>
    )
}

ESModalTabs.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    content: PropTypes.any
}
ESModalTabs.defaultProps = {}

export default ESModalTabs
