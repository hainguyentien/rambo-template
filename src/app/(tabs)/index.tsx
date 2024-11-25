import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React from 'react';
import TextField from '@/components/common/TextField/TextField';

export default function HomeScreen() {
  return (
    <Box flex={1}>
      <Text>This is a Home screen</Text>
      <TextField label={'Test'} />
    </Box>
  );
}
