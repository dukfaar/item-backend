export default `
type Mutation {
  createItem(name: String!, namespaceId: String): Item
  updateItem(_id: String!, name: String, namespaceId: String): Item
}
`