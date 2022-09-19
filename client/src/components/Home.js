import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const WelcomeContainer = styled.div`
  background: var(--theme-bg-mask);
  border-radius: 2em;
  width: 25em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: var(--theme-text-soft);

  h1 {
    font-size: 24px;
    margin-top: 0;
  }

  p {
    margin: 0;
    font-family: var(--theme-font-thin);
    font-weight: 300;
  }
`;

const Home = () => {
  return <PageContainer>
    <WelcomeContainer>
      <h1>Welcome to Dungeon Tracks!</h1>
      <p>
        Your new favorite tool for curating and managing your
        TTRPG background music and sound effects. Set the scene,
        ramp up the suspense, and immerse your players in the
        worlds you create!
      </p>
    </WelcomeContainer>
  </PageContainer>
}
export default Home;