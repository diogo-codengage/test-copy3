import React from 'react'

import {
    ESSearch,
    ESListSearch,
    ESListSearchItem
} from 'sanar-ui/dist/Components/Organisms/MainMenu'

const SANSearch = () => (
    <>
        <div className='pl-md pr-md mb-md'>
            <ESSearch className='mb-lg' />
        </div>
        <ESListSearch>
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <ESListSearchItem key={i} title='Ornare interdum maecenas' />
            ))}
        </ESListSearch>
    </>
)

export default SANSearch
