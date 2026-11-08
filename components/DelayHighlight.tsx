import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { DepartureDelay } from '../src/domain/value-objects/DepartureDelay';

export interface DelayHighlightProps {
  delayInSeconds: number | null | undefined;
}

export function DelayHighlight({ delayInSeconds }: DelayHighlightProps) {
  const departureDelay = new DepartureDelay(delayInSeconds);
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (departureDelay.shouldAnimate) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: 0.25,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 1.0,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    } else {
      opacityAnimation.setValue(1.0);
    }
  }, [departureDelay.shouldAnimate, opacityAnimation]);

  const severityStyle =
    departureDelay.severity === 'ON_TIME'
      ? styles.onTimeText
      : departureDelay.severity === 'MINOR'
      ? styles.minorDelayText
      : styles.majorDelayText;

  return (
    <Animated.Text style={[styles.baseText, severityStyle, { opacity: opacityAnimation }]}>
      {departureDelay.formattedText}
    </Animated.Text>
  );
}

export default DelayHighlight;

const styles = StyleSheet.create({
  baseText: {
    fontSize: 13,
    fontWeight: '700',
  },
  onTimeText: {
    color: '#059669',
  },
  minorDelayText: {
    color: '#D97706',
  },
  majorDelayText: {
    color: '#DC2626',
  },
});
