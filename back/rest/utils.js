export function mapObject(to, from, what){
    for (const prop of what){
        if (typeof prop === 'string' ) {
            if (from[prop]) {
                to[prop] = from[prop]
            }
        } else {
            if (prop.value) {
                to[prop.field] = prop.value
            } else if (from[prop.field]){
                to[prop.field] = from[prop.field]
            } else {
                to[prop.field] = prop.default
            }
        }
    }
}
