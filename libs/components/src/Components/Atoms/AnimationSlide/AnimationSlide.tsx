import React, { useMemo, cloneElement } from 'react'

import Transition, { TransitionProps } from 'react-transition-group/Transition'

export const AnimationSlideDirections = {
    rightToLeft: {
        entering: { transform: 'translate3d(0%, 0, 0)' },
        entered: { transform: 'translate3d(0%, 0, 0)' },
        exiting: { transform: 'translate3d(100%, 0, 0)' },
        exited: { transform: 'translate3d(100%, 0, 0)' }
    },
    leftToRight: {
        entering: { transform: 'translate3d(0%, 0, 0)' },
        entered: { transform: 'translate3d(0%, 0, 0)' },
        exiting: { transform: 'translate3d(-100%, 0, 0)' },
        exited: { transform: 'translate3d(-100%, 0, 0)' }
    },
    topToBottom: {
        entering: { transform: 'translate3d(0, 0%, 0)' },
        entered: { transform: 'translate3d(0, 0%, 0)' },
        exiting: { transform: 'translate3d(0, -100%, 0)' },
        exited: { transform: 'translate3d(0, -100%, 0)' }
    },
    bottomToTop: {
        entering: { transform: 'translate3d(0, 0%, 0)' },
        entered: { transform: 'translate3d(0, 0%, 0)' },
        exiting: { transform: 'translate3d(0, 100%, 0)' },
        exited: { transform: 'translate3d(0, 100%, 0)' }
    }
}

export interface ISANAnimationSlideProps extends TransitionProps {
    style?: React.CSSProperties
    direction: 'rightToLeft' | 'leftToRight' | 'topToBottom' | 'bottomToTop'
    children: React.ReactElement
}

const SANAnimationSlide = ({
    style = {},
    direction,
    children,
    ...props
}: ISANAnimationSlideProps) => {
    const defaultStyle = useMemo(
        () => ({
            transition: `transform ${props.timeout}ms ease-in-out`,
            transform: 'translate3d(0%, 0, 0)'
        }),
        [props.timeout]
    )

    return (
        <Transition {...props}>
            {(state, childProps) =>
                cloneElement(children, {
                    style: {
                        ...style,
                        ...children.props.style,
                        ...defaultStyle,
                        ...AnimationSlideDirections[direction][state]
                    },
                    ...childProps
                })
            }
        </Transition>
    )
}

export default SANAnimationSlide
