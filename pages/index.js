import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Stack,
  Spacer,
  Input,
  Box,
  Center,
  Heading,
  Switch,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
} from '@chakra-ui/react';
import * as chrono from 'chrono-node';
import Output from '../components/Output';
import Preview from '../components/Preview';
import Footer from '../components/Footer';

export default function Home() {
  const [value, setValue] = useState('');
  const [showDate, setShowDate] = useState(true);
  const [showCountdown, setShowCountdown] = useState(true);
  const [output, setOutput] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const [parsed] = chrono.parse(value);
    const parsedResult = parsed?.start?.date();
    const timestamp = parsedResult ? parsedResult.getTime() / 1000 : null;
    const countdown = showCountdown ? ` <t:${timestamp}:R>` : '';

    setOutput(
      timestamp ? `<t:${timestamp}:${showDate ? 'f' : 't'}>${countdown}` : null
    );
  }, [value, showDate, showCountdown]);

  return (
    <>
      <Head>
        <title>Discord Timestamp Maker</title>

        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⌛</text></svg>"
        />
      </Head>
      <VStack
        bgImage={'url(background.svg)'}
        bgSize="cover"
        bgRepeat="no-repeat"
        minH="100vh"
        w="full"
      >
        <Center minH="88vh">
          <Box
            backdropFilter="auto"
            backdropBlur="8px"
            backdropBrightness="50%"
            rounded="3xl"
            shadow="2xl"
            padding="4"
            maxW="xl"
          >
            <Heading as="h1" mb="6" textAlign="center">
              Discord Timestamp Maker
            </Heading>
            <VStack spacing="4">
              <FormControl>
                <FormLabel mb="1">Date and time</FormLabel>
                <Input
                  value={value}
                  onChange={handleChange}
                  placeholder="Enter time in natural language"
                  rounded="lg"
                  p="2"
                  size="lg"
                  borderColor="white"
                  bg="blackAlpha.500"
                />
                <FormHelperText>
                  Enter a time in natural language to create timestamps (e.g.{' '}
                  <i>5pm</i>, <i>tomorrow 9pm</i>, <i>8 UTC</i> or
                  <i> 10:30 IST</i>)
                </FormHelperText>
              </FormControl>
              <Stack spacing={4} direction="row" mt="2">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Show date</FormLabel>
                  <Switch
                    isChecked={showDate}
                    onChange={(e) => setShowDate(e.target.checked)}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Show countdown</FormLabel>
                  <Switch
                    isChecked={showCountdown}
                    onChange={(e) => setShowCountdown(e.target.checked)}
                  />
                </FormControl>
              </Stack>
              <Preview
                value={value}
                showCountdown={showCountdown}
                showDate={showDate}
              />
              <FormControl>
                <FormLabel mb="1">Code</FormLabel>
                <Output output={output} />
                <FormHelperText>
                  Copy this code and paste it into your discord message
                </FormHelperText>
              </FormControl>
            </VStack>
          </Box>
        </Center>
        <Spacer />
        <Footer />
      </VStack>
    </>
  );
}
