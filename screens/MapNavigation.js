import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapNavigation = () => {
  const [pickupCoords, setPickupCoords] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setPickupCoords({ latitude, longitude });

      const response = await Location.reverseGeocodeAsync(location.coords);
      if (response.length > 0) {
        const { city, country } = response[0];
        setCurrentLocation(`${city}, ${country}`);
      }
    })();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        initialRegion={{
          latitude: pickupCoords ? pickupCoords.latitude : 37.7749,
          longitude: pickupCoords ? pickupCoords.longitude : -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        region={
          pickupCoords
            ? {
                latitude: pickupCoords.latitude,
                longitude: pickupCoords.longitude,
                latitudeDelta: 0.0255,
                longitudeDelta: 0.017,
              }
            : undefined
        }
      >
        {pickupCoords && (
          <Marker coordinate={pickupCoords} title="You are here!" />
        )}
      </MapView>

      <View className="absolute top-0 left-0 right-0 flex-row justify-center p-4 mt-[10%]">
        <View className="w-[80%] rounded-full bg-white border border-gray-300">
          <Image
            className="h-[30px] w-[30px] absolute ml-2 mt-2"
            source={require("../assets/icons/search.png")}
          />
          <TextInput
            className="rounded-full pl-10 pr-4 py-2"
            placeholder="Search"
          />
        </View>
      </View>

      <View className="h-[43%] rounded-tl-[30px] rounded-tr-[30px] bg-white shadow-xl">
        <Text className="my-8 mx-8 font-semibold text-[22px]">
          Set Location
        </Text>
        <Text className="text-gray-400 ml-8">Your Location</Text>
        <View className="flex-row items-center border-b border-gray-100 mt-3 ml-8">
          <View className="rounded-full h-[40px] w-[40px] justify-center items-center bg-red-200 mr-2 mb-1">
            <Image
              className="h-5 w-[16]"
              source={require("../assets/icons/location.png")}
            />
          </View>
          <TextInput
            style={{ flex: 1 }}
            value={currentLocation}
            placeholder="Current Location"
            editable={false}
          />
        </View>
        <Text className="text-gray-400 ml-8 mt-2">Meeting Location:</Text>
        <View className="flex-row items-center border-b border-gray-100 mt-3 ml-8">
          <View className="rounded-full h-[40px] w-[40px] justify-center items-center bg-red-200 mr-2 mb-1">
            <Image
              className="h-5 w-[16]"
              source={require("../assets/icons/location.png")}
            />
          </View>
          <TextInput
            style={{ flex: 1 }}
            value="This is the sample Destination"
            placeholder="Current Location"
            editable={false}
          />
        </View>
        <TouchableOpacity className="justify-center items-center my-8 ">
          <View className="items-center justify-center rounded-xl h-10 w-40 bg-red-200">
            <Text className="text-red-500 font-bold">Done</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapNavigation;
