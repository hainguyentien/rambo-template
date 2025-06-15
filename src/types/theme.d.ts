import { type Theme as NativeTheme } from '@react-navigation/native';
import type { ColorType, ComponentThemeType } from '@/theme';

declare global {
  namespace ReactNavigation {
    interface Theme extends NativeTheme {
      colors: NativeTheme['colors'] & ColorType;
      components: ComponentThemeType;
    }
  }
}
