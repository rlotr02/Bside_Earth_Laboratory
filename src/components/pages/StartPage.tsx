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
      <Logo style={{ marginTop: 163.19 }} />
      <Button
        style={{ marginTop: 273.93, zIndex: 1, position: 'relative' }}
        onClick={() => navigate('/set-name')}
      >
        실험실 입장하기
      </Button>
      <TreeDiv>
        <Tree1 className="tree1" />
        <Tree2 className="tree2" />
      </TreeDiv>
    </Container>
  );
};

export default StartPage;

const TreeDiv = styled.div`
  display: flex;
  position: relative;
  top: 44.27px;
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
