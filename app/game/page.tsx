import GameClient from './GameClient';

interface GamePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function GamePage({ searchParams }: GamePageProps) {
  const mode = (searchParams.mode as 'classic' | 'time-attack') || 'classic';
  
  return <GameClient mode={mode} />;
}