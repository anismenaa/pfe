import mongoose from 'mongoose'

interface ItemAttrs {
  id: string
  bonEntreeId: string
  name: string
  quantity: number
}

interface ItemDoc extends mongoose.Document {
  id: string
  bonEntreeId: string
  name: string
  quantity: number
}

interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc
}

const bonEntreeSchema = new mongoose.Schema({
  bonEntreeId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
 
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

bonEntreeSchema.statics.build = (attrs: ItemAttrs) => {
  return new Item({
    id: attrs.id,
    bonEntreeId: attrs.bonEntreeId,
    name: attrs.name,
    quantity: attrs.quantity,
  })
}

const Item = mongoose.model<ItemDoc, ItemModel>('Item', bonEntreeSchema)

export {Item}