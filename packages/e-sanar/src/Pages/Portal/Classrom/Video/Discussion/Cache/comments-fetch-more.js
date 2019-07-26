export const commentsFetchMore = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        comments: {
            ...prev.comments,
            data: [...prev.comments.data, ...fetchMoreResult.comments.data]
        }
    })
}
