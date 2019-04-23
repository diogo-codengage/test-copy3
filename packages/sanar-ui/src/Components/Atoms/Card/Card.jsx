import React from 'react'

import { Card } from 'antd'

const ESCard = ({ size }) => {
    return <Card className='es-card' size={size} title='Olá mundo' />
}

ESCard.propTypes = { ...Card['propTypes'] }

ESCard.defaultProps = Card['defaultProps']

export default ESCard
