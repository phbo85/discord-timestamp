import { Box, Flex, chakra, Link, Spacer } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex w="full" p="6" bg="blackAlpha.700">
      <Box>
        Made with{' '}
        <chakra.span color="red" fontSize="xl">
          ♥
        </chakra.span>{' '}
        by{' '}
        <Link textDecoration="underline" href="https://philippo.dev">
          Philippo
        </Link>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Footer;
