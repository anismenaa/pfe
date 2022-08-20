import mongoose from 'mongoose'

interface ItemAttrs {
  id: string
  demandeId: string
  name: string
  quantity: number,
}

interface ItemDoc extends mongoose.Document {
  demandeId: string
  name: string
  quantity: number
}

interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc
}

const itemSchema = new mongoose.Schema({
  demandeId: {
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
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

itemSchema.statics.build = (attrs: ItemAttrs) => {
  return new Item({
    _id: attrs.id,
    demandeId: attrs.demandeId,
    name: attrs.name,
    quantity: attrs.quantity
  })
}

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema)

export {Item}