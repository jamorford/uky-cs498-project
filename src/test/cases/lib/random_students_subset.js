const { expect } = require('../../chai')
const random_students_subset = require('../../../main/lib/random_students_subset')

describe('generates random student indexes', function () {

    it ('with 5 students given 5 students', function() {				
        // Arrange
        let student_indexes = []

        // Act
        student_indexes = random_students_subset.generateRandomStudentIndexes(5)
        
        // Assert
        expect(student_indexes.length).to.equal(5)
    })

    
    it ('with 10 students given 50 students', function() {
        // Arrange
        let student_indexes = []

        // Act
        student_indexes = random_students_subset.generateRandomStudentIndexes(50)
        
        // Assert
        expect(student_indexes.length).to.equal(10)
    })
    
    it ('with 20 students given 100 students', function() {				
        // Arrange
        let student_indexes = []

        // Act
        student_indexes = random_students_subset.generateRandomStudentIndexes(100)
        
        // Assert
        expect(student_indexes.length).to.equal(20)
    })

    // Make sure all student indexes are unique
    it ('with unique student indexes', function() {
        // Arrange
        let scanned_student_indexes = []
        let allUnique = true

        // Act
        let student_indexes = random_students_subset.generateRandomStudentIndexes(50)

        // Assert
        for(let i=0; i<student_indexes.length; i++){
            if (scanned_student_indexes.includes(student_indexes[i])){
                allUnique = false
                i = student_indexes.length
            } else {
                scanned_student_indexes.push(student_indexes[i])
            }
        }
        expect(allUnique).to.equal(true)
    })
}) 
