import * as EdgeDB from 'edgedb'
import e from '../dbschema/edgeql-js'
export * from '../dbschema/edgeql-js'
export { client, e }
const client = EdgeDB.createClient()
