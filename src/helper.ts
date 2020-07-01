export function times<T>(num: number, item: T): T[] {
    if (num === 0) {
        return []
    } else {
        return [item].concat(times(num - 1, item))
    }
}
