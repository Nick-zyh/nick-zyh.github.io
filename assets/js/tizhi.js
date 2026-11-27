/* 中医体质测试 — 题目、计分与结果建议
 * 依据《中医体质分类与判定》九种体质框架设计的简化版（36 题）。
 * 计分：每题 1–5 分；转化分 = ((原始分 − 题数) / (题数 × 4)) × 100。
 * 判定（沿用标准口径）：偏颇体质转化分 ≥40 为“是”，30–39 为“倾向是”，<30 为“不是”；
 * 平和质转化分 ≥60 且其他体质均 <30 为平和质，≥60 且其他均 <40 为基本平和质。
 * 本测试仅供健康参考，不构成医疗诊断。
 */
(function (global) {
  "use strict";

  var SCALE = ["没有", "很少", "有时", "经常", "总是"];

  var TYPES = {
    pinghe: {
      name: "平和质",
      trait: "阴阳气血调和，精力充沛，睡眠良好，适应能力强，是较为健康的体质状态。",
      diet: "饮食有节，五味调和，多吃五谷杂粮与新鲜蔬果，少吃过冷、过热、过于油腻的食物，不暴饮暴食。",
      life: "起居有常，劳逸结合，保证充足睡眠，避免熬夜。",
      sport: "坚持适度运动，如散步、慢跑、太极拳，以身体微微出汗为宜。",
      mood: "保持心态平和，知足常乐，避免长期精神紧张。"
    },
    qixu: {
      name: "气虚质",
      trait: "元气不足，容易疲乏、气短懒言，动则出汗，抵抗力偏弱，容易感冒。",
      diet: "多吃益气健脾的食物，如山药、大枣、小米、黄豆、鸡肉、香菇；少吃生冷、油腻和耗气的食物，如空心菜、萝卜缨过量食用。",
      life: "起居有规律，避免过度劳累和熬夜，注意保暖，少吹冷风。",
      sport: "选择柔缓运动，如散步、八段锦、太极拳，避免大汗淋漓的剧烈运动。",
      mood: "避免过度思虑，学会放松，可听舒缓音乐调畅情志。"
    },
    yangxu: {
      name: "阳虚质",
      trait: "阳气不足，手脚发凉、怕冷，喜暖怕凉，吃凉食容易不适或腹泻。",
      diet: "多吃温阳食物，如羊肉、韭菜、核桃、生姜、桂圆；少吃生冷寒凉食物，如冰饮、西瓜、苦瓜过量食用。",
      life: "注意腰背、腹部和足部保暖，秋冬早睡晚起，多晒太阳。",
      sport: "选择阳光下进行的舒缓运动，如快走、慢跑、八段锦，运动后及时添衣。",
      mood: "多参与户外活动与社交，保持积极乐观，避免消沉。"
    },
    yinxu: {
      name: "阴虚质",
      trait: "阴液亏少，手足心热、口干咽燥，容易失眠、盗汗，大便偏干。",
      diet: "多吃滋阴润燥的食物，如百合、银耳、梨、鸭肉、芝麻、枸杞；少吃辛辣燥热食物，如辣椒、羊肉、煎炸食品。",
      life: "避免熬夜，夜间是养阴的关键时段；居室保持凉爽湿润。",
      sport: "选择中小强度运动，如游泳、瑜伽、太极，避免在炎热环境中大量出汗。",
      mood: "学会静养，练习书法、冥想等安神活动，避免急躁易怒。"
    },
    tanshi: {
      name: "痰湿质",
      trait: "痰湿凝聚，身体沉重困倦，腹部肥满，口中黏腻，痰多，油脂分泌偏多。",
      diet: "饮食清淡，多吃健脾利湿的食物，如薏苡仁、冬瓜、赤小豆、白萝卜；少吃甜食、油腻和生冷食物，戒酒限酒。",
      life: "居住环境保持干燥通风，衣着透气，出汗后及时擦干更衣。",
      sport: "坚持较长时间的有氧运动，如快走、慢跑、游泳，逐步控制体重。",
      mood: "多参加集体活动，培养兴趣爱好，避免久坐多思。"
    },
    shire: {
      name: "湿热质",
      trait: "湿热内蕴，面部油光、易生痤疮，口苦口臭，心烦易怒，大便黏滞、小便偏黄。",
      diet: "多吃清热利湿的食物，如绿豆、苦瓜、冬瓜、芹菜、薏苡仁；少吃辛辣、油炸、甜腻食物，严格限酒。",
      life: "居室通风干燥，避免熬夜和长期处于湿热环境，勤换贴身衣物。",
      sport: "适合较大强度的有氧运动，如中长跑、球类、游泳，帮助排汗祛湿。",
      mood: "学会疏泄情绪，避免郁怒化火，可通过运动、倾诉缓解烦躁。"
    },
    xueyu: {
      name: "血瘀质",
      trait: "血行不畅，面色偏暗，皮肤易见瘀斑，身体局部刺痛，唇色偏暗紫。",
      diet: "多吃活血化瘀的食物，如山楂、黑木耳、洋葱、玫瑰花茶；少吃寒凉、油腻和过咸食物。",
      life: "注意保暖，避免寒冷刺激久坐不动，睡前可温水泡脚促进循环。",
      sport: "坚持促进血液循环的运动，如舞蹈、瑜伽、太极拳、步行，避免久坐。",
      mood: "保持心情舒畅，气行则血行，避免长期压抑和焦虑。"
    },
    qiyu: {
      name: "气郁质",
      trait: "气机郁滞，情绪低落、闷闷不乐，容易紧张焦虑，胸胁胀满、爱叹气。",
      diet: "多吃行气解郁的食物，如玫瑰花、柑橘、萝卜、黄花菜、山楂；少喝浓茶咖啡，避免睡前饮食过饱。",
      life: "保证睡眠，居室明亮通风，多晒太阳，主动安排社交与外出。",
      sport: "多参加集体性、竞争性适度的运动，如球类、爬山、游泳，在运动中释放情绪。",
      mood: "主动倾诉与交流，培养幽默感，多听欢快音乐，多看喜剧与风景。"
    },
    tebing: {
      name: "特禀质",
      trait: "先天禀赋异常，容易过敏，常有喷嚏、鼻塞、哮喘或皮肤荨麻疹等过敏表现。",
      diet: "饮食清淡均衡，避开已知过敏原食物，如海鲜、花生等因人而异；少吃辛辣、腥膻发物。",
      life: "居室勤清洁除尘，花粉季减少外出并做好防护，随身留意过敏原接触史。",
      sport: "选择室内或环境清洁的运动，如瑜伽、游泳（注意消毒剂过敏者除外），循序渐进增强体质。",
      mood: "保持情绪稳定，过敏发作期避免焦虑，必要时及时就医规范治疗。"
    }
  };

  var ORDER = ["pinghe", "qixu", "yangxu", "yinxu", "tanshi", "shire", "xueyu", "qiyu", "tebing"];

  // 每种体质 4 题；pinghe 为正向表述（越常出现分越高），其余为症状表述。
  var QUESTIONS = [
    { type: "pinghe", text: "您精力充沛，日常活动不觉得累吗？" },
    { type: "pinghe", text: "您睡眠良好，醒后精神爽快吗？" },
    { type: "pinghe", text: "您适应能力强，季节冷热变化时不容易不舒服吗？" },
    { type: "pinghe", text: "您情绪稳定，很少焦虑或低落吗？" },
    { type: "qixu", text: "您容易疲乏，稍微活动就觉得累吗？" },
    { type: "qixu", text: "您说话声音低弱，气短、不爱说话吗？" },
    { type: "qixu", text: "您容易出汗，稍一活动就汗出吗？" },
    { type: "qixu", text: "您容易感冒，抵抗力较弱吗？" },
    { type: "yangxu", text: "您手脚发凉、怕冷吗？" },
    { type: "yangxu", text: "您胃脘部、背部或腰膝部怕冷、喜暖吗？" },
    { type: "yangxu", text: "您吃凉的东西容易不舒服或腹泻吗？" },
    { type: "yangxu", text: "您夜尿较多、小便清长吗？" },
    { type: "yinxu", text: "您手心脚心发热、心中烦热吗？" },
    { type: "yinxu", text: "您口干咽燥，总想喝水吗？" },
    { type: "yinxu", text: "您容易失眠、多梦或夜间盗汗吗？" },
    { type: "yinxu", text: "您大便干燥、皮肤偏干吗？" },
    { type: "tanshi", text: "您觉得身体沉重、困倦乏力吗？" },
    { type: "tanshi", text: "您腹部肥满松软、体重偏重吗？" },
    { type: "tanshi", text: "您额头油脂较多、面部油腻吗？" },
    { type: "tanshi", text: "您口中黏腻、痰多吗？" },
    { type: "shire", text: "您面部油光，容易长痘或疮疖吗？" },
    { type: "shire", text: "您口苦口臭、心烦易怒吗？" },
    { type: "shire", text: "您大便黏滞不爽、小便短黄吗？" },
    { type: "shire", text: "您皮肤容易出湿疹或瘙痒吗？" },
    { type: "xueyu", text: "您皮肤容易出现瘀斑、面色偏暗吗？" },
    { type: "xueyu", text: "您身体某些部位刺痛，且位置固定吗？" },
    { type: "xueyu", text: "您嘴唇颜色偏暗紫、眼眶偏黑吗？" },
    { type: "xueyu", text: "您皮肤粗糙干燥，或皮下静脉显露吗？" },
    { type: "qiyu", text: "您情绪低落、闷闷不乐吗？" },
    { type: "qiyu", text: "您容易紧张焦虑、多愁善感吗？" },
    { type: "qiyu", text: "您胸胁胀满、喜欢叹气吗？" },
    { type: "qiyu", text: "您咽喉有异物感，吞不下又吐不出吗？" },
    { type: "tebing", text: "您容易对药物、食物、花粉等过敏吗？" },
    { type: "tebing", text: "您没感冒时也会打喷嚏、鼻塞流涕吗？" },
    { type: "tebing", text: "您容易哮喘或呼吸不畅吗？" },
    { type: "tebing", text: "您皮肤容易起荨麻疹、发痒发红吗？" }
  ];

  // answers: 长度等于 QUESTIONS 的数组，每项 1–5；返回 { scores: {type: 转化分}, primary: key, verdicts: {type: '是'|'倾向是'|'不是'|'平和质'|'基本平和质'} }
  function computeResult(answers) {
    var raw = {}, count = {};
    ORDER.forEach(function (k) { raw[k] = 0; count[k] = 0; });
    QUESTIONS.forEach(function (q, i) {
      var v = answers[i];
      if (typeof v !== "number" || v < 1 || v > 5) throw new Error("第 " + (i + 1) + " 题未作答或分值无效");
      raw[q.type] += v; count[q.type] += 1;
    });
    var scores = {};
    ORDER.forEach(function (k) {
      scores[k] = Math.round(((raw[k] - count[k]) / (count[k] * 4)) * 100);
    });
    var verdicts = {};
    ORDER.forEach(function (k) {
      if (k === "pinghe") return;
      verdicts[k] = scores[k] >= 40 ? "是" : (scores[k] >= 30 ? "倾向是" : "不是");
    });
    var others = ORDER.filter(function (k) { return k !== "pinghe"; });
    var maxOther = Math.max.apply(null, others.map(function (k) { return scores[k]; }));
    var isPinghe = scores.pinghe >= 60 && maxOther < 30;
    var basicPinghe = scores.pinghe >= 60 && maxOther < 40;
    verdicts.pinghe = isPinghe ? "平和质" : (basicPinghe ? "基本平和质" : "不是");
    var primary;
    if (isPinghe || basicPinghe) {
      primary = "pinghe";
    } else {
      primary = others.reduce(function (a, b) { return scores[b] > scores[a] ? b : a; }, others[0]);
      if (scores[primary] < 30 && scores.pinghe >= 40) primary = "pinghe";
    }
    // 次要倾向：判定为“倾向是”或“是”、且不是主体质的，按分数降序
    var secondary = others.filter(function (k) {
      return k !== primary && scores[k] >= 30;
    }).sort(function (a, b) { return scores[b] - scores[a]; });
    return { scores: scores, verdicts: verdicts, primary: primary, secondary: secondary };
  }

  var api = { SCALE: SCALE, TYPES: TYPES, ORDER: ORDER, QUESTIONS: QUESTIONS, computeResult: computeResult };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.TizhiTest = api;

  /* ---------- 页面交互（仅在浏览器中运行） ---------- */
  if (typeof document === "undefined") return;

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("tizhi-form");
    if (!form) return;
    var listEl = document.getElementById("question-list");
    var progressEl = document.getElementById("progress-text");
    var barEl = document.getElementById("progress-bar");
    var errorEl = document.getElementById("form-error");
    var resultEl = document.getElementById("result");

    QUESTIONS.forEach(function (q, i) {
      var fs = document.createElement("fieldset");
      fs.className = "tizhi-q";
      fs.id = "q-" + i;
      var html = "<legend>" + (i + 1) + ". " + q.text + "</legend><div class='tizhi-opts'>";
      SCALE.forEach(function (label, j) {
        var v = j + 1;
        html += "<label class='tizhi-opt'><input type='radio' name='q" + i + "' value='" + v + "'><span>" + label + "</span></label>";
      });
      html += "</div>";
      fs.innerHTML = html;
      listEl.appendChild(fs);
    });

    function answeredCount() {
      var n = 0;
      QUESTIONS.forEach(function (_, i) {
        if (form.querySelector("input[name='q" + i + "']:checked")) n++;
      });
      return n;
    }
    function refreshProgress() {
      var n = answeredCount();
      progressEl.textContent = "已完成 " + n + " / " + QUESTIONS.length + " 题";
      barEl.style.width = (n / QUESTIONS.length * 100) + "%";
    }
    form.addEventListener("change", refreshProgress);
    refreshProgress();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var answers = [], firstMissing = -1;
      QUESTIONS.forEach(function (_, i) {
        var sel = form.querySelector("input[name='q" + i + "']:checked");
        answers.push(sel ? parseInt(sel.value, 10) : null);
        var fs = document.getElementById("q-" + i);
        if (!sel) { fs.classList.add("tizhi-missing"); if (firstMissing < 0) firstMissing = i; }
        else fs.classList.remove("tizhi-missing");
      });
      if (firstMissing >= 0) {
        errorEl.textContent = "还有题目没有作答，已为你标出，请完成第 " + (firstMissing + 1) + " 题等未答题目后再查看结果。";
        errorEl.style.display = "block";
        document.getElementById("q-" + firstMissing).scrollIntoView({ behavior: "smooth", block: "center" });
        resultEl.style.display = "none";
        return;
      }
      errorEl.style.display = "none";
      var r = computeResult(answers);
      var t = TYPES[r.primary];
      var rows = ORDER.map(function (k) {
        return "<div class='tizhi-score-row'><span class='tizhi-score-name'>" + TYPES[k].name + "</span>" +
          "<span class='tizhi-score-track'><span class='tizhi-score-fill' style='width:" + r.scores[k] + "%'></span></span>" +
          "<span class='tizhi-score-val'>" + r.scores[k] + " 分 · " + r.verdicts[k] + "</span></div>";
      }).join("");
      var sec = r.secondary.length ?
        "<p><strong>兼有倾向：</strong>" + r.secondary.map(function (k) { return TYPES[k].name + "（" + r.scores[k] + " 分）"; }).join("、") + "，调理时可一并参考其饮食与起居建议。</p>" : "";
      resultEl.innerHTML =
        "<h2>您的主体质倾向：" + t.name + "</h2>" +
        "<p>" + t.trait + "</p>" + sec +
        "<h3>九种体质得分</h3>" + rows +
        "<h3>个性化调理建议</h3>" +
        "<ul class='check-list'>" +
        "<li><strong>饮食：</strong>" + t.diet + "</li>" +
        "<li><strong>起居：</strong>" + t.life + "</li>" +
        "<li><strong>运动：</strong>" + t.sport + "</li>" +
        "<li><strong>情志：</strong>" + t.mood + "</li></ul>" +
        "<p class='tizhi-note'>说明：本测试为依据《中医体质分类与判定》框架设计的简化版（36 题），结果仅供日常健康调理参考，不构成医疗诊断；如有明显不适，请及时就医。您的答案只在本机浏览器中计算，不会上传或保存。</p>" +
        "<p><a href='#tizhi-top' class='button-large' id='tizhi-retake'>重新测试</a> <a href='https://docs.google.com/forms/d/e/1FAIpQLSd2BiUrU1f3hgsg5mBQ8t5VlSSggniOidL--pR0ziH0aRsrKA/viewform' class='button-large' target='_blank' rel='noopener'>想要针对性建议？填写AI智能问诊</a></p>";
      resultEl.style.display = "block";
      resultEl.scrollIntoView({ behavior: "smooth" });
      document.getElementById("tizhi-retake").addEventListener("click", function () {
        form.reset(); refreshProgress(); resultEl.style.display = "none";
      });
    });
  });
})(typeof window !== "undefined" ? window : globalThis);
