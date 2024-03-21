import { DiceWelcome } from '@/components/DiceWelcome/DiceWelcome';
import { DiceRoller } from '@/components/DiceRoller/DiceRoller';

export function DiceGenerator() {
  return (
    <>
      <DiceWelcome />
      <DiceRoller />
    </>
  );
}
