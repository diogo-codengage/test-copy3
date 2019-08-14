import warning from 'warning'

let warned = {}

export function resetWarned() {
    warned = {}
}

export default function(valid, component, message) {
    if (!valid && !warned[message]) {
        warning(false, `[SANAR-LIB: ${component}] ${message}`)
        warned[message] = true
    }
}
