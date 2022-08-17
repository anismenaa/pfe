import mongoose from 'mongoose'

interface DepartementAttrs {
  id: string
  name: string
}

interface DepartementDoc extends mongoose.Document {
  name: string
}

interface DepartementModel extends mongoose.Model<DepartementDoc> {
  build(attrs: DepartementAttrs): DepartementDoc
}

const departementSchema = new mongoose.Schema({
  name: {
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

departementSchema.statics.build = (attrs: DepartementAttrs) => {
  return new Departement({
    _id: attrs.id,
    name: attrs.name
  })
}

const Departement = mongoose.model<DepartementDoc, DepartementModel>('Departement', departementSchema)

export {Departement}