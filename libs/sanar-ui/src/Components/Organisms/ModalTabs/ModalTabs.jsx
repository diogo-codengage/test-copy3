import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESModal from '../../Atoms/Modal'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'
import ESBrandHeader from '../../Atoms/BrandHeader'
import useWindowSize from '../../../Hooks/useWindowSize'
import ESSpin from '../../Atoms/Spin'

import defaultLogo from '../../../assets/images/logo/full-logo.svg'

const ESModalTabs = ({
    className,
    visible,
    onCancel,
    closable = true,
    content,
    activeKey = '0',
    onTabChange = null,
    defaultActiveKey,
    imageHeader,
    loading = false
}) => {
    const classes = classNames('es-modal-tabs', className)
    const [tabPosition, setTabPosition] = useState('top')
    const [tabActiveKey, setTabActiveKey] = useState(activeKey)
    const { width } = useWindowSize()

    useEffect(() => {
        setTabPosition(width > 1023 ? 'left' : 'top')
    }, [width])

    useEffect(() => {
        setTabActiveKey(activeKey)
    }, [activeKey])

    const renderItem = useCallback(
        (item, index) => {
            return (
                <ESTabPane tab={item.title} key={index}>
                    {item.content}
                </ESTabPane>
            )
        },
        [content]
    )

    return (
        <ESModal
            visible={visible}
            onCancel={onCancel}
            closable={closable}
            maskClosable
            className={classes}
            width={width > 1023 ? '75vw' : 'auto'}
        >
            <ESSpin flex spinning={loading} minHeight='100%'>
                <div className='es-modal-tabs__content'>
                    <ESBrandHeader
                        logo={imageHeader}
                        size={width > 1023 ? 'large' : 'small'}
                    />
                    <ESTabs
                        activeKey={tabActiveKey?tabActiveKey.toString():''}
                        tabPosition={tabPosition}
                        defaultActiveKey={defaultActiveKey.toString()}
                        onTabClick={e => (
                            setTabActiveKey(e), onTabChange && onTabChange(e)
                        )}
                    >
                        {content.map(renderItem)}
                    </ESTabs>
                </div>
            </ESSpin>
        </ESModal>
    )
}

ESModalTabs.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    content: PropTypes.any,
    imageHeader: PropTypes.string
}
ESModalTabs.defaultProps = {
    defaultActiveKey: '0',
    imageHeader: defaultLogo
}

export default ESModalTabs
