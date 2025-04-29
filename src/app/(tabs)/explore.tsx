import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  
  return (
    <Box flex={1}>
      <Text>{t('explore.title')}</Text>
    </Box>
  );
}
