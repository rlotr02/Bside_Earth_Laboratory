import React, { useEffect, useState } from 'react';
import { Button, Container } from '../../App.style';
import { ReactComponent as Earth } from '../../images/Earth.svg';
import { ReactComponent as EarthHand } from '../../images/EarthHand.svg';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Animal from '../../images/Animal.png';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); //name, animal, act 가져옴
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://port-0-earthers-iad5e2alq52x1o6.sel4.cloudtype.app/chat/3', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: state.name,
        animal: state.animal,
        act: state.act,
      }),
    }).then(response => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let data = '';

      const readChunk = (): Promise<void> => {
        return reader.read().then(appendChunks);
      };

      const appendChunks = (
        result: ReadableStreamReadResult<Uint8Array>,
      ): Promise<void> | undefined => {
        const chunk = decoder.decode(result.value || new Uint8Array(), {
          stream: !result.done,
        });
        data += chunk;

        const modifiedData = data
          .replaceAll('data:', '')
          .split('\n')
          .map(str => str.replaceAll('"\\n"', '\n'));

        setResult(modifiedData);

        if (!result.done) {
          return readChunk();
        }
      };

      return readChunk();
    });
  }, []);

  return (
    <Container>
      <UnderDiv>
        <Earth />
        <EarthHand className="earthHand" />
        <ResultContainer>
          <ResultSN>실험 결과</ResultSN>
          <ResultScroll>
            <img src={Animal} alt="Animal" />
            <ResultParcent>
              <p className="text1">{state.animal}</p>
              <p className="text2">살릴 확률</p>
              <p className="text3">90%</p>
            </ResultParcent>
            <ResultText>{result}</ResultText>
          </ResultScroll>
          <Button
            style={{ position: 'absolute', bottom: -70 }}
            onClick={() => navigate('/')}
          >
            재실험하기
          </Button>
        </ResultContainer>
      </UnderDiv>
    </Container>
  );
};

export default ResultPage;

const UnderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .earthHand {
    z-index: 1;
    position: absolute;
    top: 113.59px;
  }
`;

const ResultContainer = styled.div`
  position: absolute;
  margin-top: 142.11px;
  margin-bottom: 20.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 359px;
  border-radius: 27.125px;
  border-bottom: 1.923px solid #d0d0d0;
  border-right: 1.923px solid #d0d0d0;
  border-left: 1.923px solid #d0d0d0;
  background: var(--Secondary);
  padding-bottom: 10px;
`;

const ResultSN = styled.div`
  width: 359px;
  height: 39.57px;
  border-radius: 27.125px 27.125px 0px 0px;
  border-top: 1.923px solid #d0d0d0;
  border-right: 1.923px solid #d0d0d0;
  border-left: 1.923px solid #d0d0d0;
  background-color: var(--Secondary);
  color: var(--text-color);
  font: var(--result-l-font);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultScroll = styled.div`
  width: 100%;
  height: 63vh; //height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 143.765px;
    height: 143.765px;
  }
`;

const ResultParcent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 9.94px;

  .text1 {
    color: #0d6abf;
    font: var(--result-xl-font);
  }

  .text2 {
    color: var(--text-click);
    font: var(--result-s-font);
    padding: 0 2.76px;
  }

  .text3 {
    color: #0dbf50;
    font: var(--result-xl-font);
  }
`;

const ResultText = styled.div`
  color: #333;
  font: var(--result-m-font);
  padding: 10px 19.3px;
`;
