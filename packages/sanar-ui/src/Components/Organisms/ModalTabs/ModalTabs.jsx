import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESModal from '../../Atoms/Modal'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'
import useWindowSize from '../../../Hooks/useWindowSize'

const ESModalTabs = ({ className, visible, onCancel, content }) => {
    const classes = classNames('es-modal-tabs', className)
    const [tabPosition, setTabPosition] = useState('top')
    const { width } = useWindowSize()

    useEffect(() => {
        setTabPosition(width > 1023 ? 'left' : 'top')
    }, [width])

    return (
        <ESModal
            visible={visible}
            onCancel={onCancel}
            closable
            maskClosable
            className={classes}
            width={width > 1023 && '75vw'}
        >
            <div className='es-modal-tabs__content'>
                <ESBrandHeader size={width > 1023 ? 'large' : 'small'} />
                <ESTabs tabPosition={tabPosition}>
                    {content.map((item, index) => (
                        <ESTabPane tab={item.title} key={index}>
                            {item.content}
                        </ESTabPane>
                    ))}
                </ESTabs>
            </div>
        </ESModal>
    )
}

ESModalTabs.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    content: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.node
    })
}
ESModalTabs.defaultProps = {}

export default ESModalTabs
