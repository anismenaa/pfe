import mongoose from 'mongoose'

interface DemandeAttrs {
  id: string
  userId: string
  departementId: string
  title: string
  date_creation: Date
  validation_1: boolean
  validation_2: boolean
  finalised: boolean
  end_of_treatment: boolean
}

interface DemandeDoc extends mongoose.Document {
  id: string
  userId: string
  departementId: string
  title: string
  date_creation: Date
  validation_1: boolean
  validation_2: boolean
  finalised: boolean  
  end_of_treatment: boolean
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
  },
  end_of_treatment: {
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
  return new Demande({
    _id: attrs.id,
    userId: attrs.userId,
    departementId: attrs.departementId,
    title: attrs.title,
    date_creation: attrs.date_creation,
    validation_1: attrs.validation_1,
    validation_2: attrs.validation_2,
    finalised: attrs.finalised,
    end_of_treatment: attrs.end_of_treatment
  })
}

const Demande = mongoose.model<DemandeDoc, DemandeModel>('Demande', demandeSchema)

export {Demande}