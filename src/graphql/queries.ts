export default `
type Query {
  items: [Item]

  item(id: ID!): Item

  searchItems(name: String!, namespaceId: String): [Item]

  viewer: Viewer
}
`