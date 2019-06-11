import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import CKEditor from 'ckeditor4-react'
import { Avatar } from 'antd'

import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'

const height = 356

const body = `
    font-size: 14px;
    font-family: Nunito Sans, sans-serif;
    color: rgba(57, 63, 77, 1);
    line-height: 1.4;
    margin: 16px
`

const contentsCss = [`body { ${body} }`]

const config = {
    removePlugins: 'elementspath, resize',
    language: 'pt-br',
    toolbar: [['Bold'], ['Italic'], ['Link'], ['Source']],
    toolbarLocation: 'bottom',
    uiColor: '#F7F9FA',
    contentsCss,
    on: {
        instanceReady: function() {}
    }
}

const letterCount = text =>
    text
        ? text
              .trim()
              .replace(/&nbsp;/gi, ' ')
              .replace(/<[^<|>]+?>/gi, '').length
        : 0

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
    labelLetterCount,
    comment,
    onFocus,
    onBlur,
    ...props
}) => {
    const [data, setData] = useState()
    const [focus, setFocus] = useState(false)
    const [letter, setLetter] = useState('0')
    const classes = classNames(
        'es-text-editor',
        { 'es-text-editor__comment': comment && !focus },
        className
    )

    useEffect(() => {
        setData(initialValue)
        setLetter(letterCount(initialValue))
    }, [])

    const onChange = event => {
        const text = event.editor.getData()
        setData(text)
        props.onChange && props.onChange(text)
        setLetter(letterCount(text))
    }

    const handleFocus = e => {
        onFocus && onFocus(e)
        setFocus(true)
    }

    const handleBlur = e => {
        onBlur && onBlur(e)
        setFocus(false)
    }

    const handleCancel = async e => {
        await setData(initialValue)
        onCancel && onCancel()
    }

    const handleSubmit = e => {
        onSubmit && onSubmit(data)
    }

    const heightCalculated =
        comment && !focus ? 52 : comment && focus ? 52 + 66 : height
    const heightIframe = comment ? 52 : height - 68

    const css = `
        body {
            background-color: #f7f9fa;
            ${body}
        }
        p {
            margin-left: 40px;
        }
    `

    return (
        <div className={classes} style={{ height: heightCalculated }}>
            <CKEditor
                {...props}
                config={{
                    ...config,
                    height: heightIframe,
                    contentsCss: comment ? css : contentsCss
                }}
                data={data}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {comment && (
                <Avatar
                    className='es-text-editor__comment--avatar'
                    size={28}
                    icon='user'
                />
            )}
            {!!letter && !!focus && (
                <ESTypography
                    variant='subtitle2'
                    className='es-text-editor__count'
                >
                    {`${labelLetterCount} ${letter}`}
                </ESTypography>
            )}
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
    labelLetterCount: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    comment: PropTypes.bool
}
ESTextEditor.defaultProps = {
    type: 'classic',
    config,
    labelCancel: 'Cancelar',
    labelSubmit: 'Publicar pergunta',
    labelLetterCount: 'Caracteres:',
    height
}

export default ESTextEditor
