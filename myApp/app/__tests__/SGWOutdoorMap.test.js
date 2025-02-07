import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SGWOutdoorMap from "../SGWOutdoorMap";
import useLocation from "../../hooks/useLocation";

// Mock the useLocation hook
jest.mock("../../hooks/useLocation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SGWOutdoorMap Component", () => {
  it("renders the map and SGW button", () => {
    useLocation.mockReturnValue({
      location: { latitude: 45.5, longitude: -73.6 },
      errorMsg: null,
      hasPermission: true,
    });

    const { getByA11yLabel, getByText } = render(<SGWOutdoorMap />);

    // Check if the map is rendered
    expect(getByA11yLabel("MapView")).toBeTruthy();

    // Check if the SGW button is present
    expect(getByText("SGW")).toBeTruthy();
  });

  it("shows permission popup when location permission is denied", () => {
    useLocation.mockReturnValue({
      location: null,
      errorMsg: "Permission to access location was denied",
      hasPermission: false,
    });

    const { getByText } = render(<SGWOutdoorMap />);

    // Check if the permission modal message is displayed
    expect(getByText("Location Permission Denied")).toBeTruthy();
    expect(
      getByText(
        "Location access is required to show your current location on the map. Please enable location permissions in your settings."
      )
    ).toBeTruthy();
  });

  it("closes the permission popup when the close button is pressed", () => {
    useLocation.mockReturnValue({
      location: null,
      errorMsg: "Permission to access location was denied",
      hasPermission: false,
    });

    const { getByText, queryByText } = render(<SGWOutdoorMap />);

    // Ensure modal is initially visible
    expect(getByText("Location Permission Denied")).toBeTruthy();

    // Simulate closing the modal
    fireEvent.press(getByText("X"));

    // Modal should disappear
    expect(queryByText("Location Permission Denied")).toBeNull();
  });
});
