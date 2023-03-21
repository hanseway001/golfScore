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
let total = 0

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
    let totalScore = `<tr><td>Total Score</td>`

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
        
        if(holeNum === 9) {
            holesRow += '<td>Out</td></tr>'
            yardRow += '<td></td></tr>'
            hcpRow += '<td></td></tr>'
            parRow += '<td></td></tr>'
            playerRow += `<td id="${playerName}outScore">0</td></tr>`
            scoreOut.innerHTML = holesRow + yardRow + hcpRow + parRow + playerRow

            holesRow = '<tr><td>Hole</td>'
            yardRow = '<tr><td>Yards</td>'
            hcpRow = '<tr><td>HCP</td>'
            parRow = '<tr><td>Par</td>'
            playerRow = `<tr><td> ${playerName}</td>`
        } else if(holeNum === 18) {
            holesRow += '<td></td></tr>'
            yardRow += '<td></td></tr>'
            hcpRow += '<td></td></tr>'
            parRow += '<td></td></tr>'
            playerRow += `<td id="${playerName}inScore">0</td></tr>`
            // total = totalScore(playerName)
            totalScore += `<td id="${playerName}totalScore">0</td></tr>`

            scoreIn.innerHTML = holesRow + yardRow + hcpRow + parRow + playerRow + totalScore
        }
    })

   
    
}

function onchangeScore(event, playerName, holeNum) {
    const inputScore = Number(event.target.value)
    //add score to players object
    const index = players.map(e => e.name).indexOf(playerName)
    players[index].scores.splice(holeNum-1, 0, inputScore)
    totalScore(playerName)
}

function addTables(name) {
    const scorecardElement = document.getElementById("scorecards")
    let newinnerHTML = ''
    newinnerHTML = `
        <div class="table-responsive">
            <table id="${name}out" class="table table-bordered scoreCard">
            </table>    
        </div>
        <div class="table-responsive">
            <table id="${name}in" class="table table-bordered scoreCard">
            </table>    
        </div>
    `
    scorecardElement.innerHTML += newinnerHTML  
}

function totalScore(playerName) {
    //get the score display elemnts
    const totalScoreElement = document.getElementById(`${playerName}totalScore`)
    const outScoreElement = document.getElementById(`${playerName}outScore`)
    const inScoreElement = document.getElementById(`${playerName}inScore`)

    const userIndex = players.map(e =>e.name).indexOf(playerName)
    let total = 0
    let outScore = 0
    let inScore = 0
    players[userIndex].scores.forEach((score, index) => {
        if(index < 9) {
            outScore += score
        } else if(index >= 9) {
            inScore += score
        }
    })
    total = outScore + inScore
    
    totalScoreElement.innerHTML = total
    outScoreElement.innerHTML = outScore
    inScoreElement.innerHTML = inScore
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
