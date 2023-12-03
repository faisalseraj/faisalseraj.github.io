import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';

import { BrandLogo } from '../icons/LogoIcon';
import { Fonts } from '@/theme';

// #b3dcff, #a5acaf, #dbebfa
// #dbebfa, #a5acaf, #b3dcff, 
// #dbebfa, #b3dcff, #a5acaf, 
const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false }); // Check for mobile view
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      color="black"
      p={4}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      bg={cardBgColor}
        // background={'linear-gradient( #b3dcff, #a5acaf, #dbebfa, #dbebfa, #a5acaf, #b3dcff, #dbebfa, #b3dcff, #a5acaf, #b3dcff, #a5acaf, #dbebfa, #dbebfa, #a5acaf, #b3dcff, #dbebfa, #b3dcff, #a5acaf, #b3dcff, #a5acaf, #dbebfa, #dbebfa, #a5acaf, #b3dcff, #dbebfa, #b3dcff, #a5acaf)'}

    >
      <Flex
        justify="space-between"
        align="center"
        width={'100%'}
      >
        <Box className="logo" >
          <BrandLogo />
        </Box>

        {isMobile ? (
          // Mobile View
          <Box onClick={() => console.log('Open mobile menu')}>
            {/* You can add a mobile menu icon here */}☰
          </Box>
        ) : (
          // Normal View
          <List
            fontFamily={Fonts.InknutAntiqua}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="50%"
            color={'#1c79c0'}
          >
            <ListItem  _hover={{ color: '#dbebfa' }}>Home</ListItem>
            <ListItem _hover={{ color: '#dbebfa' }}>About</ListItem>
            <ListItem _hover={{ color: '#dbebfa' }}>Team</ListItem>
            <ListItem _hover={{ color: '#dbebfa' }}>Services</ListItem>
            <ListItem _hover={{ color: '#dbebfa' }}>Learn more</ListItem>
          </List>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
