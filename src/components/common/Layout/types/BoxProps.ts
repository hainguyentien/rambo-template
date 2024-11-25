import type {
  MatrixTransform,
  PerspectiveTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
  TranslateXTransform,
  TranslateYTransform,
} from 'react-native';
import type { BackgroundProps } from './BackgroundProps';
import type { BorderProps } from './BorderProps';
import type { FlexboxProps } from './FlexProps';
import type { LayoutProps } from './LayoutProps';
import type { PositionProps } from './PosisionProps';
import type { SpaceProps } from './SpaceProps';

interface TransformProps {
  transform?: (
    | PerspectiveTransform
    | RotateTransform
    | RotateXTransform
    | RotateYTransform
    | RotateZTransform
    | ScaleTransform
    | ScaleXTransform
    | ScaleYTransform
    | TranslateXTransform
    | TranslateYTransform
    | SkewXTransform
    | SkewYTransform
    | MatrixTransform
  )[];
}

export interface BoxProps
  extends LayoutProps,
    FlexboxProps,
    SpaceProps,
    TransformProps,
    BackgroundProps,
    PositionProps,
    BorderProps {}
