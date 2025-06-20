import { BorderRadius } from '@/theme/borderRadius';
import { FontSize } from '@/theme/fonts';
import type { ColorType } from '@/theme';

export default (colors: ColorType) => ({
  typography: {
    default: FontSize.MEDIUM,
    smaller: FontSize.SMALL,
    subtext: FontSize.EXTRA_SMALL,
  },
  roundness: {
    default: BorderRadius.MEDIUM,
    rounded: BorderRadius.FULL,
  },
  colors: {
    primary: {
      border: colors.primary,
      borderHighlight: colors.onPrimary,
      borderDisabled: colors.primaryVariant,
      background: colors.primary,
      backgroundHighlight: colors.onPrimary,
      backgroundDisabled: colors.primaryVariant,
      label: colors.onPrimary,
      labelHighlight: colors.primary,
      labelDisabled: colors.onPrimary,
    },
    secondary: {
      border: colors.primary,
      borderHighlight: colors.primary,
      borderDisabled: colors.primaryVariant,
      background: colors.onPrimary,
      backgroundHighlight: colors.primary,
      backgroundDisabled: colors.onPrimary,
      label: colors.primary,
      labelHighlight: colors.onPrimary,
      labelDisabled: colors.primaryVariant,
    },
    tertiary: {
      border: colors.onPrimary,
      borderHighlight: colors.onPrimary,
      borderDisabled: colors.onPrimary,
      background: colors.palette.whiteTransparent,
      backgroundHighlight: colors.onPrimary,
      backgroundDisabled: colors.palette.whiteTransparent,
      label: colors.onBackground,
      labelHighlight: colors.primary,
      labelDisabled: colors.onPrimary,
    },
    text: {
      border: colors.palette.whiteTransparent,
      borderHighlight: colors.primaryVariant2,
      borderDisabled: colors.palette.whiteTransparent,
      background: colors.palette.whiteTransparent,
      backgroundHighlight: colors.primaryVariant2,
      backgroundDisabled: colors.palette.whiteTransparent,
      label: colors.primary,
      labelHighlight: colors.primary,
      labelDisabled: colors.primaryVariant,
    },
    'text-inline': {
      border: colors.palette.whiteTransparent,
      borderHighlight: colors.palette.whiteTransparent,
      borderDisabled: colors.palette.whiteTransparent,
      background: colors.palette.whiteTransparent,
      backgroundHighlight: colors.palette.whiteTransparent,
      backgroundDisabled: colors.palette.whiteTransparent,
      label: colors.primary,
      labelHighlight: colors.primary,
      labelDisabled: colors.primaryVariant,
    },
    custom: {
      border: colors.primary,
      borderHighlight: colors.primary,
      borderDisabled: colors.primary,
      background: colors.primaryVariant2,
      backgroundHighlight: colors.primary,
      backgroundDisabled: colors.primaryVariant2,
      label: colors.primary,
      labelHighlight: colors.onPrimary,
      labelDisabled: colors.primary,
    },
  },
  animationConfig: { duration: 200 },
  minElevationLevel: 0,
  maxElevationLevel: 4,
});
