import React, { useEffect, useState, useRef } from 'react';
import { Button, Container } from '../../App.style';
import { ReactComponent as Earth } from '../../images/Earth.svg';
import { ReactComponent as EarthHand } from '../../images/EarthHand.svg';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Result from '../../images/Result.png';
import axios from 'axios';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); //name, animal, act 가져옴
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [result, setResult] = useState<string[]>([]);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (resultRef.current) {
      const { scrollHeight } = resultRef.current;
      resultRef.current.scrollTop = scrollHeight;
    }
  }, [result]);

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
      imageSrc();
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

  const imageSrc = () => {
    axios
      .post(
        'https://port-0-earthers-iad5e2alq52x1o6.sel4.cloudtype.app/image2',
        { content: state.animal },
      )
      .then(response => {
        setImage(response.data[0].content);
      });
  };

  return (
    <Container>
      <UnderDiv>
        <Earth />
        <EarthHand className="earthHand" />
        <ResultContainer>
          <ResultSN>실험 결과</ResultSN>
          <ResultScroll ref={resultRef}>
            {image !== '' ? (
              <img src={image} alt={state.animal} />
            ) : (
              <img src={Result} alt={state.animal} />
            )}
            <ResultParcent>
              <p className="text1">{state.animal}</p>
              <p className="text2">를 살릴 확률은?</p>
            </ResultParcent>
            <ResultText>{result}</ResultText>
          </ResultScroll>
          <Button
            style={{ position: 'absolute', bottom: -65 }}
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  height: 58vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  animation: ${fadeIn} 1s forwards;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: auto;
    height: 143.765px;
    border-radius: 9.615px;
    border: 1.923px solid #d0d0d0;
  }
`;

const ResultParcent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;

  .text1 {
    color: #0d6abf;
    font: var(--result-xl-font);
  }

  .text2 {
    color: var(--text-click);
    font: var(--result-s-font);
    padding: 0 2.76px;
  }
`;

const ResultText = styled.div`
  color: #333;
  font: var(--result-m-font);
  padding: 10px 28px;
  white-space: pre-line;
`;
