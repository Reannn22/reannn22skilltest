const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    last: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phoneNumber: {
    primary: {
      type: String,
      required: [true, 'Primary phone number is required'],
      validate: {
        validator: function(v) {
          return /^[0-9]{10,}$/.test(v);
        },
        message: props => `Primary phone number must contain at least 10 digits`
      }
    },
    secondary: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^[0-9]{10,}$/.test(v);
        },
        message: props => `Secondary phone number must contain at least 10 digits`
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    enum: {
      values: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Customer Support', 'Human Resources'],
      message: '{VALUE} is not a valid department'
    }
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  employeeId: {
    type: String,
    unique: true,
    required: [true, 'Employee ID is required']
  },
  joiningDate: {
    type: Date,
    required: [true, 'Joining date is required'],
    default: Date.now
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^\d{10,}$/.test(v);
        },
        message: props => `Emergency contact phone number must contain at least 10 digits!`
      }
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  socialMedia: {
    linkedin: String,
    twitter: String,
    github: String
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      ret.id = ret.employeeId;
      
      // Clean up education array
      if (ret.education) {
        ret.education = ret.education.map(edu => {
          const { _id, __v, id, ...rest } = edu.toObject ? edu.toObject() : edu;
          return rest;
        });
      }

      // Format the response
      return {
        id: ret.employeeId,
        name: {
          first: ret.name.first,
          last: ret.name.last,
          fullName: `${ret.name.first} ${ret.name.last}`
        },
        email: ret.email,
        phoneNumber: ret.phoneNumber,
        department: ret.department,
        position: ret.position,
        employeeId: ret.employeeId,
        isActive: ret.isActive,
        joiningDate: ret.joiningDate,
        address: ret.address,
        emergencyContact: ret.emergencyContact,
        skills: ret.skills,
        education: ret.education,
        socialMedia: ret.socialMedia,
        notes: ret.notes,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt
      };
    },
    virtuals: true
  }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// Index for better search performance
userSchema.index({ 'name.first': 1, 'name.last': 1 });
userSchema.index({ department: 1 });
userSchema.index({ employeeId: 1 });

module.exports = mongoose.model('User', userSchema);
