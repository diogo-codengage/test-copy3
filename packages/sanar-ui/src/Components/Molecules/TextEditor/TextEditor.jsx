import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import CKEditor from 'ckeditor4-react'

import ESButton from '../../Atoms/Button'

const height = 356

const config = {
    removePlugins: 'elementspath, resize',
    language: 'pt-br',
    toolbar: [['Bold'], ['Italic'], ['Link'], ['Source']],
    toolbarLocation: 'bottom',
    uiColor: '#F7F9FA',
    contentsCss: [
        `body {
            font-size: 14px;
            font-family: Nunito Sans, sans-serif;
            color: rgba(57, 63, 77, 1);
            line-height: 1.4;
            margin: 16px
        }`
    ],
    on: {
        instanceReady: function() {}
    }
}

export const createConfig = conf => ({
    ...config,
    ...conf
})

const ESTextEditor = ({
    className,
    height,
    config,
    initialValue,
    onCancel,
    onSubmit,
    labelSubmit,
    labelCancel,
    ...props
}) => {
    const [data, setData] = useState()
    const classes = classNames('es-text-editor', className)

    useEffect(() => {
        setData(initialValue)
    }, [])

    const onChange = event => {
        const text = event.editor.getData()
        setData(text)
        props.onChange && props.onChange(text)
    }

    const handleCancel = async e => {
        await setData(initialValue)
        onCancel && onCancel()
    }

    const handleSubmit = e => {
        onSubmit && onSubmit(data)
    }

    return (
        <div className={classes} style={{ height: height + 68 }}>
            <CKEditor
                {...props}
                config={{ ...config, height }}
                data={data}
                onChange={onChange}
            />
            <div className='es-text-editor__buttons'>
                <ESButton
                    className='mr-md'
                    variant='text'
                    bold
                    uppercase
                    size='xsmall'
                    onClick={handleCancel}
                >
                    {labelCancel}
                </ESButton>
                <ESButton
                    variant='solid'
                    bold
                    uppercase
                    color='primary'
                    size='xsmall'
                    onClick={handleSubmit}
                >
                    {labelSubmit}
                </ESButton>
            </div>
        </div>
    )
}

ESTextEditor.propTypes = {
    className: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.string,
    onChange: PropTypes.func,
    onInit: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    type: PropTypes.oneOf(['classic', 'inline']),
    labelCancel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelSubmit: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
}
ESTextEditor.defaultProps = {
    type: 'classic',
    config,
    labelCancel: 'Cancelar',
    labelSubmit: 'Publicar pergunta',
    height
}

export default ESTextEditor
