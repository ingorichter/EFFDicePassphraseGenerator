import { Title, Text, Anchor } from '@mantine/core';
import classes from './DiceWelcome.module.css';

export function DiceWelcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: '#ec1e1e', to: 'blue' }}
        >
          EFF Dice-Generated Passphrases
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This project is implementing the ideas from{' '}
        <Anchor href="https://www.eff.org/dice" size="lg">
          this guide
        </Anchor>
        . The idea is to use a word list that contains a mapping from 5 dice rolls mapped to a word.
        Rolling 5 dice 5 times will generate a passphrase based on the corresponding word that maps
        to the dice roll.
      </Text>
    </>
  );
}
