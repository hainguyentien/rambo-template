import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import React from 'react';
import TextField from '@/components/common/TextField/TextField';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Button/Spinner';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <Box flex={1}>
      <Text>
        This is a Home screen{' '}
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
        left={<Ionicons size={20} name="home" />}
        value={'Value'}
      />
      <Spinner color="#000" />
      <Button
        variant="custom"
        children={<Text>Custom Text</Text>}
        onPress={() => {
          console.log('Press Custom Button');
        }}
      />
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
          console.log('Press Icon Button');
        }}
        size="default"
        style={{ backgroundColor: 'yellow' }}
        rounded
      />
      <Button
        text="Primary Medium"
        subtext="Primary Medium Subtext"
        onPress={() => {
          console.log('Press Icon Button');
        }}
        size="medium"
        style={{ backgroundColor: 'yellow' }}
      />
      <Button
        text="Primary"
        onPress={() => {
          console.log('Press Icon Button');
        }}
        variant={'primary'}
      />
      <Button
        text="Secondary"
        onPress={() => {
          console.log('Press Icon Button');
        }}
        variant={'secondary'}
      />
      <Button
        text="Tertiary"
        onPress={() => {
          console.log('Press Icon Button');
        }}
        variant={'tertiary'}
      />
      <Button
        text="Text"
        onPress={() => {
          console.log('Press Icon Button');
        }}
        variant={'text'}
      />
    </Box>
  );
}
