// Import the functions we are testing
import React from "react";
import { fetchAllBuildings, fetchBuildingById } from "./buildingService";

describe("Building Service API", () => {
  /**
   *   Test Case 1: Fetch all buildings (Loyola & SGW)
   * - Calls fetchAllBuildings(), which should return all buildings.
   * - Ensures the returned list is not empty.
   * - Checks if the list contains a Loyola building (loy1) and an SGW building (sgw1).
   */
  test("fetchAllBuildings should return all buildings", async () => {
    const buildings = await fetchAllBuildings(); 

    // Expect at least one building in the list
    expect(buildings.length).toBeGreaterThan(0);

    // Ensure that the list contains buildings from both campuses
    expect(buildings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "loy1", name: "AD" }),  // Loyola Campus (valid id and name)
        expect.objectContaining({ id: "sgw1", name: "B" })  // SGW Campus (valid id and name)
      ])
    );
  });

  /**
   *   Test Case 2: Fetch a specific Loyola building by ID
   * - Calls fetchBuildingById("loy1") to fetch Administration Building.
   * - Ensures the returned object is not empty.
   * - Verifies that the returned object has the correct id` and name.
   */
  test("fetchBuildingById should return correct Loyola building", async () => {
    const building = await fetchBuildingById("loy1"); 

    expect(building).toBeDefined();
    expect(building.id).toBe("loy1");
    expect(building.name).toBe("AD");
  });

  /**
   *  Test Case 3: Fetch a specific SGW building by ID
   * - Calls fetchBuildingById(sgw1) to fetch B Annex.
   * - Ensures the returned object is not empty.
   * - Verifies that the returned object has the correct id and name.
   */
  test("fetchBuildingById should return correct SGW building", async () => {
    const building = await fetchBuildingById("sgw1"); 

    expect(building).toBeDefined();
    expect(building.id).toBe("sgw1");
    expect(building.name).toBe("B");
  });

  /**
   *  Test Case 4: Handle non-existent buildings (404 Not Found)
   * - Calls fetchBuildingById("sgw65") which is a non Existant id.
   * - The function should throw an error with message Building not found.
   */
  test("fetchBuildingById should return 404 Not Found for non-existent building", async () => {
    await expect(fetchBuildingById("sgw65")).rejects.toThrow(
      "Building not found."
    );
  });

  /**
   *  Test Case 5: Handle invalid input values (400 Bad Request)
   * - Calls fetchBuildingById(""), fetchBuildingById(null), and fetchBuildingById(undefined).
   * - These inputs are invalid and should trigger an error.
   */
  test("fetchBuildingById should return 400 Bad Request for invalid ID", async () => {
    await expect(fetchBuildingById("")).rejects.toThrow(
      "Invalid building ID. Please provide a valid ID."
    );
    await expect(fetchBuildingById(null as any)).rejects.toThrow(
      "Invalid building ID. Please provide a valid ID."
    );
    await expect(fetchBuildingById(undefined as any)).rejects.toThrow(
      "Invalid building ID. Please provide a valid ID."
    );
  });
});
