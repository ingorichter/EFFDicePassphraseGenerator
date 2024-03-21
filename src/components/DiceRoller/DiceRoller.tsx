import { ActionIcon, Button, CopyButton, Flex, rem, Text, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './DiceRoller.module.css';
import { useWordMap } from '@/hooks/useWordMap';

const NUMBER_OF_DICE = 5;

export function DiceRoller() {
  const [dice1, setDice1] = useState<number>(1);
  const [dice2, setDice2] = useState<number>(1);
  const [dice3, setDice3] = useState<number>(1);
  const [dice4, setDice4] = useState<number>(1);
  const [dice5, setDice5] = useState<number>(1);
  const [dice6, setDice6] = useState<number>(1);

  const [word1, setWord1] = useState<string>('');
  const [word2, setWord2] = useState<string>('');
  const [word3, setWord3] = useState<string>('');
  const [word4, setWord4] = useState<string>('');
  const [word5, setWord5] = useState<string>('');
  const [word6, setWord6] = useState<string>('');

  const [diceRolls, setDiceRolls] = useState<string[]>([]);

  const wordMap = useWordMap();

  const updateWords = useCallback(() => {
    setWord1(wordMap.get(diceRolls[0]) as string);
    setWord2(wordMap.get(diceRolls[1]) as string);
    setWord3(wordMap.get(diceRolls[2]) as string);
    setWord4(wordMap.get(diceRolls[3]) as string);
    setWord5(wordMap.get(diceRolls[4]) as string);
    setWord6(wordMap.get(diceRolls[5]) as string);
  }, [diceRolls, wordMap, setWord1, setWord2, setWord3, setWord4, setWord5, setWord6]);

  useEffect(() => {
    updateWords();
  }, [updateWords]);

  const passphrase = useMemo(() => {
    if (
      word1 === undefined ||
      word2 === undefined ||
      word3 === undefined ||
      word4 === undefined ||
      word5 === undefined ||
      word6 === undefined
    ) {
      return '';
    }
    return `${word1} ${word2} ${word3} ${word4} ${word5} ${word6}`;
  }, [word1, word2, word3, word4, word5, word6]);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const roll6Dices = useCallback(
    () => Array.from({ length: NUMBER_OF_DICE }, () => rollDice()),
    []
  );

  const rollDice6Times = useCallback(() => {
    for (let i = 0; i < 6; i++) {
      setDiceRolls((previousDiceRolls) => [...previousDiceRolls, roll6Dices().join('')]);
    }
  }, [roll6Dices, setDiceRolls]);

  const resetAllDice = useCallback(() => {
    setDice1(1);
    setDice2(1);
    setDice3(1);
    setDice4(1);
    setDice5(1);
    setDice6(1);
  }, [setDice1, setDice2, setDice3, setDice4, setDice5, setDice6]);

  const resetWords = useCallback(() => {
    setWord1('');
    setWord2('');
    setWord3('');
    setWord4('');
    setWord5('');
    setWord6('');
  }, [setWord1, setWord2, setWord3, setWord4, setWord5, setWord6]);

  const resetPassphrase = useCallback(() => {
    resetAllDice();
    resetWords();
    setDiceRolls([]);
  }, [resetAllDice, resetWords, setDiceRolls]);

  return (
    <>
      <Flex
        direction={{ base: 'column', sm: 'column' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'center' }}
        align="center"
      >
        <Text fz="xl">Dice Roller</Text>
        {/*<Flex direction={{*/}
        {/*    base: 'row',*/}
        {/*    sm: 'row',*/}
        {/*}}>*/}
        {/*    <div className={classes.dice} id="dice1"><Text fz="56px" fw={700}>{dice1}</Text></div>*/}
        {/*    <div className={classes.dice} id="dice2"><Text fz="56px" fw={700}>{dice2}</Text></div>*/}
        {/*    <div className={classes.dice} id="dice3"><Text fz="56px" fw={700}>{dice3}</Text></div>*/}
        {/*    <div className={classes.dice} id="dice4"><Text fz="56px" fw={700}>{dice4}</Text></div>*/}
        {/*    <div className={classes.dice} id="dice5"><Text fz="56px" fw={700}>{dice5}</Text></div>*/}
        {/*</Flex>*/}
        <Flex direction={{ base: 'row', sm: 'row' }}>
          <Button.Group>
            <Button
              variant="default"
              onClick={() => {
                rollDice6Times();
              }}
            >
              Roll 6 Dice 6 times
            </Button>
            <Button variant="" onClick={() => resetPassphrase()}>
              Reset Passphrase
            </Button>
          </Button.Group>
        </Flex>
        <Flex direction={{ base: 'row', sm: 'row' }}>
          <Text className={classes.passphrase}>{passphrase}</Text>
          {passphrase.length > 0 && (
            <CopyButton value={passphrase} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                  <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          )}
        </Flex>
      </Flex>
    </>
  );
}
