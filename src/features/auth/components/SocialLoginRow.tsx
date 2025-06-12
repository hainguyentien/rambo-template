import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import IconGoogleLogo from '@/assets/icons/GoogleLogo';
import IconFacebookLogo from '@/assets/icons/FacebookLogo';
import IconAppleLogo from '@/assets/icons/AppleLogo';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '@/lib/supabase';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Box } from '@/components/common/Layout/Box';

const SocialLoginRow = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    iosClientId:
      '301631509163-ba0fngceep6ovq0ai87jidgv6ne6spju.apps.googleusercontent.com',
  });

  const handleCreateUser = async ({
    userId,
    email,
  }: {
    userId: string;
    email: string;
  }) => {
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    if (userCheckError && userCheckError.code !== 'PGRST116') {
      throw new Error('Error checking email!');
    }
    if (existingUser) {
      throw new Error('Email is already taken!');
    }
    const { data: newUser, error: createUserError } = await supabase
      .from('users')
      .insert([{ id: userId, email, username: email.split('@')[0] }])
      .select('id')
      .single();

    if (createUserError) {
      throw new Error('Error creating user profile!');
    }
    return newUser;
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log('Play Services available');
      const userInfo = await GoogleSignin.signIn();
      console.log('User info:', userInfo);
      if (userInfo.data?.idToken) {
        const payload = JSON.parse(atob(userInfo.data.idToken.split('.')[1]));
        console.log('Payload:', payload);
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        console.log(error, data);
        if (data?.user?.id && data?.user?.email) {
          await handleCreateUser({
            userId: data.user.id,
            email: data.user.email,
          });
        }
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Apple Sign-In is not available on this device.');
        return;
      }
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));

        if (user?.id && user?.email) {
          await handleCreateUser({
            userId: user.id,
            email: user.email,
          });
        }
      } else {
        throw new Error('No identityToken.');
      }
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  return (
    <Box flexDirection="row" alignItems="center" gap={16}>
      <TouchableOpacity onPress={handleGoogleSignIn}>
        <IconGoogleLogo />
      </TouchableOpacity>
      <IconFacebookLogo />
      <TouchableOpacity onPress={handleAppleSignIn}>
        <IconAppleLogo />
      </TouchableOpacity>
    </Box>
  );
};

export default SocialLoginRow;
