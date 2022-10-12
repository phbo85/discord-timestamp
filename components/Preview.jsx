import { useState, useEffect } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import * as chrono from 'chrono-node';
import DiscordMessage from '../components/DiscordMessage';
import DiscordTimeStamp from '../components/DiscordTimeStamp';

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const getRelativeTime = (d1 = new Date(), d2 = new Date()) => {
  const elapsed = d1 - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u == 'second')
      return rtf.format(Math.round(elapsed / units[u]), u);
  }
};

const Preview = ({ value, showDate, showCountdown }) => {
  const [parsedTime, setParsedTime] = useState();
  const [parsedCountdown, setParsedCountdown] = useState('');

  useEffect(() => {
    const [parsed] = chrono.parse(value);
    const parsedResult = parsed?.start?.date();

    setParsedTime(
      showDate
        ? parsedResult
            ?.toLocaleString(undefined, {
              dateStyle: 'long',
              timeStyle: 'short',
            })
            .replace('at', '')
        : parsedResult?.toLocaleTimeString(undefined, { timeStyle: 'short' })
    );

    setParsedCountdown(parsedResult ? getRelativeTime(parsedResult) : '');
  }, [value, showDate, showCountdown]);

  return (
    <FormControl>
      <FormLabel mb="1">Preview</FormLabel>
      <DiscordMessage>
        {parsedTime && (
          <>
            <DiscordTimeStamp>{parsedTime}</DiscordTimeStamp>{' '}
            {showCountdown && (
              <DiscordTimeStamp>{parsedCountdown}</DiscordTimeStamp>
            )}
          </>
        )}
      </DiscordMessage>
    </FormControl>
  );
};

export default Preview;
