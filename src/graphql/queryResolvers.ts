import { Item } from '../model/item'

import getProjection from 'backend-utilities/getProjection'

import * as _ from 'lodash'

export default {
  items: (root, params, source, options) => Item.find().select(getProjection(options)).lean().exec(),
  item: (root, params, source, options) => Item.findOne({_id: params.id}).select(getProjection(options)).lean().exec(),

  searchItems:  (root, params, source, options) => {
    return Item.find({
        name: { '$regex': params.name, '$options': 'i' }, 
        ...params.namespaceId ? {namespaceId: params.namespaceId} : {}
    }).select(getProjection(options)).lean().exec()
  },

  viewer: (root, params, source, options) => {
    return {}
  }
}