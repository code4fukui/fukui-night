export const getLatLngFromGMap = async (url) => {
  // maps.app.goo.gl
  const req = await fetch(url);
  //console.log(req);
  //console.log(decodeURIComponent(req.url));
  const n = req.url.indexOf("!3d"); // !3d36.0629131!4d136.222347!16s
  const m = req.url.indexOf("!4d", n);
  const l = req.url.indexOf("!", m + 1);
  const lat = parseFloat(req.url.substring(n + 3, m));
  const lng = parseFloat(req.url.substring(m + 3, l));
  return { lat, lng };
};

/*
const url = "https://maps.app.goo.gl/sws74hTqNfseboHdA";
console.log(await getLatLngFromGMap(url));
// 36.0629131,136.222347
*/
