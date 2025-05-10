import * as React from 'react';
import styled from 'styled-components';
import { QandA, QandAsDocument } from '../types';
import { useMemo, useState } from 'react';
import PollOption from './PollOption';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const BASE_SPACE = '10px';

const PollWrapper = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 6px;

  max-width: 320px;
  padding: 24px;
  margin: 48px auto;

  display: flex;
  flex-direction: column;
  gap: ${BASE_SPACE};
`;

const PollTitle = styled.h1`
  font-size: 1.5em;
  margin: 0;
  margin-bottom: ${BASE_SPACE};
`;

const PollCount = styled.div`
  color: #777;
  margin-top: ${BASE_SPACE};
`;

export default function Poll({ qandas }: Props) {
  const getRandomNumber = () => {
    const min = 0;
    const max = 2;

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [selected, setSelected] = useState<number | null>(null);

  const [question, setQuestion] = useState<QandA>(
    qandas.questions[getRandomNumber()]
  );
  const voteCount = useMemo(() => {
    return question.answers.reduce((acc, curr) => acc + curr.votes, 0);
  }, [selected]);
  const majority = useMemo(() => {
    return question.answers.reduce(
      (maxIdx, item, idx, arr) =>
        item.votes > arr[maxIdx].votes ? idx : maxIdx,
      0
    );
  }, [selected]);

  const handleSelection = (idx: number) => () => {
    if (selected !== null) return;

    setSelected(idx);

    setQuestion(() => {
      question.answers[idx].votes += 1;

      return question;
    });
  };

  return (
    <PollWrapper>
      <PollTitle>{question.question.text}</PollTitle>
      {question.answers.map((answer, idx) => (
        <PollOption
          key={idx}
          answer={answer}
          total={voteCount}
          completed={selected !== null}
          checked={idx === selected}
          majority={idx === majority}
          onSelect={handleSelection(idx)}
        />
      ))}
      <PollCount>{voteCount} votes</PollCount>
    </PollWrapper>
  );
}
