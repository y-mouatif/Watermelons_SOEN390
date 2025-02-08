import React from "react";
import { render } from "@testing-library/react-native";
import SGWOutdoorMap from "../components/SGWOutdoorMap"; 
import useLocation from "../hooks/useLocation";

// Mock useLocation hook to return simple values
jest.mock("../hooks/useLocation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SGWOutdoorMap Component", () => {
  test("renders the map and SGW Campus marker", () => {
    useLocation.mockReturnValue({
      location: { latitude: 45.5, longitude: -73.6 },
      hasPermission: true,
      errorMsg: null,
    });

    const { getByText } = render(<SGWOutdoorMap />);
    
    // Check if the SGW Campus marker text appears
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
  });
});
