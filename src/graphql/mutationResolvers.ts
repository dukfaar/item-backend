import * as _ from 'lodash'
import * as Promise from 'bluebird'

import { Item } from '../model/item'

function createType(type, findBy, params): Promise {
  return type.findOne(findBy).lean().exec()
  .then(instance => {
      return instance 
      ?Promise.reject("Can not create new instance")
      :_.extend(new type(), params).save()  
  })
}

function updateType(type, findBy, params): Promise {
  return type.findOne(findBy).exec()
  .then(instance => {
      return instance
      ?_.extend(instance, params).save()   
      :Promise.reject("Can not find instance")                 
  })
}

export default {
  createItem: (value, params) => createType(Item, {name: params.name}, params)
}