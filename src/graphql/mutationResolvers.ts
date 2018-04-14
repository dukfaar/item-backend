import * as _ from 'lodash'
import * as Promise from 'bluebird'

import createType from 'backend-utilities/mongooseCreateType'
import updateType from 'backend-utilities/mongooseUpdateType' 
  
import { Item } from '../model/item'
  
export default {
  createItem: (value, params) => createType(Item, {name: params.name, namespaceId: params.namespaceId}, params),
  updateItem: (value, params) => updateType(Item, {_id: params._id}, params),
}