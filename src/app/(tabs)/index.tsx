import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React, { useRef, useState } from 'react';
import TextField from '@/components/common/TextField/TextField';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Button/Spinner';
import { Ionicons } from '@expo/vector-icons';
import { useLingui } from '@lingui/react/macro';
import { useUnistyles } from 'react-native-unistyles';
import { TrueSheet } from '@lodev09/react-native-true-sheet';

export default function HomeScreen() {
  const [value, setValue] = useState('Value');
  const { t } = useLingui();
  const { theme } = useUnistyles();
  const { colors } = theme;

  const sheet = useRef<TrueSheet>(null);

  // Present the sheet ✅
  const present = async () => {
    await sheet.current?.present();
    console.log('horray! sheet has been presented 💩');
  };

  // Dismiss the sheet ✅
  const dismiss = async () => {
    await sheet.current?.dismiss();
    console.log('Bye bye 👋');
  };

  return (
    <Box flex={1} gap={8} padding={8}>
      <Button
        text="text-inline"
        variant="text-inline"
        onPress={() => {
          console.log('Press Text Inline Button');
        }}
      />
      <TextField
        label={t`Home`}
        error={'Test error'}
        hint={'Hint'}
        left={
          <Ionicons
            size={20}
            name="home"
            style={{ padding: 8 }}
            color={colors.onBackground}
          />
        }
        value={value}
        onChange={setValue}
      />
      <Spinner color="#000" />
      <Button
        text={'Custom'}
        variant="custom"
        onPress={() => {
          console.log('Press Custom Button');
        }}
      >
        <Text color={colors.primary}>Custom Text</Text>
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
        rounded
        contentStyle={{ backgroundColor: 'red' }}
      />
      <Button
        text="Primary Medium"
        subtext="Primary Medium Subtext"
        onPress={() => {
          console.log('Press Primary Medium Button');
        }}
        size="medium"
      />
      <Button
        text="Open bottom sheet"
        onPress={() => {
          console.log('Press Primary Button');
          present();
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
      <TrueSheet ref={sheet} detents={['auto', 1]} cornerRadius={24}>
        <Button onPress={dismiss} text="Dismiss" />
      </TrueSheet>
    </Box>
  );
}
