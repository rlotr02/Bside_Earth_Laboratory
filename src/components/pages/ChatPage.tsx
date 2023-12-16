import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Input } from '../../App.style';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as EarthS } from '../../images/EarthS.svg';
import cx from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const { state } = useLocation(); //name 가져옴
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement | null>(null); //채팅창 스크롤 조절을 위한 ref
  const [isFocused, setIsFocused] = useState(false);
  const [animal, setAnimal] = useState('');
  const [how, setHow] = useState('');
  const [nextBtn, setNextBtn] = useState(false);
  const [message1, setMessage1] = useState<string[]>([]);
  const [message2, setMessage2] = useState<string[]>([]);
  const [message3, setMessage3] = useState<string[]>([]);
  const [messageOrder, setMessageOrder] = useState(1); //뜨고 있는 메시지 + 버튼 순서
  const [fixedMessage, setFixedMessage] = useState([false, false]); //메시지 고정 여부(2번, 3번 메시지)
  const [width, setWidth] = useState(false);
  const [time, setTime] = useState('');
  const [bottom, setBottom] = useState(false);

  const Time = () => {
    const today = new Date();
    const hours = today.getHours() % 12 ? today.getHours() % 12 : 12;
    const minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const ampm = today.getHours() >= 12 ? 'PM' : 'AM';
    setTime(`${hours}:${minutes} ${ampm}`);
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight;
    }
  }, [messageOrder, message1, message2, message3]);

  useEffect(() => {
    if (messageOrder === 1) {
      fetch(
        'https://port-0-earthers-iad5e2alq52x1o6.sel4.cloudtype.app/chat/1',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            content: state,
          }),
        },
      )
        .then(response => {
          Time();
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

            setMessage1(modifiedData);

            if (!result.done) {
              return readChunk();
            }
          };

          return readChunk();
        })
        .then(() => {
          setTimeout(() => {
            setMessageOrder(2);
          }, 2000);
        });
    } else if (messageOrder === 2) {
      fetch(
        'https://port-0-earthers-iad5e2alq52x1o6.sel4.cloudtype.app/chat/1-1',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            content: '',
          }),
        },
      )
        .then(response => {
          setWidth(true);
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

            setMessage2(modifiedData);

            if (!result.done) {
              return readChunk();
            }
          };

          return readChunk();
        })
        .then(() => {
          setTimeout(() => {
            setFixedMessage([true, false]);
            setBottom(true);
            setMessageOrder(3);
          }, 2000);
        });
    } else if (messageOrder === 4) {
      fetch(
        'https://port-0-earthers-iad5e2alq52x1o6.sel4.cloudtype.app/chat/2',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            content: animal,
          }),
        },
      )
        .then(response => {
          Time();
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

            setMessage3(modifiedData);

            if (!result.done) {
              return readChunk();
            }
          };

          return readChunk();
        })
        .then(() => {
          setTimeout(() => {
            setFixedMessage([true, true]);
            setBottom(true);
            setMessageOrder(5);
            setIsFocused(false);
          }, 2000);
        });
    }
  }, [messageOrder]);

  //동물 이름 저장
  const onInputAnimalHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setAnimal(target);
  };

  //어떻게 할지 저장
  const onInputHowHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setHow(target);
  };

  return (
    <Container style={{ height: '100vh', background: 'var(--chat-bg-color)' }}>
      <Header>지구 실험단</Header>
      <ChatContainer $close={bottom} ref={chatContainerRef}>
        <ul className={cx('feed')}>
          <li>
            <Name>
              <EarthS />
              <p>네이버클로바 교수</p>
            </Name>
            <ChatTime>
              <Chating>
                <ChatingM>
                  {message1.length === 0
                    ? '네이클로바 교수 메세지 입력중 ..'
                    : message1}
                </ChatingM>
                <span>{time}</span>
              </Chating>
            </ChatTime>
          </li>
          <li>
            <UserChat
              $width={width ? 230 : 120}
              style={{
                display:
                  messageOrder === 2 || fixedMessage[0] ? 'flex' : 'none',
              }}
            >
              {message2.length === 0 ? '메세지 입력중 ..' : message2}
            </UserChat>
          </li>
          <li>
            <div
              style={{
                display:
                  messageOrder === 4 || fixedMessage[1] ? 'block' : 'none',
              }}
            >
              <Name>
                <EarthS />
                <p>네이버클로바 교수</p>
              </Name>
              <ChatTime>
                <Chating>
                  <ChatingM>
                    {message3.length === 0
                      ? '네이클로바 교수 메세지 입력중 ..'
                      : message3}
                  </ChatingM>
                  <span>{time}</span>
                </Chating>
              </ChatTime>
            </div>
          </li>
        </ul>
      </ChatContainer>
      {messageOrder === 3 ? (
        <InputContainer $close={nextBtn}>
          {!isFocused && (
            <span className="placeholder-text">
              <span style={{ color: '#F11D1D' }}>동물</span>
              <span style={{ color: 'var(-typo-secondary)' }}>
                을 입력해주세요
              </span>
            </span>
          )}
          <Input
            type="text"
            value={animal}
            onFocus={() => setIsFocused(true)}
            onBlur={event => {
              if (event.target.value === '') {
                setIsFocused(false);
              }
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                if (animal !== '') {
                  setNextBtn(true);
                  setBottom(false);
                  setMessageOrder(4);
                }
              }
            }}
            spellCheck={false}
            onInput={onInputAnimalHandler}
          />
          <Button
            onClick={() => {
              if (animal !== '') {
                setNextBtn(true);
                setBottom(false);
                setMessageOrder(4);
              }
            }}
          >
            입력 완료
          </Button>
        </InputContainer>
      ) : messageOrder === 5 ? (
        <InputContainer $close={!nextBtn}>
          {!isFocused && (
            <span
              className="placeholder-text"
              style={{
                width: 280,
                overflow: 'hidden',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: '#F11D1D' }}>{animal}</span>
              <span style={{ color: 'var(-typo-secondary)' }}>
                &nbsp;함께 살아가기 위해 어떻게 해야할 지 입력해주세요
              </span>
            </span>
          )}
          <Input
            type="text"
            value={how}
            onFocus={() => setIsFocused(true)}
            onBlur={event => {
              if (event.target.value === '') {
                setIsFocused(false);
              }
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                animal !== ''
                  ? navigate('/result', {
                      state: { name: state, animal: animal, act: how },
                    })
                  : null;
              }
            }}
            spellCheck={false}
            onInput={onInputHowHandler}
          />
          <Button
            onClick={() => {
              animal !== ''
                ? navigate('/result', {
                    state: { name: state, animal: animal, act: how },
                  })
                : null;
            }}
          >
            입력 완료
          </Button>
        </InputContainer>
      ) : null}
    </Container>
  );
};

