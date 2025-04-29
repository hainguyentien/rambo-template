import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import { useLogin } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUser';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  // const loginMutation = useLogin();
  // const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  // const [email, setEmail] = useState<string>('user@example.com');
  // const [password, setPassword] = useState<string>('password');

  // const handleLogin = () => {
  //   loginMutation.mutate({ email, password });
  // };

  return (
    <Box flex={1}>
      <Text>{t('explore.title')}</Text>
    </Box>
  );
}
