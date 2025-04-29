import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React, { useState } from 'react';
import TextField from '@/components/common/TextField/TextField';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Button/Spinner';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const [value, setValue] = useState('Value');
  const { t } = useTranslation();

  return (
    <Box flex={1} gap={8} padding={8}>
      <Text>
        {t('home.title')}{' '}
        <Button
          text="text-inline"
          variant="text-inline"
          onPress={() => {
            console.log('Press Text Inline Button');
          }}
        />
      </Text>
      <TextField
        label={'Test'}
        error={'Test error'}
        hint={'Hint'}
        left={<Ionicons size={20} name="home" style={{ padding: 8 }} />}
        value={value}
        onChange={() => { }}
      />
      <Spinner color="#000" />
      <Button
        variant="custom"
        onPress={() => {
          console.log('Press Custom Button');
        }}
      >
        <Text>Custom Text</Text>
      </Button>
      <Button
        text="Icon"
        icon={<Ionicons size={20} name="home" />}
        onPress={() => {
          console.log('Press Icon Button');
        }}
        size="medium"
      />
      <Button
        text="Primary Default"
        subtext="Primary Default Subtext"
        onPress={() => {
          console.log('Press Primary Default Button');
        }}
        size="default"
        style={{ backgroundColor: 'blue' }}
        rounded
      />
      <Button
        text="Primary Medium"
        subtext="Primary Medium Subtext"
        onPress={() => {
          console.log('Press Primary Medium Button');
        }}
        size="medium"
        style={{ backgroundColor: 'blue' }}
      />
      <Button
        text="Primary"
        onPress={() => {
          console.log('Press Primary Button');
        }}
        variant={'primary'}
      />
      <Button
        text="Secondary"
        onPress={() => {
          console.log('Press Secondary Button');
        }}
        variant={'secondary'}
      />
      <Button
        text="Tertiary"
        onPress={() => {
          console.log('Press Tertiary Button');
        }}
        variant={'tertiary'}
      />
      <Button
        text="Text"
        onPress={() => {
          console.log('Press Text Button');
        }}
        variant={'text'}
      />
    </Box>
  );
}
