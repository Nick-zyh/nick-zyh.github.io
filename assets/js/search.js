(function () {
	var INDEX = [
		{ title: "中医体质测试", type: "功能", url: "tizhi.html", kw: "体质 测试 九种 平和 气虚 阳虚 阴虚 痰湿 湿热 血瘀 气郁 特禀 调理", desc: "36 道题，了解您的体质倾向与调理方向" },
		{ title: "AI 智能问诊", type: "功能", url: "https://docs.google.com/forms/d/e/1FAIpQLSd2BiUrU1f3hgsg5mBQ8t5VlSSggniOidL--pR0ziH0aRsrKA/viewform", kw: "问诊 辨证 症状 咨询 舌苔 睡眠 胃口", desc: "填写症状问卷，AI 辨证分析后联系您给出建议" },
		{ title: "上古天真论（黄帝内经 · 素问）", type: "古籍", url: "guji.html", kw: "黄帝内经 素问 上古天真论 养生 治未病 法于阴阳 食饮有节 起居有常 百岁", desc: "原文节选与白话解读：古人为何能度百岁乃去" },
		{ title: "人参", type: "药材", url: "yaocai.html#herb-renshen", kw: "人参 补气 元气 大补元气 疲劳 脾肺", desc: "甘、微苦，微温；大补元气，补脾益肺" },
		{ title: "黄芪", type: "药材", url: "yaocai.html#herb-huangqi", kw: "黄芪 补气 固表 止汗 出汗 利水", desc: "甘，微温；补气升阳，固表止汗" },
		{ title: "当归", type: "药材", url: "yaocai.html#herb-danggui", kw: "当归 补血 活血 调经 月经 润肠", desc: "甘、辛，温；补血活血，调经止痛" },
		{ title: "枸杞子", type: "药材", url: "yaocai.html#herb-gouqi", kw: "枸杞 枸杞子 明目 肝肾 眼睛 滋补", desc: "甘，平；滋补肝肾，益精明目" },
		{ title: "茯苓", type: "药材", url: "yaocai.html#herb-fuling", kw: "茯苓 祛湿 利水 健脾 宁心 失眠", desc: "甘、淡，平；利水渗湿，健脾宁心" },
		{ title: "甘草", type: "药材", url: "yaocai.html#herb-gancao", kw: "甘草 调和 解毒 止咳 补脾", desc: "甘，平；补脾益气，清热解毒，调和诸药" },
		{ title: "桂枝汤", type: "经方", url: "guji.html#fang-guizhi", kw: "桂枝汤 伤寒论 经方 调和营卫 感冒 发热 汗出", desc: "群方之冠：解肌发表，调和营卫" },
		{ title: "足三里", type: "针灸", url: "guji.html#xue-zusanli", kw: "足三里 穴位 针灸 艾灸 健脾 保健 按摩", desc: "强壮保健要穴：健脾和胃，扶正培元" },
		{ title: "四大经典", type: "古籍", url: "guji.html#sijing", kw: "四大经典 黄帝内经 难经 神农本草经 伤寒杂病论", desc: "中医理论体系的四大源头" },
		{ title: "民间养生", type: "养生", url: "guji.html#minjian", kw: "民间养生 食疗 生姜红枣茶 山药粥 食养", desc: "民间日常食养之法（仅供文化了解）" },
		{ title: "阴阳", type: "理论", url: "index.html", kw: "阴阳 阴阳平衡 对立统一", desc: "首页理论卡片：万物负阴而抱阳" },
		{ title: "五行相生相克", type: "理论", url: "index.html", kw: "五行 木火土金水 相生 相克", desc: "首页理论卡片：五脏与五行的对应" },
		{ title: "虚则补 · 实则泄", type: "理论", url: "index.html", kw: "虚 实 补 泄 治则 治法", desc: "首页理论卡片：基本治疗原则" },
		{ title: "寒者热之 · 热者寒之", type: "理论", url: "index.html", kw: "寒 热 温 凉 四气 治则", desc: "首页理论卡片：按寒热性质选药" }
	];
	function run(q) {
		var box = document.getElementById("search-results");
		q = (q || "").trim();
		if (!q) { box.innerHTML = ""; return; }
		var hits = INDEX.filter(function (e) {
			return (e.title + " " + e.kw + " " + e.desc).indexOf(q) !== -1;
		});
		if (!hits.length) {
			box.innerHTML = "<p>没有找到与「" + q + "」相关的内容，换个关键词试试。</p>";
			return;
		}
		var html = "<p>找到 " + hits.length + " 条结果：</p>";
		hits.forEach(function (e) {
			html += '<div class="classic" style="margin-bottom:.8em;"><strong>[' + e.type + '] <a href="' + e.url + '">' + e.title + "</a></strong><br />" + e.desc + "</div>";
		});
		box.innerHTML = html;
	}
	document.getElementById("search-form").addEventListener("submit", function (ev) {
		ev.preventDefault();
		run(document.getElementById("search-input").value);
	});
})();
