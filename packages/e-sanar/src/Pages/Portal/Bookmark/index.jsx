import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SANBookmarkListPage from './List'
import SANBookmarkedQuestion from '../Questions/Bookmarked'

const SANBookmarkRouter = () => {
    return (
        <Switch>
            <Route
                path='/aluno/favoritos'
                component={SANBookmarkListPage}
                exact={true}
            />
            <Route
                path='/aluno/favoritos/questoes/:idx?'
                component={SANBookmarkedQuestion}
            />
        </Switch>
    )
}

export default SANBookmarkRouter
