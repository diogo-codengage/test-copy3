import React, { Component } from 'react'


export class RMContainer extends Component<{ children: any }> {
    render() {
        let { children } = this.props
        return <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '1000px' }}> {children}  </div>
        </div>
    }
}
