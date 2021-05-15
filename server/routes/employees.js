const express = require('express')
const router = express.Router()
const Employees = require('../models/employee')

// Getting all
router.get('/', async (req, res) => {
    //res.send("HelloWorld");
    try {
        const employees = await Employees.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// Getting One
router.get('/:id', getEmployee, (req, res) => {
    res.send(res.employee)
})

// Creating one
router.post('/', async (req, res) => {
    const employee = new Employees({
        name: req.body.name,
        age: req.body.age,
        designation: req.body.designation,
        department: req.body.department,
        reportingManager: req.body.reportingManager
    })
    try {
        if (req.body.designation.toLowerCase() == "ceo") {
            res.json("Their should be one CEO")
        }
        else {
            const newEmployee = await employee.save()
            res.status(201).json("Employee registered successfully")
        }

    } catch (err) {
        res.json(err.message)
    }
})

// Updating One
router.patch('/:id', getEmployee, async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name
    }
    if (req.body.age != null) {
        res.employee.age = req.body.age
    }
    if (req.body.designation != null) {
        res.employee.designation = req.body.department
    }
    if (req.body.department != null) {
        res.employee.department = req.body.department
    }
    if (req.body.reportingManager != null) {
        res.employee.reportingManager = req.body.reportingManager
    }

    try {
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch (err) {
        res.status(400).json(err.message)
    }
})
// Deleting One
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.remove()
        res.json('Deleted Employee Details')
    } catch (err) {

        res.status(500).json(err.message)
    }
})

async function getEmployee(req, res, next) {
    let employee
    try {
        employee = await Employees.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json('Cannot find employee')
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }

    res.employee = employee
    next()
}

module.exports = router