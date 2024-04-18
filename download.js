import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const urls = [
  "https://fukui-night.com/store/store_cat/fukuiekimae/",
  "https://fukui-night.com/store/store_cat/katamachi/",
  "https://fukui-night.com/store/store_cat/hamamachi/",
  "https://fukui-night.com/store/store_cat/bunkyo/",
];

const data = [];

const parse = async (url) => {
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  //console.log(html);

  const area = dom.querySelector(".topTtl").text;

  const shops = dom.querySelectorAll("li .inner");
  console.log(shops.length);
  let no = 1;
  for (const i of shops) {
    const o = {};
    //o.pref = "福井県";
    //o.city = "福井市";
    o.area = area;
    o.category = i.querySelector(".cate span").text.trim();
    o.name = i.querySelector(".comTtl").text;
    o.oneword = i.querySelector(".onewordTxt").text;
    o.mainimage = i.querySelector(".mainImg img").getAttribute("src");
    o.address = i.querySelector(".address").text;
    o.time = i.querySelector(".time").text;
    o.price = i.querySelector(".yen").text;
    o.seats = i.querySelector(".seats").text;
    o.other = i.querySelector(".other")?.text;
    o.tel = i.querySelector(".telLink").text;
    o.gmap = i.querySelector(".mapLink").getAttribute("href");
    o.url = url + "#" + no;
    data.push(o);
    no++;
  }
  /*
		<div id="entry">
			<div class="container bunkyo">
				<h2 class="topTtl">文京エリア</h2>
				<ul class="list row w33">
															<li><div class="inner">
						<div class="cate"><span>洋</span></div>
						<div class="txtIn">
							<h3 class="comTtl">Le jardin</h3>
							<p class="onewordTxt">世界NO.1 フレンチシェフのレストラン</p>
						</div>
						<div class="mainImg">
																					<img src="https://fukui-night.com/wp-content/uploads/2024/04/ジャルダン.png" alt="店舗イメージ">
													</div>
						<div class="txtIn">
							<ul class="inList">
																<li class="address">福井市文京4-28-16</li>
																								<li class="time">11:30～15:30　18:00～23:00</li>
																								<li class="yen">昼 7,500～12,000円 夜 22,000～50,000円</li>
																								<li class="seats">39席</li>
																																<li class="other">個室、宴会場有</li>
															</ul>
							<div class="link">
								<a href="tel:0776-29-0026" class="telLink"><i class="icon-tel"></i>0776-29-0026</a>
								<a href="https://maps.app.goo.gl/z98d1yWU8VZGcZgq7" class="mapLink" target="_blank"><i class="icon-map"></i>MAP</a>
							</div>
						</div>
					</div></li>
									</ul>
			</div>
  */
};
for (const url of urls) {
  await parse(url);
}

await Deno.writeTextFile("fukui-night.csv", CSV.stringify(data));
