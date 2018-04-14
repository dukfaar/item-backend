import { Schema, model } from 'mongoose'

export const ItemSchema = new Schema({
  name: { type: String },
  namespaceId: { type: Schema.ObjectId }
})

export const Item = model('item', ItemSchema) 