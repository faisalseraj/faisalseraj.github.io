import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import {
  IoBriefcaseOutline,
  IoConstructOutline,
  IoFlaskOutline,
  IoPeopleOutline,
  IoSchoolOutline
} from 'react-icons/io5';

import { useState } from 'react';

const SectionCard = (props: any) => {
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <VStack height={'100%'} spacing={4} align="start">
      <Flex align="center">
        <Icon as={props.icon} boxSize={6} mr={2} />
        <Text fontWeight="bold">{props.title}</Text>
      </Flex>
      <Box borderRadius="lg" boxShadow="md" p={4} bg={cardBgColor} w="100%">
        <Text>{props.content}</Text>
      </Box>
    </VStack>
  );
};

const IntroductionSection = () => {
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const [isHovered, setIsHovered] = useState(false);

  const sections = [
    {
      width: { md: '100%', base: '100%' },
      icon: IoBriefcaseOutline,
      title: 'Introduction',
      content:
        "Hey there! 👋 I'm Faisal Seraj, a seasoned Senior Software Engineer and dedicated Freelancer with a fervent passion for crafting exceptional web experiences."
    },
    {
      width: { md: '100%', base: '100%' },
      icon: IoSchoolOutline,
      title: 'Background',
      content: `🎓 Graduating with a gold medal in Computer Science, I've consistently pursued excellence, maintaining a stellar 3.97 CGPA throughout my academic journey. It was during this academic pursuit that I found my calling in web development—a domain where creativity converges with functionality.`
    },
    {
      width: { md: '200%', base: '100%' },
      icon: IoFlaskOutline,
      title: 'Experience',
      content: `My journey in web development began in 2018, where I wholeheartedly delved into both frontend and backend technologies. During my academic tenure, I embraced freelancing as a means to apply my burgeoning skills and knowledge. Over time, I successfully delivered a diverse range of projects, each a testament to my dedication and adaptability.
      Among these projects were notable creations such as a Keto diet site, a fusion of HTML, CSS, jQuery, and PHP, aimed at promoting healthier lifestyles. Additionally, I crafted a dynamic PHP CodeIgniter-powered Point of Sale system, demonstrating my ability to create efficient business solutions.
      My experience grew manifold during my tenure at #Techverx in Lahore, where I actively contributed to five impactful projects, learning and adapting in a dynamic team environment. The opportunity to lead one of these projects not only fortified my technical skills but also sharpened my leadership abilities.
      As a freelancer, I sought challenges that would push my boundaries, culminating in the successful creation of an innovative Restaurant Management System—an endeavor that stands as a testament to my commitment to excellence.`
    },
    {
      width: { md: '100%', base: '100%' },
      icon: IoConstructOutline,
      title: 'Current Engagement',
      content: `Presently, I'm immersed in a remote role at Systems Ltd Pakistan, collaborating on cutting-edge projects with a renowned telecom giant. While confidentiality limits specifics, my contributions continue to drive innovation in the telecom sphere.`
    },
    {
      width: { md: '100%', base: '100%' },
      icon: IoPeopleOutline,
      title: 'Key Skills',
      content: `Beyond technical prowess encompassing an expansive suite of technologies—ranging from AEM (Adobe Experience Manager) to React, Next.js, Gatsby, React Native, GraphQL, Node.js, and more—my foundation is rooted in invaluable soft skills. Effective communication, unwavering commitment to on-time delivery, and a philosophy centered around achieving more with less, define my approach to every project.`
    }
  ];

  return (
    <Box
      overflowX="hidden"
      mt={16}
      width={'100%'}
      animation={`slideLeft 60s linear infinite 0s ${
        isHovered ? 'paused' : 'running'
      }`}
    >
     
      <Heading>Introduction</Heading>
      <Flex>
        {sections.map((section, index) => (
          <Box
            key={index}
            width={section.width}
            position={'relative'}
            right={0}
            ml={index !== 0 ? 4 : 0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            <SectionCard {...section} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default IntroductionSection;
