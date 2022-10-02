import styled from "styled-components";
import {ThemeProvider} from "styled-components";
import { main, invader } from '../themes';
import { useState, useEffect } from "react";
import { useReducer } from "react";
import pause from "../pause.svg";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import arcade from "../arcadeMachine.svg";
import invaderImg from "../invader.svg";
import rocket from "../rocket.svg";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { height } from "@mui/system";


const SpaceInvaders = () => {
    
    const [currentShooterIndex, setCurrentShooterIndex] = useState(202);
    // const [laser, setLaser] = useState();
    // const [laserId, setLaserId] = useState();
    const [color, setColor] = useState('white');
    const [move, setMove] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const [alienInvaders, setAlienInvaders] = useState([
        0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
    ])
    

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
let numMoves = 0


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
// const alienInvaders = [
//     0,1,2,3,4,5,6,7,8,9,
//     15,16,17,18,19,20,21,22,23,24,
//     30,31,32,33,34,35,36,37,38,39
// ]
    
// adding the invader class to the squares in the grid which will have an invader in them
const draw = () => {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
            
            
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
    // console.log(squares)
    // squares[currentShooterIndex].className = ('default')
    
    squares[currentShooterIndex].classList.remove('shooter')
    
    console.log(squares)
    switch(e.key) {
        case 'ArrowLeft':
            if (numMoves < 7) {
            setCurrentShooterIndex(prevState => prevState - 1)
            // currentShooterIndex -= 1
            
            numMoves = numMoves + 1
            console.log("this" + numMoves)
            }
            break
        case 'ArrowRight':
            if (numMoves > -7) {
             setCurrentShooterIndex(prevState => prevState + 1)
            // currentShooterIndex += 1
             
             numMoves = numMoves - 1
             console.log(numMoves)
            }
            break      
    }
    // adding the shooter class to make it appear as if the shooter is moving
    // squares[currentShooterIndex].classList.add('shooter')
    // console.log(squares[currentShooterIndex])
    // console.log(currentShooterIndex)
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
    // setMove(move + 1)
    forceUpdate()
    remove()

    //reverse the direction of the invaders once they get to the right edge of the grid div
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            // setAlienInvaders(([...prevState]) => prevState[i] + width + 1)
            direction = -1
            goingRight = false
            console.log('going lef')
        }
    }

    // 
    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width -1
            // setAlienInvaders((prevState) => prevState[i] + width - 1)
            direction =  1
            goingRight = true
            console.log('going rig')
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        
        // setAlienInvaders(prev => prev + direction )
        
        alienInvaders[i] += direction
        // console.log(alienInvaders[i])
        // console.log('ran')
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


    // useEffect((startGame) => {
    //     invadersId = setInterval(() => {
    //        moveInvaders()
           
    //        // setAlienInvaders(prevState => prevState)
    //      console.log(move);
    //    }, 500);
    //    return () => clearInterval(invadersId);
    //  }, [move]);


     const startGame = (e) => {
        console.log('clicked')
        invadersId = setInterval(() => {
            moveInvaders()
            
            // setAlienInvaders(prevState => prevState)
          console.log(move);
        }, 500);
        return () => clearInterval(invadersId);
     }

     
     const pauseGame = (e) => {
        console.log('clicked22')
        startGame(clearInterval(invadersId))
     }

     const showBtns = (e) => {
        setShowButtons(current => !current);
        console.log("hide")
     }


     
const restartGame = (e) => {
    


    
   
    for (let i = 0; i < alienInvaders.length; i++) {
        clearInterval(invadersId)
        squares[alienInvaders[i]].classList.remove("invader")
        console.log(squares[alienInvaders[i]].classList)
        console.log("remove")

    }
    
    
    console.log("restart")
    
}


const shoot = (e) => {
    results++
    
    // let currentLaserIndex = currentShooterIndex + numMoves
     let currentLaserIndex = (currentShooterIndex - numMoves)
     function moveLaser() {
        // squares[currentLaserIndex].classList.add('laser')
        console.log(squares[currentLaserIndex].classList)
        console.log(currentLaserIndex)
        // console.log(squares)
        squares[currentLaserIndex].classList.remove('laser')
        // setLaser(prevState => prevState - width)
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
        

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
            
            // console.log('shoot22')
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            // resultsDisplay.innerHTML = results
        }
    }

    if(e.keyCode == 32){
        // console.log('shoot');
        // laserId = setInterval(moveLaser, 100)
        let laserId = setInterval(() => {
            moveLaser()
            
            // setAlienInvaders(prevState => prevState)
        //   console.log("shooters");
        }, 100);
        return () => clearInterval(laserId);
     }


    // switch(e.key) {
    //     case '32':
    //         laserId = setInterval(moveLaser, 100)
            
    // }
}




