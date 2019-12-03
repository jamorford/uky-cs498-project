// Capitalize department
let str = $('#class_department').text()
let res = str.toUpperCase()
$('#class_department').text(res)

// Sanitize section with 0's
str = $('#class_section').text()
if (str.length == 1){
    res = '00' + str
} else if (str.length == 2){
    res = '0' + str
} else {
    res = str
}
$('#class_section').text(res)

// Capitalize first letter of semester
str = $('#class_semester').text()
res = str.charAt(0).toUpperCase() + str.slice(1)
$('#class_semester').text(res)