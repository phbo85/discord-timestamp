import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
} from '@chakra-ui/react';

export default function Output({ output }) {
  const { hasCopied, onCopy } = useClipboard(output);

  return (
    <InputGroup>
      <Input value={output} isReadOnly />
      <InputRightElement width="4.5rem">
        <Button disabled={!output} onClick={onCopy} h="1.75rem" size="sm">
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
