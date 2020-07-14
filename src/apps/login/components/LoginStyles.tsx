import { GREY, RED, PRIMARY_BLUE } from '../../../styles/colors';
import styled from 'styled-components';

export const LoginFormInput = styled.input`
  padding: 0.5em;
  border: 1px solid ${GREY};
  border-radius: 2px;
  margin: 1em 0;
`;

export const LoginForm = styled.form`
  font-family: sans-serif;
  position: absolute;
  margin: 0;
  padding: 2em 1.5em;
  top: 40%;
  left: 50%;
  -ms-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  border: 1px solid ${GREY};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 16em;
  @media only screen and (max-width: 768px) {
    width: 80%;
    border: 0;
  }
`;

export const LoginLogoContainer = styled.div`
  width: 35%;
  margin: 3em auto;
`;

export const LoginLogoImg = styled.img`
  width: 100%;
  height: auto;
`;

export const LoginButton = styled.input`
  border: 2px solid ${PRIMARY_BLUE};
  background-color: ${PRIMARY_BLUE};
  border-radius: 2px;
  width: 5em;
  color: white;
  font-weight: bold;
  padding: 0.4em;
  margin: 1em 0;

  @media only screen and (max-width: 768px) {
    width: 100%;
    border: 0;
  }
`;

export const LoginError = styled.span`
  font-size: small;
  color: ${RED};
`;
