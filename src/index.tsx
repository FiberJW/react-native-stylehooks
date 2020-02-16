import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet as RNStyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  ImageStyle,
  ScaledSize,
} from 'react-native';
import mapValues from 'lodash/mapValues';

export type FunctionalStyleProperty = ({
  window,
  screen,
}: {
  window: ScaledSize;
  screen: ScaledSize;
}) => ViewStyle | TextStyle | ImageStyle;

export type FunctionalStyleObject<T> = {
  [P in keyof T]: FunctionalStyleProperty;
};

export function create<T extends FunctionalStyleObject<T>>(
  styles: T | FunctionalStyleObject<T>
): () => RNStyleSheet.NamedStyles<T> {
  return function useStyles() {
    const [dimensions, setDimensions] = useState({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen'),
    });

    const onChange = useCallback(function onChange({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) {
      setDimensions({ window, screen });
    },
    []);

    useEffect(function manageDimensionsEventListeners() {
      Dimensions.addEventListener('change', onChange);

      return () => Dimensions.removeEventListener('change', onChange);
    }, []);

    const compiledStyles = useMemo(
      () =>
        RNStyleSheet.create(
          mapValues(styles, function(s: FunctionalStyleProperty) {
            return s(dimensions);
          })
        ),
      [dimensions]
    );

    return compiledStyles;
  };
}

export const StyleSheet = {
  create,
};
