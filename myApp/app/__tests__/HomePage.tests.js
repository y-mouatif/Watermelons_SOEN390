import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomePage from '../components/HomePage';

// Create a mock for the push function
const mockPush = jest.fn();

// Mocking useRouter from expo-router to return the mock push function
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('Home page', () => {
    beforeEach(() => {
        // Clear mock history before each test
        mockPush.mockClear();
    });

    it('should load homepage on startup', () => {
        const page = render(<HomePage/>);
        const logo = page.getByTestId('logo');
        expect(logo).toBeTruthy();
    })

    it('should go to sgw campus when sgw campus button is pressed', () => {
        const page = render(<HomePage />);
        const sgwButton = page.getByTestId('sgwButton');
        fireEvent.press(sgwButton);
        expect(mockPush).toHaveBeenCalledWith('/SGWCampus');
    });

    it('should go to loyola campus when loyola campus button is pressed', () => {
        const page = render(<HomePage/>);
        const loyolaButton = page.getByTestId('loyolaButton');
        fireEvent.press(loyolaButton);
        expect(mockPush).toHaveBeenCalledWith('/LoyolaCampus');
    })
});
