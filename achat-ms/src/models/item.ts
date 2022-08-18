import mongoose from 'mongoose'

interface ItemAttrs {
  bonEntreeId: string
  name: string
  quantity: number
  prix_unitaire: number
  prix_total: number
}

interface ItemDoc extends mongoose.Document {
  bonEntreeId: string
  name: string
  quantity: number
  prix_unitaire: number
  prix_total: number
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
  prix_unitaire: {
    type: Number,
    required: true
  },
  prix_total: {
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

bonEntreeSchema.statics.build = (attrs: ItemAttrs) => {
  return new Item(attrs)
}

const Item = mongoose.model<ItemDoc, ItemModel>('Item', bonEntreeSchema)

export {Item}