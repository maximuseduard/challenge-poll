import * as React from 'react';
import styled, { css } from 'styled-components';
import { Answer } from '../types';
import { useMemo } from 'react';

type Props = {
  answer: Answer;
  total: number;
  completed: boolean;
  checked: boolean;
  majority: boolean;
  onSelect: () => void;
};

const PollOptionWrapper = styled.div<{
  completed: boolean;
  checked: boolean;
  percentage: number;
}>`
  position: relative;
  height: 20px;
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 6px;
  padding: 10px 6px;
  display: flex;
  justify-content: space-between;

  ${(props) =>
    !props.completed &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

const PollBar = styled.div<{
  percentage: number;
  majority: boolean;
}>`
  position: absolute;
  width: ${(props) => props.percentage}%;
  height: 40px;
  margin-top: -10px;
  margin-left: -6px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: #ddd;

  animation: fadeIn 1s;

  ${(props) =>
    props.majority &&
    css`
      background-color: #00ffff55;
    `}
`;

const PollLabel = styled.div<{
  completed: boolean;
  majority: boolean;
}>`
  display: flex;
  gap: 10px;
  z-index: 1;

  ${(props) =>
    props.completed &&
    props.majority &&
    css`
      font-weight: bold;
    `}

  .check-icon {
    width: 24px;
    height: 24px;
    align-self: center;
  }
`;

const PollPercentage = styled.div<{
  majority: boolean;
}>`
  animation: fadeIn 1s;

  ${(props) =>
    props.majority &&
    css`
      font-weight: bold;
    `}
`;

export default function PollOption({
  answer,
  total,
  completed,
  checked,
  majority,
  onSelect,
}: Props) {
  const percentage = useMemo(() => {
    return Math.round((answer.votes / total) * 100);
  }, [completed]);

  const handleSelection = () => {
    onSelect();
  };

  return (
    <PollOptionWrapper
      completed={completed}
      checked={checked}
      percentage={percentage}
      onClick={handleSelection}
    >
      {completed && (
        <PollBar percentage={percentage} majority={majority}></PollBar>
      )}
      <PollLabel completed={completed} majority={majority}>
        {answer.text}
        {checked && (
          <img
            className="check-icon"
            src={require('../static/check-circle.svg')}
          />
        )}
      </PollLabel>
      {completed && (
        <PollPercentage majority={majority}>{percentage}%</PollPercentage>
      )}
    </PollOptionWrapper>
  );
}
