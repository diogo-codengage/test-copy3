import React, { useState } from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp, prop } from 'styled-tools'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

type IValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface ISANSliderProps {
    initialValue?: IValues
    onChange?: (value: IValues) => void
}

const SliderStyle = styled(Slider)`
    position: relative;
    min-height: 45px;
    margin-top: ${theme('space.xxs')};
    width: 100%;
`

const Sizer = styled.div`
    position: absolute;
    width: 100%;
    background-color: ${theme('colors.grey.2')};
    height: 4px;
    border-radius: 2px;
`

const Handle = styled.div<{ percent: number }>`
    left: ${prop('percent')}%;
    margin-top: -6px;
    margin-left: -8px;
    position: absolute;
    width: 16px;
    height: 16px;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${theme('colors.primary')};
`

const Number = styled.div<{ count: number; percent: number; active: boolean }>`
    font-size: ${theme('fontSizes.md')};
    ${ifProp(
        'active',
        css`
            color: ${theme('colors.primary')};
            font-weight: ${theme('fontWeights.bold')};
        `,
        css`
            color: ${theme('colors.grey.6')};
        `
    )};

    position: absolute;
    margin-top: ${theme('space.sm')};
    text-align: center;
    margin-left: ${props => -(100 / props.count) / 2}%;
    width: ${props => 100 / props.count}%;
    left: ${prop('percent')}%;
`

const Track = styled.div<{ sourcePercent: number; targetPercent: number }>`
    position: absolute;
    background-color: ${theme('colors.primary')};
    height: 4px;
    border-radius: 2px;
    width: ${props => props.targetPercent - props.sourcePercent}%;
`

const SANSlider = ({ initialValue, onChange }: ISANSliderProps) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = values => onChange(values[0])

    const handleUpdate = values => setValue(values[0])

    return (
        <SliderStyle
            mode={2}
            step={1}
            domain={[1, 10]}
            values={[initialValue]}
            onChange={handleChange}
            onUpdate={handleUpdate}
        >
            <Rail>{({ getRailProps }) => <Sizer {...getRailProps()} />}</Rail>
            <Handles>
                {({ handles, getHandleProps }) => (
                    <>
                        {handles.map(handle => (
                            <Handle
                                key={handle.id}
                                percent={handle.percent}
                                {...getHandleProps(handle.id)}
                            />
                        ))}
                    </>
                )}
            </Handles>
            <Tracks right={false}>
                {({ tracks }) => (
                    <>
                        {tracks.map(({ id, source, target }) => (
                            <Track
                                key={id}
                                sourcePercent={source.percent}
                                targetPercent={target.percent}
                            />
                        ))}
                    </>
                )}
            </Tracks>
            <Ticks count={10}>
                {({ ticks }) => (
                    <>
                        {ticks.map(tick => (
                            <Number
                                key={tick.id}
                                count={ticks.length}
                                percent={tick.percent}
                                active={value === tick.value}
                            >
                                {tick.value}
                            </Number>
                        ))}
                    </>
                )}
            </Ticks>
        </SliderStyle>
    )
}

export default SANSlider
