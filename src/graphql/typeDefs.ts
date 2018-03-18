import types from './types'
import inputs from './inputs'
import queries from './queries'
import mutations from './mutations'

export default `
scalar Date
${inputs}
${types}
${queries}
${mutations}
`