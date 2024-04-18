import { checkTime } from "./checkTime.js";
import { Time } from "https://js.sabae.cc/DateTime.js";
import * as t from "https://deno.land/std/testing/asserts.ts";

Deno.test("simple", () => {
  t.assertEquals(checkTime("10:00〜20:00", "10:00"), true);
  t.assertEquals(checkTime("10:00〜20:00", "09:00"), false);
  t.assertEquals(checkTime("10:00〜20:00", "20:05"), false);
  t.assertEquals(checkTime("19:00〜2:00", "15:30:12"), false);
});
Deno.test("time", () => {
  t.assertEquals(checkTime("10:00〜20:00", new Time("10:00")), true);
  t.assertEquals(checkTime("10:00〜20:00", new Time("09:00")), false);
  t.assertEquals(checkTime("10:00〜20:00", new Time("20:05")), false);
  t.assertEquals(checkTime("19:00〜2:00", new Time("15:30:12")), false);
});
Deno.test("different", () => {
  t.assertEquals(checkTime("19:00~2:00", new Time("20:00")), true);
  t.assertEquals(checkTime("19:00~2:00", new Time("18:00")), false);
});
Deno.test("0:00", () => {
  t.assertEquals(checkTime("10:00〜0:00", "23:59"), true);
  t.assertEquals(checkTime("10:00〜0:00", "0:00"), false);
  t.assertEquals(checkTime("10:00〜0:00", "0:01"), false);
});
Deno.test("25:00", () => {
  t.assertEquals(checkTime("10:00〜25:00", "0:00"), true);
  t.assertEquals(checkTime("10:00〜25:00", "1:00"), false);
  t.assertEquals(checkTime("10:00〜25:00", "24:59"), true);
  t.assertEquals(checkTime("10:00〜25:00", "25:00"), false);
  t.assertEquals(checkTime("10:00〜25:00", "25:01"), false);
});
Deno.test("eternal", () => { // become 00:00
  t.assertEquals(checkTime("10:00〜", "10:00"), true);
  t.assertEquals(checkTime("10:00〜", "23:59"), true);
  t.assertEquals(checkTime("10:00〜", "0:00"), false);
  t.assertEquals(checkTime("10:00〜", "1:00"), false);
  t.assertEquals(checkTime("10:00〜", "25:00"), false);
  t.assertEquals(checkTime("10:00〜", "25:01"), false);
  t.assertEquals(checkTime("10:00〜", "8:00"), false);
});
Deno.test("multi", () => {
  t.assertEquals(checkTime("10:00〜12:00　13:00〜15:00", "10:01"), true);
  t.assertEquals(checkTime("10:00〜12:00　13:00〜15:00", "13:00"), true);
  t.assertEquals(checkTime("10:00〜12:00　13:00〜15:00", "12:30"), false);
  t.assertEquals(checkTime("10:00〜12:00　13:00〜15:00", "15:01"), false);
});
Deno.test("最終入店", () => {
  t.assertEquals(checkTime("11:00～22:00(L.O. 21:00)", "11:00"), true);
  t.assertEquals(checkTime("11:00～22:00(L.O. 21:00)", "10:00"), false);
  t.assertEquals(checkTime("11:00～22:00(L.O. 21:00)", "20:59"), true);
  t.assertEquals(checkTime("11:00～22:00(L.O. 21:00)", "21:00"), false);
  t.assertEquals(checkTime("11:00～22:00(L.O. 21:00)", "21:01"), false);
  t.assertEquals(checkTime("11:00～22:00(最終入店 21:00)", "21:01"), false);
});
