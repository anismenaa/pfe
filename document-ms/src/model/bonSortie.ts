import mongoose from 'mongoose'

interface BonSortieAttrs {
  id: string
  departementId: string
  date_sortie: Date
  finalised: boolean
  finalisedBy: string
}

interface BonSortieDoc extends mongoose.Document {
  id: string
  departementId: string
  date_sortie: Date
  finalised: boolean
  finalisedBy: string
}

interface BonSortieModel extends mongoose.Model<BonSortieDoc> {
  build(attrs: BonSortieAttrs): BonSortieDoc
}

const bonEntreeSchema = new mongoose.Schema({
  departementId: {
    type: String,
    required: true
  },
  date_sortie: {
    type: Date,
    required: true
  },
  finalised: {
    type: Boolean,
    required: true
  },
  finalisedBy: {
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

bonEntreeSchema.statics.build = (attrs: BonSortieAttrs) => {
  return new BonSortie({
    _id: attrs.id,
    date_sortie: attrs.date_sortie,
    departementId: attrs.departementId,
    finalised: attrs.finalised,
    finalisedBy: attrs.finalisedBy
  })
}

const BonSortie = mongoose.model<BonSortieDoc, BonSortieModel>('BonSortie', bonEntreeSchema)

export {BonSortie}