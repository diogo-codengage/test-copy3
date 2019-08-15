import React from 'react'

import FLXViewedCourses from './ViewedCourses'
import FLXAddedCourses from './AddedCourses'

const FLXHome: React.FC = () => {
    return (
        <>
            <FLXViewedCourses />
            <FLXAddedCourses />
        </>
    )
}

export default FLXHome
