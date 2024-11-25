import { type Theme as NativeTheme } from '@react-navigation/native';
import type { ColorType } from '@/theme/colors';

declare global {
  namespace ReactNavigation {
    interface Theme extends NativeTheme {
      colors: NativeTheme['colors'] & ColorType;
    }
  }
}
