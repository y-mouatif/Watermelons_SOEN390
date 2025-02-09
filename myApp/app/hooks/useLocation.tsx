import * as Location from "expo-location";
import { useState, useEffect } from "react";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const useLocation = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setHasPermission(false);
        return;
      }

      setHasPermission(true);

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  return { location, errorMsg, hasPermission };
};

export default useLocation;
