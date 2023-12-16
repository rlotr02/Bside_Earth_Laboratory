import styled from 'styled-components';

export const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 375px;
  height: 100vh;
  background-color: var(--bg-color);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 359.309px;
  height: 259.095px;
  border-radius: 27.125px;
  border: 1.923px solid #d0d0d0;
  background: var(--Secondary);
`;

export const ChatInputContainer = styled.div`
  width: 750px;
  height: 377.584px;
  border-radius: 54.25px 54.25px 0px 0px;
  border-top: 3.846px solid #d0d0d0;
  border-right: 3.846px solid #d0d0d0;
  border-left: 3.846px solid #d0d0d0;
  background: var(--Secondary);
`;

export const Button = styled.button`
  width: 305.5px;
  height: 48px;
  padding: 7.692px 11.538px;
  justify-content: center;
  align-items: center;
  border-radius: 86.538px;
  border: none;
  color: var(--Secondary);
  background-color: var(--button-color);
  font: var(--button-font);

  &:disabled {
    background-color: var(--button-disabled_color);
  }
`;

export const Input = styled.input`
  width: 305.5px;
  height: 48.077px;
  padding: 0px 11.538px;
  border-radius: 9.615px;
  border: 1.923px solid var(--border-transparent);
  background: var(--Secondary);
  color: var(--text-click);
  font: var(--input-font);
  margin-bottom: 18.42px;

  &::placeholder {
    color: var(--typo-secondary);
  }

  &:focus {
    border: 1.923px solid #675149;
  }
`;
