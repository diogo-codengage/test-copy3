import React from 'react'

import './style.less'

export const DocumentSVG = () => (
    <svg
        className='document'
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
    >
        <defs></defs>
        <rect class='a' width='20' height='20' />
        <path
            class='b'
            d='M8.833,16h5a.833.833,0,1,1,0,1.667h-5a.833.833,0,1,1,0-1.667Z'
            transform='translate(-1.333 -2.667)'
        />
        <path
            class='b'
            d='M11.333,13.667h-2.5a.833.833,0,1,1,0-1.667h2.5a.833.833,0,1,1,0,1.667Z'
            transform='translate(1.167 -2)'
        />
        <path
            class='b'
            d='M4.217,7.275l4.533-5A.833.833,0,0,1,9.367,2H15.2a2.108,2.108,0,0,1,2.133,2.083v12.5A2.108,2.108,0,0,1,15.2,18.667H6.133A2.108,2.108,0,0,1,4,16.583V7.833a.833.833,0,0,1,.217-.558ZM9,4.5,6.717,7H8.383A.658.658,0,0,0,9,6.292ZM6.133,17H15.2a.442.442,0,0,0,.467-.417V4.083a.442.442,0,0,0-.467-.417H10.667V6.292A2.325,2.325,0,0,1,8.408,8.667H5.667v7.917A.442.442,0,0,0,6.133,17Z'
            transform='translate(-0.667 -0.333)'
        />
    </svg>
)
