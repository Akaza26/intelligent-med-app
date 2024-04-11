import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  department: {
    type: [{
      label: {
        type: String,
        required: true,
        enum: [
          'General Medicine', 'Surgery', 'Critical Care Units', 'Cardiology', 'Cardiology Orthopedic Rheumatology',
          'Pediatrics', 'Pulmonology', 'NICU',
          'Dermatology', 'Nephrology', 'Neurology',
          'Gastroenterology', 'ENT', 'OBG',
          'Psychiatry', 'Geriatrics', 'Urology',
          'Medical Oncology'
          
      ]
      },
      id: {
        type: String,
        required: true
      }
    }],
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  workExperience: {
    type: Number,
    required: true,
  },
  workingDaysPerWeek: {
    type: Number,
    required: true,
  },
  activeBeds: {
    type: Number,
    required: true,
  },
  overtime: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
    enum: ['Doctor', 'Nurse', 'Pharmacist']
  },
},
{
  timestamps : true
});

const User = mongoose.model('User', userSchema);

export { User } ;
