import mongoose from 'mongoose'

interface DemandeAttrs {
  userId: string
  departementId: string
  title: string
  date_creation: Date
  validation_1: boolean
  validation_2: boolean
  finalised: boolean
}

interface DemandeDoc extends mongoose.Document {
  userId: string
  departementId: string
  title: string
  date_creation: Date
  validation_1: boolean
  validation_2: boolean
  finalised: boolean  
}

interface DemandeModel extends mongoose.Model<DemandeDoc> {
  build(attrs: DemandeAttrs): DemandeDoc
}

const demandeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  departementId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date_creation: {
    type: Date,
    default: new Date(),
    required: true
  },
  validation_1: {
    type: Boolean,
    default: false,
    required: true
  },
  validation_2: {
    type: Boolean,
    default: false,
    required: true
  },
  finalised: {
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

demandeSchema.statics.build = (attrs: DemandeAttrs) => {
  return new Demande(attrs)
}

const Demande = mongoose.model<DemandeDoc, DemandeModel>('Demande', demandeSchema)

export {Demande}