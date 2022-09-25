import styled from "styled-components";
import Breakout from "./Breakout";
import Frogger from "./Frogger";
import SpaceInvaders from "./SpaceInvaders";
import WhacAMole from "./Whac-A-Mole";
import background from "../breakout-2.svg"

const Home = () => {

    return (
        <Container>
            <Title>Retroland</Title>

            <Games>
            <SpaceInvaders />
            {/* <Frogger />
            <Breakout />
            <WhacAMole /> */}
            </Games>
        </Container>
    )
}

const Container = styled.div`
background-image: url(${background});
background-repeat: no-repeat;
background-size: 100vw 100vh;
margin: 0;
outline: none;
border: none;
width: 100vw;
height: 100vh;
background-color: black;
background-position: 50% 50%;
overflow: hidden;
`

const Games = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    animation: animate 4s linear infinite;
    font-size: 60px;
    background-color: black;
    text-transform: uppercase;
    letter-spacing: 12px;
    margin-top: 0;

    @keyframes animate {
        0% {
            color: #8502c7;
            text-shadow: none;
        }
         100% {
            color: #ab02f2;
            text-shadow: 0 0 10px #7100a1,
            0 0 20px #7100a1,
            0 0 40px #7100a1,
            0 0 80px #7100a1,
            0 0 160px #7100a1;
        }
    }
`

export default Home;