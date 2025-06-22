/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 *
 * Custom hook to retrieve theme colors based on the current color scheme.
 * Accepts props to override colors and falls back to default Colors object.
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the valid color keys for both light and dark themes
type ColorKeys = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorKeys
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = theme === 'light' ? props.light : props.dark;

  return colorFromProps || Colors[theme][colorName];
}