export default ChatPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const Header = styled.div`
  width: 390px;
  height: 45.25px;
  background-color: var(--chat-header-color);
  font: var(--result-l-font);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 3;
`;

const ChatContainer = styled.div<{ $close: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  padding-bottom: 20px;
  //margin-top: 45.25px;
  margin-bottom: ${props => (props.$close ? 180 : 0)}px;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    width: 100%;
    padding-left: 8.59px;
    padding-right: 16.35px;
  }

  li {
    animation: ${fadeIn} 1s forwards;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 46.445px;
    height: 46.445px;
  }

  p {
    font: var(--input-font);
    color: var(--text-click);
  }
`;

const ChatTime = styled.div`
  display: flex;
  position: relative;
`;

const Chating = styled.div`
  position: relative;

  span {
    position: absolute;
    bottom: 0;
    right: -50px;
    color: var(--text-color);
    font: var(--input-font);
  }
`;

const ChatingM = styled.div`
  white-space: pre-line;
  max-width: 230px;
  padding: 10px 12px 9px;
  text-align: left;
  border-radius: 19.231px;
  background: var(--Secondary);
  font: var(--chat-font);
  color: var(--text-color);
  margin-left: 19.45px;
  margin-bottom: 12px;

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-radius: 2px;
    border-width: 9.5px 13px 9.5px 13px;
    border-color: transparent transparent transparent var(--Secondary);
    left: 20px;
    top: -8px;
    transform: rotate(-19deg);
  }
`;

const UserChat = styled.div<{ $width: number }>`
  max-width: ${props => props.$width}px;
  padding: 10px 12px 9px;
  text-align: left;
  border-radius: 19.231px;
  background: #36a06d;
  font: var(--chat-font);
  color: var(--Secondary);
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-radius: 2px;
    border-width: 13px 9.5px 13px 9.5px;
    border-color: transparent transparent #36a06d transparent;
    right: -6px;
    top: -2px;
    transform: rotate(160deg);
  }
`;

const InputContainer = styled.div<{ $close: boolean }>`
  width: 390px;
  height: 188.792px;
  border-radius: 27.125px 27.125px 0px 0px;
  border-top: 1.923px solid #d0d0d0;
  border-right: 1.923px solid #d0d0d0;
  border-left: 1.923px solid #d0d0d0;
  background: var(--Secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 3;
  animation: ${({ $close }) =>
    $close
      ? css`
          ${fadeOut} 1s forwards
        `
      : css`
          ${fadeIn} 1s forwards
        `};

  .placeholder-text {
    position: absolute;
    z-index: 1;
    left: 53px;
    top: 53px;
    font: var(--input-font);
  }

  input {
    background-color: transparent;
    z-index: 3;
  }
`;
