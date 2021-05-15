/* Import the Mongoose software module */
var mongoose = require('mongoose'),

    /* Create a Mongoose Schema object for generating
       document rules as to what structure MUST be 
       expected when requesting/sending data to and from 
       the MongoDB database collection */
    Schema = mongoose.Schema,

    /* Define the schema rules (field names, types and rules) */
    EmployeeSchema = new Schema({
        name: { type: String, required: true,unique:true },
        age: { type: Number, required: true },
        designation: {type:String,required:true},
        department: { type: String, required: true },
        reportingManager: { type: String, required: true,unique: true },
        date: { type: Date, default: Date.now }
    });

/* Export model for application usage */
module.exports = mongoose.model('employeeDetails', EmployeeSchema);