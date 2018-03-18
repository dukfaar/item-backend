import { Schema, model } from 'mongoose'

export const ItemSchema = new Schema({
  name: { type: String }
})

export const Item = model('item', ItemSchema) 