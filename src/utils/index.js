// import faker from "./faker"
import helper from "./helper"
import lodash from "./lodash"
import AppText from "./AppText"


export default app => {
    // app.use(faker)
    app.use(helper)
    app.use(lodash)
    app.use(AppText)
}
