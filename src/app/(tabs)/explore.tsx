import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React from 'react';
import { useLingui } from '@lingui/react/macro';

export default function TabTwoScreen() {
  const { t } = useLingui();

  return (
    <Box flex={1}>
      <Text>{t`Explore`}</Text>
    </Box>
  );
}