useEffect(() => {
    window.addEventListener('keydown', shoot)
}, [])
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
            <Title>Space Inv</Title>
            <Score>Score: {results}</Score>
            <Grid >
                
            
            {squares.map((block) => {
                const {id, className, position} = block
                // console.log(block)
                return (
                    <Square key={squares[block]} className={className} position={position} />
                    
                ) 
            })} 
                
            </Grid>

            <VideogameAssetIcon onClick={showBtns} style={{"height" : "6%", "width" : "8%", "color": "gold", "cursor": "pointer"}}/>
            {
            showButtons &&
            (
                <BtnContainer>

                            
                {/* <PauseCircleIcon onClick={pauseGame} style={{color: 'white', width: '45px', height: '45px', cursor: 'pointer'}} />
                < PlayCircleIcon onClick={startGame} style={{color: 'white', width: '45px', height: '45px', cursor: 'pointer'}}/> */}
                <PlayBtn onClick={startGame}>
                    <PlayText>
                        Play
                    </PlayText>
                </PlayBtn>
                <PauseBtn>
                    <PauseText onClick={pauseGame}>
                        Pause
                    </PauseText>
                </PauseBtn>
                <LeaderboardBtn>
                    <LeaderboardText>
                        Leaderboard
                    </LeaderboardText>
                </LeaderboardBtn>
                <RestartBtn>
                    <RestartText onClick={restartGame}>
                        Restart
                    </RestartText>
                </RestartBtn>
                </BtnContainer>
            )
            }
            
        </Container>
        
    )
}






const Container = styled.div`
    width: 50%;
    height: 70%;
    margin-left: 15px;
    background-image: url(${arcade});
    background-repeat: no-repeat;
    background-size: 99% 99%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    
    flex-wrap: wrap;
`

const Title = styled.h1`
    color: white;
    font-size: 35px;
`

const Grid = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 100;
`

const Square = styled.div`

    &.invader {
        background-color: rgb(44,43,42);
        
        background-image: url(${invaderImg});
        background-size: 100%;
        
    }

    &.shooter {
        background-color: rgb(44,43,42);
        background-image: url(${rocket});
        background-size: 100%;
        
    }

    /* &.default {
        background-color: rgb(0,0,42);
    } */

    

    &.boom {
        background-color: red;
        background-size: 100%;
    }

    &.laser {
        background-color: rgb(217, 34, 2);
        background-size: 100%;
        
    }


    width: 20px;
    height: 20px;
    background-color: rgb(44,43,42);

    
    

  

`

const BtnContainer = styled.div`
    width: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const PlayBtn = styled.div`
    position: relative;
    width: 155px;
    height: 50px;
    margin: 20px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -25px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:hover {
        &:before {
            
            bottom: -15px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }

    &:hover {
        &:after {
            
            top: 20px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }

    
`

const PlayText = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.05);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    border-radius: 30px;
    color: white;
    z-index: 1;
    font-weight: 400;
    letter-spacing: 1px;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(15px);

    &:hover {
        letter-spacing: 3px;

        &:before {
            transform: skewX(45deg) translateX(200%);
        }
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left, rgba(255,255,255,0.15), transparent);
        transform: skewX(45deg) translateX(0);
        transition: 0.5s;
    }

`

const PauseBtn = styled.div`
    position: relative;
    width: 155px;
    height: 50px;
    margin: 20px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -25px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:hover {
        &:before {
            
            bottom: -15px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }

    &:hover {
        &:after {
            
            top: 20px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }

`

const PauseText = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.05);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    border-radius: 30px;
    color: white;
    z-index: 1;
    font-weight: 400;
    letter-spacing: 1px;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(15px);

    &:hover {
        letter-spacing: 3px;

        &:before {
            transform: skewX(45deg) translateX(200%);
        }
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left, rgba(255,255,255,0.15), transparent);
        transform: skewX(45deg) translateX(0);
        transition: 0.5s;
    }

`

const LeaderboardBtn = styled.div`
    position: relative;
    width: 155px;
    height: 50px;
    margin: 20px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -25px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:hover {
        &:before {
            
            bottom: -15px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }

    &:hover {
        &:after {
            
            top: 20px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }


`

const LeaderboardText = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.05);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    border-radius: 30px;
    color: white;
    z-index: 1;
    font-weight: 400;
    letter-spacing: 1px;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(15px);

    &:hover {
        letter-spacing: 3px;

        &:before {
            transform: skewX(45deg) translateX(200%);
        }
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left, rgba(255,255,255,0.15), transparent);
        transform: skewX(45deg) translateX(0);
        transition: 0.5s;
    }

`

const RestartBtn = styled.div`
    position: relative;
    width: 155px;
    height: 50px;
    margin: 20px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -25px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
        width: 30px;
        height: 10px;
        background: red;
        border-radius: 10px;
        transition: 0.5s;
        transition-delay: 0.5s;
    }

    &:hover {
        &:before {
            
            bottom: -15px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }

    &:hover {
        &:after {
            
            top: 20px;
            height: 50%;
            width: 80%;
            border-radius: 30px;
            transition-delay: 0.5s;
        }
    }


`

const RestartText = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.05);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    border-radius: 30px;
    color: white;
    z-index: 1;
    font-weight: 400;
    letter-spacing: 1px;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(15px);

    &:hover {
        letter-spacing: 3px;

        &:before {
            transform: skewX(45deg) translateX(200%);
        }
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left, rgba(255,255,255,0.15), transparent);
        transform: skewX(45deg) translateX(0);
        transition: 0.5s;
    }

`

const Score = styled.div`
    color: white;
    font-size: 28px;
`



export default SpaceInvaders;