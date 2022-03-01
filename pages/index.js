import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Stack,
  Checkbox,
  Input,
  Box,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import * as chrono from 'chrono-node';
import Output from '../components/Output';

export default function Home() {
  const [value, setValue] = useState('');
  const [showDate, setShowDate] = useState(true);
  const [showCountdown, setShowCountdown] = useState(true);
  const [output, setOutput] = useState('');
  const [parsedTime, setParseTime] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const [parsed] = chrono.parse(value);
    const parsedResult = parsed?.start?.date();
    const timestamp = parsedResult ? parsedResult.getTime() / 1000 : null;
    const countdown = showCountdown ? ` <t:${timestamp}:R>` : '';
    setParseTime(
      showDate
        ? parsedResult?.toLocaleString()
        : parsedResult?.toLocaleTimeString()
    );
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
      <Center
        bgImage={'url(background.svg)'}
        bgSize="cover"
        bgRepeat="no-repeat"
        minH="100vh"
        w="full"
      >
        <Box
          backdropFilter="auto"
          backdropBlur="8px"
          backdropBrightness="70%"
          rounded="3xl"
          padding="4"
          maxW="xl"
        >
          <Heading as="h1" mb="4" textAlign="center">
            ⌛ Discord Timestamp Maker ⌛
          </Heading>
          <Text color="gray.200" fontSize="sm">
            Enter a time in natural language to create timestamps (e.g. "5pm",
            "tomorrow 9pm", "8 UTC" or "10:30 IST")
          </Text>
          <Input
            value={value}
            onChange={handleChange}
            placeholder="enter time in natural language"
            rounded="lg"
            p="2"
            size="lg"
            my="4"
          />
          <Text>
            Result: <strong>{parsedTime}</strong>
          </Text>
          <Output output={output} />
          <Stack spacing={5} direction="row" mt="2">
            <Checkbox
              isChecked={showDate}
              onChange={(e) => setShowDate(e.target.checked)}
            >
              Show date
            </Checkbox>
            <Checkbox
              isChecked={showCountdown}
              onChange={(e) => setShowCountdown(e.target.checked)}
            >
              Show countdown
            </Checkbox>
          </Stack>
        </Box>
      </Center>
    </>
  );
}
