import styled from "styled-components";
import Breakout from "./Breakout";
import Frogger from "./Frogger";
import SpaceInvaders from "./SpaceInvaders";
import WhacAMole from "./Whac-A-Mole";

const Home = () => {

    return (
        <Container>
            <h1>Retroland</h1>

            <SpaceInvaders />
            <Frogger />
            <Breakout />
            <WhacAMole />
        </Container>
    )
}

const Container = styled.div`

`

export default Home;