import mongoose from 'mongoose'

interface ItemAttrs {
  id: string
  itemId: string
  bonSortieId: string
  quantity: number
}

interface ItemDoc extends mongoose.Document {
  item: string
  itemId: string
  bonSortieId: string
  quantity: number
}

interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc
}

const ItemBsSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  bonSortieId: {
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

ItemBsSchema.statics.build = (attrs: ItemAttrs) => {
  return new ItemBs({
    _id: attrs.id,
    bonSortieId: attrs.bonSortieId,
    quantity: attrs.quantity,
    itemId: attrs.itemId
  })
}

const ItemBs = mongoose.model<ItemDoc, ItemModel>('ItemBs', ItemBsSchema)

export {ItemBs}