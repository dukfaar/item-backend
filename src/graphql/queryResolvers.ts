import { Item } from '../model/item'

import getProjection from './getProjection'

export default {
  items: (root, params, source, options) => Item.find().select(getProjection(options)).lean().exec()
}