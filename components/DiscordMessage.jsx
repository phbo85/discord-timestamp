import NextImage from 'next/image';
import { chakra, Box, Avatar, HStack, VStack } from '@chakra-ui/react';

const DiscordMessage = ({ children }) => (
  <Box bgColor="rgb(54,57,63)">
    <HStack spacing="4" pb="1" px="2" align="start" pt="2">
      <Avatar
        bg="red.500"
        size="md"
        icon={
          <NextImage src="/avatar.png" alt="avatar" width={48} height={48} />
        }
        overflow="hidden"
        sx={{
          overflow: 'hidden',
          flex: '0 0 auto',
        }}
      />
      <VStack spacing="1" align="start">
        <chakra.h3
          sx={{
            lineHeight: '1.375rem',
            minMeight: '1.375rem',
            color: 'hsl(214,calc(4%),65.3%)',
          }}
        >
          <chakra.span mr=".25rem">
            <chakra.span
              sx={{
                color: 'hsl(0,calc(0%),100%)',
                fontSize: '1rem',
                fontWeight: '500',
                lineHeight: '1.375rem',
              }}
            >
              Philippo
            </chakra.span>
          </chakra.span>
          <chakra.span
            sx={{
              fontSize: '0.75rem',
            }}
          >
            <time>
              Today at{' '}
              {new Date().toLocaleTimeString(undefined, {
                timeStyle: 'short',
              })}
            </time>
          </chakra.span>
        </chakra.h3>
        <Box pb="2">{children}</Box>
      </VStack>
    </HStack>
  </Box>
);

export default DiscordMessage;
