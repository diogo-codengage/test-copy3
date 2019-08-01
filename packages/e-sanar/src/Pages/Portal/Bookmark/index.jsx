import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SANBookmarksProvider } from './Context'

const SANBookmarkListPage = React.lazy(() => import('./List'))
const SANBookmarkedQuestion = React.lazy(() =>
    import('../Questions/Bookmarked')
)

const SANBookmarkRouter = ({ match: { url } }) => {
    return (
        <SANBookmarksProvider>
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
        </SANBookmarksProvider>
    )
}

export default SANBookmarkRouter
