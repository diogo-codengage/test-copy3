import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://elb-sanar-residencia-app-bff-qa-53c18f15ca666731.elb.us-east-1.amazonaws.com:4000/graphql',
    onError: console.error,
    request: async operation => 
    operation.setContext({
        headers: {
            //TODO Authorization: await ...
            "Authorization":"eyJraWQiOiJcL002SlRpKytUUmVrRXU5VkppZU5oYkRFdTE3TmJxbkt3Z0ZERTB0MU1vST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlN2I5ZjdhMi1jOGM2LTQ2ZTUtYTlkYy05ZGE5NDVlNzM1ZjIiLCJhdWQiOiI3cnI3cTU0aDcxdXJpaW9jb28xNTlwMXY0NyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjdlZWZlOTUxLTI0N2QtNDBlMS04MGZiLWE4M2E3YTlkM2FkNSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTYwODY2NDU0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9FSm5KRDZSMDIiLCJuYW1lIjoiQ2FkYXN0cm8iLCJjb2duaXRvOnVzZXJuYW1lIjoiZTdiOWY3YTItYzhjNi00NmU1LWE5ZGMtOWRhOTQ1ZTczNWYyIiwiZXhwIjoxNTYwODcwMDU0LCJpYXQiOjE1NjA4NjY0NTQsImVtYWlsIjoiY2FkYXN0cm9AZWRpdG9yYXNhbmFyLmNvbS5iciJ9.EduhoRbC0ztW_1WC9Uogkis6tIF4YLzOFRDlqAGdsOGOZN5Y1Rv670lIvz7qoqfEPfJrg-ZYn0TjBb7n_67GPOSWoGLv9IXy606S2Bzpf-oj-E04uaA6HwTGIBG8lZ2VlXgrkn69OMwgpBv4iTSDXwvJ7HVnIr2rOyd7DIIEo27tQPSTlgsRuRKbXWV7zfqQsiQhg7JGPDuWlSmQu53Gw66KQYFinoK3YJ4bSN7aSABn49cPY880Bl4O8EydbUtWwlqP8rqnCp36eoXKbW_C01dpfGi23k55OvTnVFofv43O-UlG_x1UQCOVb0vXG2SKxKnet3SVgRLkwY1FeWWUGg"
        }
    })
});

export const RMGraphQLProvider = ({ children }) =>
    <ApolloProvider client={client}>{children}</ApolloProvider>
