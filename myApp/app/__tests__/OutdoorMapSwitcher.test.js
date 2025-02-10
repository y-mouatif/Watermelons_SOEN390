import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OutdoorMapSwitcher from '../components/OutdoorMapSwitcher';
import { useLocalSearchParams } from 'expo-router';

// Mock the useLocalSearchParams hook
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

// Mock the child components with testID
jest.mock('../components/SGWOutdoorMap', () => {
  const { View } = require('react-native');
  return jest.fn((props) => <View testID="sgw-map" {...props} />);
});

jest.mock('../components/LoyolaOutdoorMap', () => {
  const { View } = require('react-native');
  return jest.fn((props) => <View testID="loyola-map" {...props} />);
});

describe('OutdoorMapSwitcher', () => {
  // Mock the initial campus parameter
  beforeEach(() => {
    useLocalSearchParams.mockReturnValue({ campus: 'SGW' });
  });

  it('renders correctly with SGW as the initial campus', () => {
    const { getByText, getByTestId } = render(<OutdoorMapSwitcher />);

    // Check if the title displays the correct campus
    expect(getByText('Current Campus: SGW')).toBeTruthy();

    // Check if the SGW map is rendered
    expect(getByTestId('sgw-map')).toBeTruthy();
  });

  it('switches campus to Loyola when the button is pressed', () => {
    const { getByText, getByTestId } = render(<OutdoorMapSwitcher />);

    // Press the switch button
    fireEvent.press(getByText('Switch Campus'));

    // Check if the title updates to Loyola
    expect(getByText('Current Campus: Loyola')).toBeTruthy();

    // Check if the Loyola map is rendered
    expect(getByTestId('loyola-map')).toBeTruthy();
  });

  it('switches campus back to SGW when the button is pressed again', () => {
    const { getByText, getByTestId } = render(<OutdoorMapSwitcher />);

    // Press the switch button twice
    fireEvent.press(getByText('Switch Campus')); // Switch to Loyola
    fireEvent.press(getByText('Switch Campus')); // Switch back to SGW

    // Check if the title updates back to SGW
    expect(getByText('Current Campus: SGW')).toBeTruthy();

    // Check if the SGW map is rendered again
    expect(getByTestId('sgw-map')).toBeTruthy();
  });
});