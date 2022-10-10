import { chakra } from '@chakra-ui/react';

const DiscordTimeStamp = ({ children }) => (
  <chakra.span
    sx={{
      lineHeight: '1.375rem',
      color: 'hsl(210,calc(2.9%),86.7%)',
      backgroundColor: 'hsla(217,calc(7.6%),33.5%,0.48)',
      borderRadius: '3px',
      padding: '0 2px',
    }}
  >
    {children}
  </chakra.span>
);

export default DiscordTimeStamp;
