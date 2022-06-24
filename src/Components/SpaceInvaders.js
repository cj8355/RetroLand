import styled from "styled-components";
import {ThemeProvider} from "styled-components";
import { main, invader } from '../themes';
import { useState, useEffect } from "react";


const SpaceInvaders = () => {
    const [laser, setLaser] = useState();
    const [currentLaserIndex, setCurrentLaserIndex] = useState();
    const [currentShooterIndex, setCurrentShooterIndex] = useState(202);
    const [laserId, setLaserId] = useState();
    const [color, setColor] = useState('white')
    

    const colors = ['white', 'yellow', 'red', 'blue', 'green']
    // selecting the html elements
const grid = [];
const resultsDisplay = [];

// declaring variables to be used in functions below

let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0


// dynamically creating the divs contained in the grid layout
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    
     grid.push(square)
     
}



// adding the created squares to an array called squares
const squares = grid

// for (let i = 0; i < squares.length; i++) {
//     Grid.push(squares[i])
// }

// positioning of the alien invaders based off of the grid index
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]
    
// adding the invader class to the squares in the grid which will have an invader in them
const draw = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].className = ('invader')
            // squares[alienInvaders[i]].style = {backgroundColor: 'purple'}
            // console.log(alienInvaders[i])
            // console.log(squares[alienInvaders[i]].style.backgroundColor)
            //   console.log(squares[alienInvaders[i]])
            //   console.log(aliensRemoved.includes(i))
            //   console.log(squares)
            //   console.log(squares[alienInvaders[i]][0])
            //   console.log(squares[alienInvaders[i]].className )
            //   console.log(squares[100].className)
        }
        
    }
    
}


draw()

 
squares[currentShooterIndex].className = ('shooter')

// removing the invader class from a square in the grid, invader will no longer show up on the page
const remove = () => {
    for (let i = 0; i < alienInvaders.length; i++) {

        squares[alienInvaders[i]].classList.remove('invader')
        // console.log(squares)
    }
}

// adding the user controlled shooter to the grid
// squares[currentShooterIndex].className = 'shooter'

// controls the left and right movement of the shooter, moves the shooter class from one square in the grid to another
const moveShooter = (e)  => {
    console.log(squares)
    // squares[currentShooterIndex].className = ('default')
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) setCurrentShooterIndex(prevState => prevState - 1)
            // currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width -1) setCurrentShooterIndex(prevState => prevState + 1)
            // currentShooterIndex += 1
            break      
    }
    // adding the shooter class to make it appear as if the shooter is moving
    // squares[currentShooterIndex].classList.add('shooter')
    // console.log(squares[currentShooterIndex])
    console.log(currentShooterIndex)
}

// event listener to listen if the user moves the shooter

useEffect(() => {
    window.addEventListener('keydown', moveShooter)
}, [])
// document.addEventListener('keydown', moveShooter)

// invaders move to the right and then down 1 and to the left then down 1 and to the right...
const moveInvaders = () => {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    //reverse the direction of the invaders once they get to the right edge of the grid div
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    // 
    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()

    //shooter loses if the invaders make it down to the shooters row and an invader occupies the same square as the shooter
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        // resultsDisplay.innerHTML = 'GAME OVER'
        console.log('game over')
        clearInterval(invadersId)
    }

   // ends the game if the invaders make it to the bottom of the grid
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length ) {
            // resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }
    if (aliensRemoved.length === alienInvaders.length) {
        // resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId)
    }
}

// invaders move every 100ms
// invadersId = setInterval(moveInvaders, 500)



const shoot = (e) => {
    let laserId
    let currentLaserIndex = currentShooterIndex
     setLaser((laser) => {
        // squares[currentLaserIndex].classList.remove('laser')
        // currentLaserIndex -= width
        // squares[currentLaserIndex].classList.add('laser')

        // if (squares[currentLaserIndex].classList.contains('invader')) {
        //     squares[currentLaserIndex].classList.remove('laser')
        //     squares[currentLaserIndex].classList.remove('invader')
        //     squares[currentLaserIndex].classList.add('boom')

            

        //     const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
        //     aliensRemoved.push(alienRemoved)
        //     results++
        //     // resultsDisplay.innerHTML = results
        // }
    })

    // switch(e.key) {
    //     case 'ArrowUp':
    //         laserId = setInterval(setLaser, 100)
    // }
}
useEffect(() => {
    window.addEventListener('keydown', shoot)
})
// document.addEventListener('keydown', shoot)

// useEffect(() => {
//     setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
//     clearInterval(laserId)
//      });

    // keeps track of key presses for moving shooter
    const arrowLeft = useKeyPress('leftArrow')
    const arrowRight = useKeyPress('rightArrow')

    // Hook
function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    // const [keyPressed, setKeyPressed] = useState<boolean>(false);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        // setKeyPressed(true);
      }
    }
    // If released key is our target key then set to false
    // const upHandler = ({ key }) => {
    //   if (key === targetKey) {
    //     setKeyPressed(false);
    //   }
    // };
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
    //   window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        // window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    // return keyPressed;
  }

    return (
        <Container>
            <h1>Space Inv</h1>
            <Grid >
                
            
            {squares.map((block) => {
                const {id, className, position} = block
                // console.log(block)
                return (
                    <Square key={id} className={className} position={position} />
                    
                ) 
            })} 
                
            </Grid>
            
            
        </Container>
    )
}









const Container = styled.div`
    width: 400px;
    height: 400px;
    
`

const Grid = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
`

const Square = styled.div`

    &.invader {
        background-color: purple;
        border-radius: 50%;

        
    }

    &.shooter {
        background-color: green;
    }

    &.default {
        background-color: pink;
    }

    &.laser {
        background-color: orange;
    }

    &.boom {
        background-color: red;
    }

    width: 20px;
    height: 20px;
    background-color: white;

    .invader  {
        background-color: purple;
        border: 1px solid black;
    }

`



const Shooter = styled.div`
    width: 20px;
    height: 20px;
    background-color: green;
`



export default SpaceInvaders;