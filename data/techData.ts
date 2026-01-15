import { IconType } from 'react-icons';

export interface TechItem {
  id: number;
  name: string;
  aliases: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  icon: IconType; // React Icon component
}

// Sample tech data with React Icons
export const techData: TechItem[] = [
  {
    id: 1,
    name: 'React',
    aliases: ['reactjs', 'react.js'],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaReact,
  },
  {
    id: 2,
    name: 'Vue',
    aliases: ['vuejs', 'vue.js'],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaVuejs,
  },
  {
    id: 3,
    name: 'Angular',
    aliases: ['angularjs', 'ng'],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaAngular,
  },
  {
    id: 4,
    name: 'Node.js',
    aliases: ['node', 'nodejs'],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaNodeJs,
  },
  {
    id: 5,
    name: 'Python',
    aliases: ['py'],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaPython,
  },
  {
    id: 6,
    name: 'JavaScript',
    aliases: ['js', 'javascript'],
    difficulty: 'easy',
    icon: require('react-icons/si').SiJavascript,
  },
  {
    id: 7,
    name: 'TypeScript',
    aliases: ['ts', 'typescript'],
    difficulty: 'medium',
    icon: require('react-icons/si').SiTypescript,
  },
  {
    id: 8,
    name: 'Java',
    aliases: ['java'],
    difficulty: 'medium',
    icon: require('react-icons/fa').FaJava,
  },
  {
    id: 9,
    name: 'Docker',
    aliases: ['docker'],
    difficulty: 'medium',
    icon: require('react-icons/fa').FaDocker,
  },
  {
    id: 10,
    name: 'Kubernetes',
    aliases: ['k8s'],
    difficulty: 'hard',
    icon: require('react-icons/si').SiKubernetes,
  },
  {
    id: 11,
    name: 'MongoDB',
    aliases: ['mongo'],
    difficulty: 'medium',
    icon: require('react-icons/si').SiMongodb,
  },
  {
    id: 12,
    name: 'PostgreSQL',
    aliases: ['postgres'],
    difficulty: 'medium',
    icon: require('react-icons/si').SiPostgresql,
  },
  {
    id: 13,
    name: 'Redis',
    aliases: [],
    difficulty: 'hard',
    icon: require('react-icons/si').SiRedis,
  },
  {
    id: 14,
    name: 'AWS',
    aliases: ['amazon web services'],
    difficulty: 'hard',
    icon: require('react-icons/fa').FaAws,
  },
  {
    id: 15,
    name: 'Git',
    aliases: [],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaGitAlt,
  },
  {
    id: 16,
    name: 'GitHub',
    aliases: ['github'],
    difficulty: 'easy',
    icon: require('react-icons/fa').FaGithub,
  },
  {
    id: 17,
    name: 'SASS',
    aliases: ['scss'],
    difficulty: 'medium',
    icon: require('react-icons/io5').IoLogoSass,
  },
  {
    id: 18,
    name: 'Tailwind CSS',
    aliases: ['tailwind'],
    difficulty: 'medium',
    icon: require('react-icons/si').SiTailwindcss,
  },
  {
    id: 19,
    name: 'Express',
    aliases: ['express.js'],
    difficulty: 'medium',
    icon: require('react-icons/si').SiExpress,
  },
  {
    id: 20,
    name: 'GraphQL',
    aliases: [],
    difficulty: 'hard',
    icon: require('react-icons/si').SiGraphql,
  }
];