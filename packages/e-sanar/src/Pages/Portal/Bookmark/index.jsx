import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SANBookmarkListPage from './List'
import SANBookmarkedQuestion from '../Questions/Bookmarked'

const SANBookmarkRouter = ({ match: { url } }) => {
    return (
        <Switch>
            <Route
                path={`${url}/questoes/:idx?'`}
                component={SANBookmarkedQuestion}
            />
            <Route
                path={[`${url}`, `${url}/`]}
                component={SANBookmarkListPage}
                exact={true}
            />
        </Switch>
    )
}

export default SANBookmarkRouter
