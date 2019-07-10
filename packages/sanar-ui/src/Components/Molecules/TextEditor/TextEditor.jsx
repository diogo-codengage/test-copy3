import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import CKEditor from 'ckeditor4-react'
import { Avatar } from 'antd'

import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'

const height = 356

const body = `
    font-size: 14px;
    font-family: Nunito Sans, sans-serif;
    line-height: 1.4;
    margin: 16px;
`

const contentsCss = (bodyStyle = {}, other = {}) => [
    `body { ${body} ${bodyStyle} } ${other}`
]

const config = {
    removePlugins: 'elementspath, resize',
    language: 'pt-br',
    toolbar: [['Bold'], ['Italic'], ['Link'], ['Source']],
    toolbarLocation: 'bottom',
    uiColor: '#F7F9FA',
    contentsCss: contentsCss(),
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
    comment,
    onFocus,
    onBlur,
    dark,
    avatar,
    ...props
}) => {
    const { t } = useTranslation('sanarui')
    const [isReady, setReady] = useState(false)
    const [data, setData] = useState()
    const [focus, setFocus] = useState(false)
    const [letter, setLetter] = useState('0')
    const classes = classNames(
        'es-text-editor',
        {
            'es-text-editor__comment': comment && !focus,
            'es-text-editor__dark': dark
        },
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

    const conditionalStyle = `background-color: ${
        dark ? 'rgba(255, 255, 255, 0.05)' : '#fff'
    };
        color: ${dark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(57, 63, 77, 1)'};`

    return (
        <div className={classes} style={{ height: heightCalculated }}>
            <CKEditor
                {...props}
                config={{
                    ...config,
                    on: {
                        instanceReady: function() {
                            setReady(true)
                        }
                    },
                    height: heightIframe,
                    contentsCss: comment
                        ? contentsCss(
                              conditionalStyle,
                              `p {
                                margin-left: 40px;s
                            }`
                          )
                        : contentsCss(conditionalStyle)
                }}
                data={data}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isReady && (
                <>
                    {comment && (
                        <Avatar
                            className='es-text-editor__comment--avatar'
                            size={28}
                            icon='user'
                            src={avatar}
                        />
                    )}
                    <div className='es-text-editor__buttons'>
                        <ESTypography variant='caption'>
                            {`${t('textEditor.count')}: ${letter}`}
                        </ESTypography>
                        <div className='d-flex align-items-center'>
                            <ESButton
                                className='mr-md'
                                variant='text'
                                bold
                                uppercase
                                color={dark ? 'white' : 'default'}
                                size='xsmall'
                                disabled={!data}
                                onClick={handleCancel}
                            >
                                {t('textEditor.cancel')}
                            </ESButton>
                            <ESButton
                                variant='solid'
                                bold
                                uppercase
                                color={dark ? 'white' : 'primary'}
                                size='xsmall'
                                disabled={!data}
                                onClick={handleSubmit}
                            >
                                {t('textEditor.publish')}
                            </ESButton>
                        </div>
                    </div>
                </>
            )}
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
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    comment: PropTypes.bool,
    avatar: PropTypes.string
}

ESTextEditor.defaultProps = {
    type: 'classic',
    config,
    height
}

export default ESTextEditor
