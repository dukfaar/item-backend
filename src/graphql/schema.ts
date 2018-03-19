import { makeExecutableSchema } from 'graphql-tools'
import * as _ from 'lodash'

import getProjection from './getProjection'

import typeDefs from './typeDefs'
import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers' 

const resolvers = {
  Item: {
  },

  Query: queryResolvers,
  Mutation: mutationResolvers
}

export const Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})