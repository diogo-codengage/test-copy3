import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import classNames from 'classnames'

const Item = Menu.Item

const ESItem = ({ className, to, activeClassName, children, ...props }) => {
    const classes = classNames('es-item', className)

    if (to && activeClassName) {
        return (
            <Item className={classes} {...props}>
                <NavLink
                    className='es-item--nav-link'
                    to={to}
                    activeClassName={activeClassName}
                >
                    {children}
                </NavLink>
            </Item>
        )
    }

    return (
        <Item className={classes} {...props}>
            <div className='es-item--nav-link'>{children}</div>
        </Item>
    )
}

export default ESItem
