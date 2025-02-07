import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SGWOutdoorMap from "../components/SGWOutdoorMap"; 
import useLocation from "../hooks/useLocation";

// Mock useLocation hook to control test behavior
jest.mock("../hooks/useLocation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SGWOutdoorMap Component", () => {
  test("renders the map correctly", () => {
    useLocation.mockReturnValue({
      location: { latitude: 45.5, longitude: -73.6 },
      hasPermission: true,
      errorMsg: null,
    });

    const { getByText } = render(<SGWOutdoorMap />);
    
    // Check if the SGW Campus marker exists
    expect(getByText("SGW Campus")).toBeTruthy();
  });

  test("shows permission modal when location access is denied", () => {
    useLocation.mockReturnValue({
      location: null,
      hasPermission: false,
      errorMsg: "Permission to access location was denied",
    });

    const { getByText } = render(<SGWOutdoorMap />);

    // Verify modal text appears
    expect(getByText("Location Permission Denied")).toBeTruthy();
    expect(getByText("Location access is required to show your current location on the map. Please enable location permissions in your settings.")).toBeTruthy();
  });

  test("closes permission modal when close button is pressed", () => {
    useLocation.mockReturnValue({
      location: null,
      hasPermission: false,
      errorMsg: "Permission to access location was denied",
    });

    const { getByText, queryByText } = render(<SGWOutdoorMap />);
    
    // Ensure the modal is initially visible
    expect(getByText("Location Permission Denied")).toBeTruthy();

    // Find and press the close button
    const closeButton = getByText("X");
    fireEvent.press(closeButton);

    // Modal should be removed
    expect(queryByText("Location Permission Denied")).toBeNull();
  });
});
