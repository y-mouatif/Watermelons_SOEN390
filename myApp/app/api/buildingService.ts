import { getAllBuildings, getBuildingById } from "./buildingData";

// Get all building information
export const fetchAllBuildings = async () => {
  return getAllBuildings();
};

// Get details of a specific building by ID
export const fetchBuildingById = async (id: string) => {
  // Check if ID is invalid (null, undefined, empty, or not a string)
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new Error("Invalid building ID. Please provide a valid ID.");
  }

  // Find the building
  const building = getBuildingById(id);
  if (!building) {
    throw new Error("Building not found.");
  }
  return building;
};
