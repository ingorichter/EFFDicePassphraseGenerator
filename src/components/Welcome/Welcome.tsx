import { Title, Text, Anchor, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn more on Mantine +
        Vite integration follow{' '}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
          {' '}
          <Center>
          <Anchor
            component={Link}
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
            fw={500}
            fz="xl"
            to="/dice"
          >
              Roll the Dices to generate Passphrases
          </Anchor>
          </Center>
      </Text>
    </>
  );
}
