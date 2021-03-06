import styled from "styled-components";
import Breakout from "./Breakout";
import Frogger from "./Frogger";
import SpaceInvaders from "./SpaceInvaders";
import WhacAMole from "./Whac-A-Mole";
import background from "../arcade.jfif"

const Home = () => {

    return (
        <Container>
            <Title>Retroland</Title>

            <SpaceInvaders />
            <Frogger />
            <Breakout />
            <WhacAMole />
        </Container>
    )
}

const Container = styled.div`
background-image: url(${background});
background-repeat: no-repeat;
background-size: 90% 90%;
margin: 0;
outline: none;
border: none;

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