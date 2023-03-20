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
let players = []

let lehi = 'http://uxcobra.com/golfapi/course11819.txt'
let aF = 'http://uxcobra.com/golfapi/course18300.txt'
let spanish =  'http://uxcobra.com/golfapi/course19002.txt'

function displayCourseSelection() {
    const  displayElement = document.querySelector('#course-select')
    let courseOptionsHtml = '';

    courses.forEach((course) => {
        courseOptionsHtml = `<option value="${course.id}">${course.name}</option>`;
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
    const element = document.querySelector('#options-container').classList
    element.toggle('hidden')

    //for each player create a scorecard front9
    players.forEach(player => {
        const { name, teeBox } = player
        //make score cards tables for each player
        //add out table
        //add in table
        addTables(name)

        addTeaboxYardage(0 , teeBox, name)
        //render Par
        // addPars()
        //render Handicap
        // addHandicap()
        //render userName and userScore
        // addScore(name)
    })

}



function addTeaboxYardage (course, teeBox, playerName) {
    
    const scoreCard = document.querySelector('.scoreCard')

    const scoreOut = document.getElementById(playerName+"out")
    const scoreIn = document.getElementById(playerName+"in") 
    
    let holesRow = '<tr><td>Hole</td>'
    let yardRow = '<tr><td>Yards</td>'
    let hcpRow = '<tr><td>HCP</td>'
    let parRow = '<tr><td>Par</td>'
    let playerRow = `<tr><td> ${playerName}</td>`

    courses[course].holes.forEach((obj) => {
        let courseTeeBoxes = obj.teeBoxes.find(teeBoxItem => teeBoxItem.teeType === teeBox)
        let holeNum = obj.hole
        const yards = courseTeeBoxes.yards
        const hcp = courseTeeBoxes.hcp
        const par = courseTeeBoxes.par

        console.log('hole '+ holeNum + ' yards ' + yards + ' hcp ' + hcp + ' par ' + par)

        holesRow += `<td>`+ holeNum +`</td>`
        yardRow += `<td> ${yards}</td>`
        hcpRow += `<td> ${hcp}</td>`
        parRow += `<td> ${par}</td>`
        playerRow += `<td> <input type="number" class="input" id="${holeNum}" onchange="onchangeScore(event, '${playerName}', ${holeNum})" min="1" max="10" size="2" maxLength="2"></td>`

    })
    holesRow += '</tr>'
    yardRow += '</tr>'
    hcpRow += '</tr>'
    parRow += '</tr>'
    playerRow += '</tr>'
    scoreCard.innerHTML = holesRow + yardRow + hcpRow + parRow + playerRow
    // parentEle.prepend(teeBoxYardage)
   
    
}

function onchangeScore(event, playerName, holeNum) {
    const inputScore = Number(event.target.value)
    //add score to players object
    const index = players.map(e => e.name).indexOf(playerName)
    players[index].scores.splice(holeNum-1, 0, inputScore)

    // console.log(inputScore)
}

function addTables(name) {
    const scorecardElement = document.getElementById("scorecard")
    let newinnerHTML = ''
    newinnerHTML = `
        <div class="table-responsive">
            <table id="${name}+out" class="table table-bordered scoreCard">
            </table>    
        </div>
        <div class="table-responsive">
            <table id="${name}+in" class="table table-bordered scoreCard">
            </table>    
        </div>
    `
    scorecardElement.innerHTML += newinnerHTML  
}

function addScore() {

}

function handleAddNewUser() {
    
    let userNameInput = document.querySelector('#userName').value
    let teeBoxInput = document.querySelector('#teeBoxSelection').value

    // create new player
    let player = new Player(userNameInput, teeBoxInput)
    players.push(player)
    
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
      const courseResponse = await response.json();
      return courseResponse;
}

function getAllCourses(course) {
    let responseJson = getAvailableCourses(course)
    responseJson.then((courseInfo) => {
        // console.log(courseInfo.data.id)
        courses.push(courseInfo.data)
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
