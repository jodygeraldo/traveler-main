import * as EdgeDB from 'edgedb'
import e from '../dbschema/edgeql-js'
export * as Type from '../dbschema/edgeql-js'
export { client }
export default e
const client = EdgeDB.createClient()
