import React, { useState } from 'react';
import { Button, Container, Input, InputContainer } from '../../App.style';
import { ReactComponent as Earth } from '../../images/Earth.svg';
import { ReactComponent as EarthHand } from '../../images/EarthHand.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SetNamePage: React.FC = () => {
  const [name, setName] = useState('');
  const MAX_LENGTH = 5;
  const navigate = useNavigate();

  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    const target = event.target.value;
    setName(target);
  };

  return (
    <Container>
      <UnderDiv>
        <Earth className="earth" />
        <EarthHand className="earthHand" />
        <InputContainer style={{ position: 'relative' }}>
          <Input
            type="text"
            placeholder="이름을 입력해주세요 (최대 5글자)"
            minLength={1}
            maxLength={MAX_LENGTH}
            value={name}
            spellCheck={false}
            onInput={onInputHandler}
          />
          <Button
            disabled={!(name.length > 0)}
            onClick={() => {
              name.length > 0 && name.length <= 5
                ? navigate('/chat', { state: name })
                : null;
            }}
          >
            실험실 입장하기
          </Button>
        </InputContainer>
      </UnderDiv>
    </Container>
  );
};

export default SetNamePage;

const UnderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 20.5px;

  .earth {
    position: absolute;
    bottom: 50%;
  }

  .earthHand {
    z-index: 1;
    position: absolute;
    bottom: 88%;
  }
`;
