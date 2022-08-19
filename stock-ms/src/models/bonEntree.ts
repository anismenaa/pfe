import mongoose from 'mongoose'

interface BonEntreeAttrs {
  id: string
  vendor: string
  validate_BE: boolean
}

interface BonEntreeDoc extends mongoose.Document {
  id: string
  vendor: string
  validate_BE: boolean
}

interface BonEntreeModel extends mongoose.Model<BonEntreeDoc> {
  build(attrs: BonEntreeAttrs): BonEntreeDoc
}

const bonEntreeSchema = new mongoose.Schema({
  vendor: {
    type: String,
    required: true
  },
  validate_BE: {
    type: Boolean,
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

bonEntreeSchema.statics.build = (attrs: BonEntreeAttrs) => {
  return new BonEntree({
    id: attrs.id,
    vendor: attrs.vendor,
    validate_BE: attrs.validate_BE
  })
}

const BonEntree = mongoose.model<BonEntreeDoc, BonEntreeModel>('BonEntree', bonEntreeSchema)

export {BonEntree}