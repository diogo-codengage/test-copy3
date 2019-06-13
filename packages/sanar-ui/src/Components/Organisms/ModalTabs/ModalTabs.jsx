import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import ESModal from '../../Atoms/Modal'
import ESTyography from '../../Atoms/Typography'
import ESTabs, { ESTabPane } from '../../Atoms/Tabs'
import ESBrandHeader from '../../Atoms/BrandHeader'
import useWindowSize from '../../../Hooks/useWindowSize'

const ESModalTabs = ({ className, visible, onCancel, content, activeTab }) => {
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
                            <ESTyography
                                className='es-modal-tabs__content--title'
                                level={4}
                                regular
                            >
                                {item.title}
                            </ESTyography>

                            <Scrollbars renderTrackHorizontal={() => <div />}>
                                {item.content.map((item, index) => (
                                    <div key={index}>
                                        <ESTyography
                                            className='es-modal-tabs__content__text--title'
                                            level={6}
                                        >
                                            {item.title}
                                        </ESTyography>
                                        <ESTyography
                                            className='es-modal-tabs__content__text--paragraph'
                                            level={6}
                                            regular
                                        >
                                            {item.content}
                                        </ESTyography>
                                    </div>
                                ))}
                            </Scrollbars>
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
        content: PropTypes.string
    })
}
ESModalTabs.defaultProps = {}

export default ESModalTabs
