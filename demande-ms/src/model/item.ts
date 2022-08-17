import mongoose from 'mongoose'

interface ItemAttrs {
  demandeId: string
  name: string
  quantity: Date
}

interface ItemDoc extends mongoose.Document {
  demandeId: string
  name: string
  quantity: Date
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
    type: String,
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
  return new Item(attrs)
}

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema)

export {Item}