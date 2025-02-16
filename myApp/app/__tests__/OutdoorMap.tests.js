// __tests__/OutdoorMapSwitch.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OutdoorMap from '../(tabs)/outdoor-map'; // Adjust this path as needed
import useLocation from '../hooks/useLocation';

// --- Minimal mocks ---

// Mock useLocation to always return a valid location with permission.
jest.mock('../hooks/useLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Minimal mock for react-native-maps so that Marker and Polygon render without errors.
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  // Dummy MapView that renders its children.
  const MapView = (props) => <View>{props.children}</View>;
  // Dummy Marker: render its title inside a View with a testID.
  const Marker = (props) => (
    <View testID={`marker-${props.title}`}>
      {props.title && <Text>{props.title}</Text>}
    </View>
  );
  // Dummy Polygon (used in OutdoorMap)
  const Polygon = (props) => <View testID={`polygon-${props.strokeColor}`} />;
  return {
    __esModule: true,
    default: MapView,
    Marker,
    Polygon,
  };
});

// Mock for vector icons to avoid font-loading errors.
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    MaterialIcons: (props) => React.createElement(Text, null, props.name),
  };
});

// --- The test ---

describe('OutdoorMap - Switch Campus button', () => {
  beforeEach(() => {
    // Provide a valid location with permission.
    useLocation.mockReturnValue({
      location: { latitude: 45.4951962, longitude: -73.5792229 },
      hasPermission: true,
    });
  });

  it('toggles campus when "Switch Campus" button is pressed', async () => {
    jest.setTimeout(10000); // Increase timeout
    const { getByText, getByTestId } = render(<OutdoorMap />);

    // Initially, the default campus should be SGW.
    expect(getByTestId('marker-SGW Campus')).toBeTruthy();
    expect(getByText('SGW')).toBeTruthy();

    // Press the "Switch Campus" button.
    fireEvent.press(getByText('Switch Campus'));

    // Wait for the campus to update to Loyola.
    await waitFor(() => {
      expect(getByTestId('marker-Loyola Campus')).toBeTruthy();
      expect(getByText('Loyola')).toBeTruthy();
    });

    // Press the "Switch Campus" button again to switch back.
    fireEvent.press(getByText('Switch Campus'));

    // Wait for the campus to switch back to SGW.
    await waitFor(() => {
      expect(getByTestId('marker-SGW Campus')).toBeTruthy();
      expect(getByText('SGW')).toBeTruthy();
    });
  });
});
