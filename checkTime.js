import { Time } from "https://js.sabae.cc/DateTime.js";

export const checkTime = (time, t) => {
  time = time.replace(/～/g, "〜");
  time = time.replace(/　/g, " ");
  // 17:30～ 20:30～
  if (time.endsWith("〜")) return true;
  // 11:00～22:00(L.O. 21:00)
  // 17:30〜24:00(最終入店 20:00
  const n = time.indexOf("("); // 最終入店 L.O.
  if (n >= 0) {
    const m = time.indexOf("〜");
    const l = time.indexOf(" ", n);
    const last = time.substring(l + 1, time.length - 1);
    const time2 = time.substring(0, m + 1) + last;
    return checkTimeOne(time2, t);
  }
  // 11:00〜14:00　17:30〜22:00
  const m = time.indexOf(" ");
  if (m >= 0) {
    const time1 = time.substring(0, m);
    const time2 = time.substring(m + 1);
    return checkTimeOne(time1, t) || checkTimeOne(time2, t);
  }
  return checkTimeOne(time, t);
};

export const checkTimeOne = (time, t) => {
  if (!(t instanceof Time)) t = new Time(t);
  const n = time.indexOf("〜");
  const st = new Time(time.substring(0, n));
  let end = new Time(time.substring(n + 1));
  if (!end.isAfter(st)) {
    end = end.add("24:00");
  }
  if ((t.isAfter(st) || t.equals(st)) && (t.isBefore(end) || t.equals(end)))
    return true;
  t = t.add("24:00");
  if ((t.isAfter(st) || t.equals(st)) && (t.isBefore(end) || t.equals(end)))
    return true;
  return false;
};
