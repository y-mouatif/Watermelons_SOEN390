import { getAllBuildings, getBuildingById } from "./buildingData";

// Fetch all buildings 
export const fetchAllBuildings = () => getAllBuildings();

// Fetch a single building by ID
export const fetchBuildingById = (id: string) => {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new Error("❌ Invalid building ID. Please provide a valid ID.");
  }

  const building = getBuildingById(id);
  if (!building) {
    throw new Error(`❌ Building with ID "${id}" not found.`);
  }

  return building;
};

//Fix: Add default export
export default { fetchAllBuildings, fetchBuildingById };
