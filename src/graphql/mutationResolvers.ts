import * as _ from 'lodash'
import * as Promise from 'bluebird'

import {
  mongooseCreateType as createType,
  mongooseUpdateType as updateType 
} from 'backend-utilities'
  
import { Item } from '../model/item'
  
export default {
  createItem: (value, params) => createType(Item, {name: params.name, namespaceId: params.namespaceId}, params),
  updateItem: (value, params) => updateType(Item, {_id: params._id}, params),
}