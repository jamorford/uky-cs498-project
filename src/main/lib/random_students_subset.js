module.exports.generateRandomStudentIndexes = function(num_students) {
  let student_indexes = [];
  let max_students = 0;

  if (num_students <= 10) {
    max_students = num_students;
  } else if (num_students <= 50) {
    max_students = 10;
  } else {
    max_students = Math.ceil(num_students * 0.20);
  }

  for (let i=0; i<max_students; i++) {
    random_index = Math.floor(Math.random() * num_students + 1);
    if (student_indexes.includes(random_index)) {
      i--;
    } else {
      student_indexes.push(random_index);
    }
  }
  student_indexes = student_indexes.sort(function(a, b) {
    return a - b;
  }); // numerical sort

  return student_indexes;
};
