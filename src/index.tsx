import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  ImageStyle,
  ScaledSize,
} from 'react-native';
import mapValues from 'lodash/mapValues';

type FunctionalStyles<T> = {
  [P in keyof T]: ({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => ViewStyle | TextStyle | ImageStyle;
};

export function create<T extends FunctionalStyles<T>>(
  styles: T | FunctionalStyles<T>
): () => StyleSheet.NamedStyles<T> {
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
        StyleSheet.create(
          mapValues(styles, function(s) {
            return s(dimensions);
          })
        ),
      [dimensions]
    );

    return compiledStyles;
  };
}
