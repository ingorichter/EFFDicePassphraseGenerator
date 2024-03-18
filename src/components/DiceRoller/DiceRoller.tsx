import { ActionIcon, Button, CopyButton, Flex, rem, Text, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './DiceRoller.module.css';

export function DiceRoller() {
    const [dice1, setDice1] = useState<number>(1);
    const [dice2, setDice2] = useState<number>(1);
    const [dice3, setDice3] = useState<number>(1);
    const [dice4, setDice4] = useState<number>(1);
    const [dice5, setDice5] = useState<number>(1);

    const [word1, setWord1] = useState<string>('');
    const [word2, setWord2] = useState<string>('');
    const [word3, setWord3] = useState<string>('');
    const [word4, setWord4] = useState<string>('');
    const [word5, setWord5] = useState<string>('');

    const [diceRolls, setDiceRolls] = useState<string[]>([]);
    const wordMap = useMemo(() => new Map<string, string>(), []);

    const processWordlist = useCallback((text: string) => {
        text.split('\n').forEach(line => {
            const numAndStringPart = line.split('\t');
            wordMap.set(numAndStringPart[0], numAndStringPart[1]);
        });
    }, [wordMap]);

    useEffect(() => {
        fetch('/eff_large_wordlist.txt')
            .then(response => response.text())
            .then(text => processWordlist(text))
            .catch(error => console.error('Failed to load words:', error));
    }, [processWordlist]);

    // const rollDices = useCallback(() => {
    //     setDice1(Math.floor(Math.random() * 6) + 1);
    //     setDice2(Math.floor(Math.random() * 6) + 1);
    //     setDice3(Math.floor(Math.random() * 6) + 1);
    //     setDice4(Math.floor(Math.random() * 6) + 1);
    //     setDice5(Math.floor(Math.random() * 6) + 1);
    // }, [setDice1, setDice2, setDice3, setDice4, setDice5]);

    const passphrase = useMemo(() => `${word1} ${word2} ${word3} ${word4} ${word5}`, [word1, word2, word3, word4, word5]);

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    const roll5Dices = useCallback(() =>
        [rollDice(), rollDice(), rollDice(), rollDice(), rollDice()], []);

    const rollDice5Times = useCallback(() => {
        const temp: string[] = [];
        for (let i = 0; i < 5; i++) {
            const fiveDiceResults = roll5Dices();
            const resultFromDiceRoll = `${fiveDiceResults[0]}${fiveDiceResults[1]}${fiveDiceResults[2]}${fiveDiceResults[3]}${fiveDiceResults[4]}`;
            temp.push(resultFromDiceRoll);
        }
        console.log(temp);
        setDiceRolls(temp);
    }, [roll5Dices, setDiceRolls]);

    const updateWords = useCallback(() => {
        setWord1(wordMap.get(diceRolls[0]) as string);
        setWord2(wordMap.get(diceRolls[1]) as string);
        setWord3(wordMap.get(diceRolls[2]) as string);
        setWord4(wordMap.get(diceRolls[3]) as string);
        setWord5(wordMap.get(diceRolls[4]) as string);
    }, [diceRolls, wordMap, setWord1, setWord2, setWord3, setWord4, setWord5]);

    const resetAllDice = useCallback(() => {
        setDice1(1);
        setDice2(1);
        setDice3(1);
        setDice4(1);
        setDice5(1);
    }, [setDice1, setDice2, setDice3, setDice4, setDice5]);

    const resetWords = useCallback(() => {
        setWord1('');
        setWord2('');
        setWord3('');
        setWord4('');
        setWord5('');
    }, [setWord1, setWord2, setWord3, setWord4, setWord5]);

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
              align="center">
                <Text fz="lg">Dice Roller</Text>
                <Flex direction={{
                    base: 'row',
                    sm: 'row',
                }}>
                    <div className={classes.dice} id="dice1"><Text fz="56px" fw={700}>{dice1}</Text></div>
                    <div className={classes.dice} id="dice2"><Text fz="56px" fw={700}>{dice2}</Text></div>
                    <div className={classes.dice} id="dice3"><Text fz="56px" fw={700}>{dice3}</Text></div>
                    <div className={classes.dice} id="dice4"><Text fz="56px" fw={700}>{dice4}</Text></div>
                    <div className={classes.dice} id="dice5"><Text fz="56px" fw={700}>{dice5}</Text></div>
                </Flex>
                <Flex direction={{ base: 'row', sm: 'row' }}>
                    <Button.Group>
                        <Button
                          variant="default"
                          onClick={() => {
                            rollDice5Times();
                            updateWords();
                        }}>
                            Roll Dices 5 times
                        </Button>
                        <Button variant="" onClick={() => resetPassphrase()}>Reset Passphrase</Button>
                    </Button.Group>
                </Flex>
                <Flex direction={{ base: 'row', sm: 'row' }}>
                    <Text>{passphrase}</Text>
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
                </Flex>
            </Flex>
        </>
    );
}
