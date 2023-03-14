// function getAvailableCourses() {        
//     const response = fetch('http://uxcobra.com/golfapi/course11819.txt').then((JSONres) => {
//         return JSONres.json();
//     }).then((res) => {
//         // console.log(res);
//         return res
//     })      
//         //   return response
// }
let courses = []

let lehi = 'http://uxcobra.com/golfapi/course11819.txt'
let aF = 'http://uxcobra.com/golfapi/course18300.txt'
let spanish =  'http://uxcobra.com/golfapi/course19002.txt'

function displayCourseSelection() {
    const  displayElement = document.querySelector('#course-select')
    let courseOptionsHtml = '';

    courses.forEach((course) => {
        courseOptionsHtml = `<option value="${course.data.id}">${course.data.name}</option>`;
    });
    displayElement.innerHTML += courseOptionsHtml
}

function displayCourseInfo() {
    let teeBoxSelectHtml = ''
    teeBoxes.forEach(function (teeBox, index) {
        teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
        teeBox.totalYards
    } yards</option>`
    });

    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
}




function handleCourseSelection() {
    val = document.querySelector('#course-select').value
    // console.log(val + ' this is the course ID')
    getAvailableCourses(val)
}

async function getAvailableCourses(course) {
    let response = await fetch(course)
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
}

function getAllCourses(course) {
    let responseJson = getAvailableCourses(course)
    responseJson.then((courseInfo) => {
        // console.log(courseInfo.data.id)
        courses.push(courseInfo)
        displayCourseSelection()
        // window.addEventListener("DOMContentLoaded", () => {
        //     const select = document.getElementById("course-select");
        //     for (const option of select.options) {
        //       console.log(option.label); // "Option 1" and "Option 2"
        //     }
        // });
    })
    // handleCoureSelection()
}

function onPageLoad() {
    //get each of the course
    getAllCourses(aF)
    getAllCourses(lehi)
    getAllCourses(spanish)
}

window.onload = onPageLoad
