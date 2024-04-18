import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { Time } from "https://js.sabae.cc/DateTime.js";
import { checkTime } from "./checkTime.js";

const data = await CSV.fetchJSON("fukui-night_pos.csv");

const t = new Time("20:00");
for (const d of data) {
  const time = d.time;
  const b = checkTime(time, t);
  console.log(b, time, t);
}
