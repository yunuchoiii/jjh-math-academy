import styled from "styled-components";

const Container = styled.div`
  & svg {
    width: 4em;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
  }

  & circle {
    fill: none;
    stroke: #41B580;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
  }

  @keyframes rotate4 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash4 {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dashoffset: -125px;
    }
  }
`

const CircleLoader = () => {
  return <Container>
    <svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  </Container>
}

export default CircleLoader;