import styled from "styled-components";

interface RollerLoaderProps {
  color?: string;
}

const RollerLoader = ({ color = "#41B580" }: RollerLoaderProps) => {
  const Roller = styled.div`
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 40px 40px;
      &:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7.2px;
        height: 7.2px;
        border-radius: 50%;
        background: ${color};
        margin: -3.6px 0 0 -3.6px;
      }
      &:nth-child(1) {
        animation-delay: -0.036s;
        &:after {
          top: 62.62742px;
          left: 62.62742px;
        }
      }
      &:nth-child(2) {
        animation-delay: -0.072s;
        &:after {
          top: 67.71281px;
          left: 56px;
        }
      }
      &:nth-child(3) {
        animation-delay: -0.108s;
        &:after {
          top: 70.90963px;
          left: 48.28221px;
        }
      }
      &:nth-child(4) {
        animation-delay: -0.144s;
        &:after {
          top: 72px;
          left: 40px;
        }
      }
      &:nth-child(5) {
        animation-delay: -0.18s;
        &:after {
          top: 70.90963px;
          left: 31.71779px;
        }
      }
      &:nth-child(6) {
        animation-delay: -0.216s;
        &:after {
          top: 67.71281px;
          left: 24px;
        }
      }
      &:nth-child(7) {
        animation-delay: -0.252s;
        &:after {
          top: 62.62742px;
          left: 17.37258px;
        }
      }
      &:nth-child(8) {
        animation-delay: -0.288s;
        &:after {
          top: 56px;
          left: 12.28719px;
        }
      }
    }
    @keyframes lds-roller {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return <Roller>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Roller>
}

export default RollerLoader;