import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { getLatLngFromGMap } from "./getLatLngFromGMap.js";

const data = await CSV.fetchJSON("fukui-night.csv");
for (const d of data) {
  const { lat, lng } = await getLatLngFromGMap(d.gmap);
  d.lat = lat;
  d.lng = lng;
  console.log(d.name, lat, lng);
}

await Deno.writeTextFile("fukui-night_pos.csv", CSV.stringify(data));
