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


function addUserInput() {
    const  displayElement = document.querySelector('#options-container')
    let userOptionsHtml = '';

    userOptionsHtml = `
        <div class="form-group">
            <label for="userName">User Name</label>
            <input class="form-control" id="userName"></input>
            <label for="teeBoxSelection">Tee Box Option</label>
            <select class="form-control" id="teeBoxSelection">
                <option value="" disabled selected>Select your option</option>
                <option value="pro">Pro</option>
                <option value="champion">Champion</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
            </select>
            <button class="form-control" onclick="handleAddNewUser()">Add User</button>
            <button class="form-control" onclick="displayScoreCard()">Start Game</button>
        </div>    
    `

    displayElement.innerHTML += userOptionsHtml
}

// function displayCourseInfo() {
//     let teeBoxSelectHtml = ''
//     teeBoxes.forEach(function (teeBox, index) {
//         teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
//         teeBox.totalYards
//     } yards</option>`
//     });

//     document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
// }


function displayScoreCard() {
    //hide course and user creation

    //make score cards
    let card = document.querySelector('.scoreCardOut')
    let holesHtml = `
        <tr>
            <td>Hole</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>Out</td>
        </tr> 
        `;
        let yardageHtml = ''
        let parsHtml = ''
        let handyCapsHtml = ''

    courses[0].data.holes.forEach((hole) => {
        yardageHtml = `
            <tr>
                <td>$ho</td>
            </tr>    
            `;
    });


    card.innerHTML += holesHtml + yardageHtml + parsHtml + handyCapsHtml

}

function handleAddNewUser() {
    
    let userNameInput = document.querySelector('#userName').value
    let teeBoxInput = document.querySelector('#teeBoxSelection').value

    // console.log(userNameInput + ' teebox ' + teeBoxInput )
    //testing need to get username and teebox variables
    let player = new Player(userNameInput, teeBoxInput)
    console.log(JSON.stringify(player))

      //clear input box
      document.querySelector('#userName').value = ''

          // reset teebox selection to default
    var options = document.querySelectorAll('#teeBoxSelection option');
    for (var i = 0, l = options.length; i < l; i++) {
        options[i].selected = options[i].defaultSelected;
    }
}



function handleCourseSelection() {
    let courseId = document.querySelector('#course-select').value
    console.log(courseId + ' this is the course ID')
    // getTeeBoxes(val)
    // displayTeeBoxes(courseId)
    addUserInput() 


    // displayScoreCard()
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
    })
}

function onPageLoad() {
    //get each of the course
    getAllCourses(aF)
    getAllCourses(lehi)
    getAllCourses(spanish)
}

window.onload = onPageLoad
