export function createDistinctFilter<T>(fnExtractor: (value:T) => any) {
    return function (value: T, index: number, arr:T[]):boolean {
        return arr.map(fnExtractor).indexOf(fnExtractor(value)) === index
    }
}
