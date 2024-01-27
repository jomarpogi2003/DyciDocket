import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(`your travel api with coordinates`, {
      params: {
        bl_latitude: bl_lat ? bl_lat : "22.6130718985061",
        tr_latitude: tr_lat ? tr_lat : "22.83487362107337",
        bl_longitude: bl_lng ? bl_lng : "75.76570593509332",
        tr_longitude: tr_lng ? tr_lng : "75.96199394895491",
        restaurant_tagcategory_standalone: "10591",
        restaurant_tagcategory: "10591",
        limit: "30",
        currency: "USD",
        open_now: "false",
        lunit: "km",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": "key",
        "X-RapidAPI-Host": "rapid api",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
