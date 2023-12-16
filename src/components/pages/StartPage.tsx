import React from 'react';
import { Button, Container } from '../../App.style';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import { ReactComponent as Tree1 } from '../../images/Tree1.svg';
import { ReactComponent as Tree2 } from '../../images/Tree2.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Center>
        <Logo />
        <Button
          style={{ marginTop: 270, zIndex: 1, position: 'relative' }}
          onClick={() => navigate('/set-name')}
        >
          실험실 입장하기
        </Button>
        <TreeDiv>
          <Tree1 className="tree1" />
          <Tree2 className="tree2" />
        </TreeDiv>
      </Center>
    </Container>
  );
};

export default StartPage;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100%;
`;

const TreeDiv = styled.div`
  display: flex;
  position: relative;
  top: 40px;
  width: 100%;

  svg {
    position: absolute;
    bottom: 0;
  }

  .tree1 {
    left: 0;
  }

  .tree2 {
    right: 0;
  }
`;
