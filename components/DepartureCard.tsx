import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteNumber } from '../src/domain/value-objects/RouteNumber';
import { DelayHighlight } from './DelayHighlight';

export interface DepartureCardProps {
  routeId: number | string;
  headsign: string;
  theoreticalTime: string;
  delayInSeconds: number | null | undefined;
}

export function DepartureCard({
  routeId,
  headsign,
  theoreticalTime,
  delayInSeconds,
}: DepartureCardProps) {
  const routeNumber = new RouteNumber(routeId);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.routeBadge}>
        <Text style={styles.routeText}>{routeNumber.value}</Text>
      </View>

      <View style={styles.informationContainer}>
        <Text style={styles.headsignText} numberOfLines={1}>
          {headsign || 'Brak kierunku'}
        </Text>
        <Text style={styles.theoreticalTimeText}>
          Planowo: {theoreticalTime || '--:--'}
        </Text>
      </View>

      <View style={styles.delayContainer}>
        <DelayHighlight delayInSeconds={delayInSeconds} />
      </View>
    </View>
  );
}

export default DepartureCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  routeBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  routeText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 18,
  },
  informationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headsignText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  theoreticalTimeText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  delayContainer: {
    marginLeft: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
