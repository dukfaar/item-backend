import { makeExecutableSchema } from 'graphql-tools'
import * as _ from 'lodash'

import {getProjection, getProjectionForPath} from 'backend-utilities'

import typeDefs from './typeDefs'
import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers' 

import { Item } from '../model/item'

function buildSearchParams(params) {
  let searchParams:any = {}

  if(params.after) {
    if(!searchParams._id) searchParams._id = {}
    searchParams._id['$gt'] = params.after
  }

  if(params.before) {
    if(!searchParams._id) searchParams._id = {}
    searchParams._id['$lt'] = params.before
  }

  return searchParams
}

async function buildConnection(type, baseSearchParams, params, options) {
  let searchParams = buildSearchParams(params)
  _.extend(searchParams, baseSearchParams)
  let totalCountPromise = type.count(baseSearchParams)

  let limit = params.first || params.last 
  let skip = 0
  
  let totalCount = await totalCountPromise

  if(params.last) skip = totalCount > params.last ? totalCount - params.last : 0

  if (limit + skip > totalCount) {
    limit = totalCount - skip;
  }

  let result = await type.find(searchParams).select(getProjectionForPath(options, ['edges','node'])).skip(skip).limit(limit).lean().exec()
  let edges = _.map(result,n => ({ node: n, cursor: n._id}))

  let first = _.first(edges)
  let last = _.last(edges)

  let [ hasNext, hasBefore ] = await Promise.all ([
    last ? type.find({ _id: { '$gt': last.cursor }}).select('_id').limit(1).lean().exec() : Promise.resolve(0),
    first ? type.find({ _id: { '$lt': first.cursor }}).select('_id').limit(1).lean().exec() : Promise.resolve(0)
  ])

  return {
    pageInfo: {
      hasNextPage: hasNext,
      hasPreviousPage: hasBefore,
      startCursor: first ? first.cursor : undefined,
      endCursor: last ? last.cursor : undefined
    },
    edges: edges,
    count: result.length,
    totalCount: totalCount
  }
}

const resolvers = {
  Viewer: {
    items: async (parent, params, context, options) => {
      let baseSearchParams = {}

      if(params.name) _.extend(baseSearchParams, {name: { '$regex': params.name, '$options': 'i' }})
      if(params.namespaceId) _.extend(baseSearchParams, {namespaceId: params.namespaceId})
 
      return await buildConnection(Item, baseSearchParams, params, options)
    }
  },

  Query: queryResolvers,
  Mutation: mutationResolvers
}

export const Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})