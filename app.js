(function () {
  const {
    defaults,
    ranges,
    feedingOptions,
    handGuide,
    nutrientCards,
    signals,
    principles,
    postWorkoutGuides,
    pilatesReasons,
    pilatesConcepts,
    pilatesExpectations,
    pilatesNutrition,
    foodCategories,
    foods,
    nutrientLookup
  } = window.APP_DATA;
  const storageKey = "nutrition-map-state-v1";
  const state = {
    activeTab: "map",
    expandedCard: nutrientCards[0].id,
    expandedPilatesCard: pilatesConcepts[0].id,
    foodCategory: "all",
    lookupNutrient: "碘",
    profile: loadProfile()
  };

  const app = document.getElementById("app");
  const tabButtons = Array.from(document.querySelectorAll(".tab-button"));

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      syncTabs();
      render();
    });
  });

  syncTabs();
  render();

  function loadProfile() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
      return {
        height: numberOr(saved.height, defaults.height),
        weight: numberOr(saved.weight, defaults.weight),
        age: numberOr(saved.age, defaults.age),
        feeding: feedingOptions.some((option) => option.id === saved.feeding) ? saved.feeding : defaults.feeding
      };
    } catch (error) {
      return { ...defaults };
    }
  }

  function saveProfile() {
    window.localStorage.setItem(storageKey, JSON.stringify(state.profile));
  }

  function numberOr(value, fallback) {
    return Number.isFinite(Number(value)) ? Number(value) : fallback;
  }

  function syncTabs() {
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
    });
  }

  function render() {
    if (state.activeTab === "goals") {
      renderGoalsTab();
      return;
    }

    if (state.activeTab === "foods") {
      renderFoodsTab();
      return;
    }

    if (state.activeTab === "pilates") {
      renderPilatesTab();
      return;
    }

    renderMapTab();
  }

  function renderGoalsTab() {
    const profile = state.profile;
    const totals = calculateTargets(profile);

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>我的目标</h2>
          <p>这部分设置一次就够了。数字只是参考范围，不是你每天都要完成的作业。</p>
        </div>
        <div class="card">
          <div class="range-grid" id="range-grid"></div>
          <p class="helper-copy">
            混合喂养的产奶量大约是全母乳的一半，额外热量需求也相应减半。按自己实际情况选，不需要特别精确。
          </p>
          <div class="feed-grid" id="feed-grid"></div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>每日参考数字</h3>
          <p>基于 Mifflin-St Jeor 公式、轻运动活动系数 1.3，以及你当前的喂养方式。</p>
        </div>
        <div class="metric-grid">
          ${metricCard("热量", formatNumber(totals.calories), "kcal", "已经把哺乳额外需求算进去了")}
          ${metricCard("蛋白质", formatNumber(totals.protein), "g", "每餐一掌蛋白质，通常就很接近")}
          ${metricCard("脂肪", formatNumber(totals.fat), "g", "占总热量约 28%，不用怕吃油")}
          ${metricCard("碳水", formatNumber(totals.carbs), "g", "把主食吃够，奶量和恢复都更稳")}
        </div>
        <div class="goal-highlight">
          <p>${buildSummary(profile, totals)}</p>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>手型估量法</h3>
          <p>不想称重时，用手就够了。目标是建立直觉，不是追求完美。</p>
        </div>
        <div class="hand-grid">
          ${handGuide.map((item) => `
            <article class="hand-card">
              <div class="hand-mark" aria-hidden="true">${item.mark}</div>
              <strong>${item.name} · ${item.portion}</strong>
              <p>${item.detail}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;

    mountRangeInputs();
    mountFeedOptions();
  }

  function renderMapTab() {
    app.innerHTML = `
      <div class="identity-bar">产后哺乳期 · 普拉提练习者 · 你的专属营养地图</div>

      <section class="section">
        <div class="section-header">
          <h2>这个阶段，你只需要盯住这 5 个</h2>
          <p>不需要背一整本营养学。先抓最重要的几个点，直觉就会慢慢长出来。</p>
        </div>
        <div class="accordion-list">
          ${nutrientCards.map((card) => `
            <article class="accordion-item ${state.expandedCard === card.id ? "is-open" : ""}">
              <button class="accordion-trigger" type="button" data-card-id="${card.id}">
                <div class="accordion-topline">
                  <div class="accordion-title">
                    <span class="tag ${card.id === "dha" ? "fatty" : card.id === "protein" ? "b-vitamin" : "mineral"}">${card.tag}</span>
                    <strong>${card.name}</strong>
                  </div>
                  <span class="accordion-caret" aria-hidden="true">⌄</span>
                </div>
                <p class="accordion-summary">${card.summary}</p>
              </button>
              <div class="accordion-content">
                <p>${card.why}</p>
                <ul>
                  ${card.foods.map((food) => `<li>${food}</li>`).join("")}
                </ul>
                <div class="tip-box">小提示：${card.tip}</div>
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>感觉不对劲时，对照这里</h3>
          <p>身体常常已经在提醒你了，只是我们习惯把它当成“最近太累”。</p>
        </div>
        <div class="signals-grid">
          ${signals.map((signal) => `
            <article class="signal-card">
              <strong>感觉 ${signal.feeling}</strong>
              <p>→ ${signal.action}</p>
            </article>
          `).join("")}
        </div>
      </section>
      <section class="section">
        <div class="section-header">
          <h3>记住这 5 条，就够了</h3>
          <p>比起“吃得完美”，更重要的是这几条原则你能轻松重复。</p>
        </div>
        <div class="principles-list">
          ${principles.map((principle, index) => `
            <article class="principle-item">
              <div class="principle-number">${index + 1}</div>
              <p>${principle}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;

    app.querySelectorAll("[data-card-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.expandedCard = state.expandedCard === button.dataset.cardId ? "" : button.dataset.cardId;
        renderMapTab();
      });
    });
  }

  function renderPilatesTab() {
    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>普拉提</h2>
          <p>这不是普拉提百科，而是专门写给你这个阶段的身体连接指南。</p>
        </div>
        <div class="recovery-grid">
          ${pilatesReasons.map((item) => `
            <article class="recovery-card recovery-${item.accent}">
              <strong>${item.title}</strong>
              <p>${item.summary}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>三个概念，用身体感知来理解</h3>
          <p>先理解它在练什么，你对动作的感觉会快很多。</p>
        </div>
        <div class="accordion-list">
          ${pilatesConcepts.map((card) => `
            <article class="accordion-item ${state.expandedPilatesCard === card.id ? "is-open" : ""}">
              <button class="accordion-trigger" type="button" data-pilates-card-id="${card.id}">
                <div class="accordion-topline">
                  <div class="accordion-title">
                    <strong>${card.title}</strong>
                  </div>
                  <span class="accordion-caret" aria-hidden="true">⌄</span>
                </div>
                <p class="accordion-summary">${card.summary}</p>
              </button>
              <div class="accordion-content">
                <p>${card.body}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>前几周，你可能会有这些感受</h3>
          <p>这些体验里，有些是正常适应，有些值得及时留意。</p>
        </div>
        <div class="expectation-grid">
          <article class="expectation-card">
            <div class="expectation-badge good">正常的 ✓</div>
            <ul class="expectation-list">
              ${pilatesExpectations.normal.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="expectation-card">
            <div class="expectation-badge warn">需要留意 ⚠</div>
            <ul class="expectation-list">
              ${pilatesExpectations.warning.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        </div>
        <div class="timeline-list">
          ${pilatesExpectations.timeline.map((item) => `
            <article class="timeline-item">
              <div class="timeline-stage">${item.stage}</div>
              <div class="timeline-duration">${item.duration}</div>
              <p>${item.result}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>运动和吃，是一件事</h3>
          <p>把普拉提和营养放在一起看，你会更容易理解身体为什么会这样反应。</p>
        </div>
        <div class="recovery-grid">
          <article class="recovery-card recovery-green">
            <strong>练前 · ${pilatesNutrition.before.title}</strong>
            <p>${pilatesNutrition.before.body}</p>
          </article>
          <article class="recovery-card recovery-peach">
            <strong>练后 · ${pilatesNutrition.after.title}</strong>
            <p>${pilatesNutrition.after.body}</p>
          </article>
        </div>
        <div class="principles-list">
          ${pilatesNutrition.principles.map((item, index) => `
            <article class="principle-item">
              <div class="principle-number">${index + 1}</div>
              <p>${item}</p>
            </article>
          `).join("")}
        </div>
        <div class="pilates-signal-table">
          ${pilatesNutrition.signals.map((item) => `
            <article class="pilates-signal-row">
              <strong>${item.feeling}</strong>
              <p>可能原因：${item.reason}</p>
              <span>${item.target}</span>
            </article>
          `).join("")}
        </div>
      </section>
    `;

    app.querySelectorAll("[data-pilates-card-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.expandedPilatesCard = state.expandedPilatesCard === button.dataset.pilatesCardId ? "" : button.dataset.pilatesCardId;
        renderPilatesTab();
      });
    });
  }

  function renderFoodsTab() {
    const filteredFoods = state.foodCategory === "all"
      ? foods
      : foods.filter((food) => food.category === state.foodCategory);
    const lookupItems = nutrientLookup[state.lookupNutrient] || [];

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>食物直觉</h2>
          <p>多看几次，你就会慢慢形成“吃这个，大概是在补那个”的视觉记忆。</p>
        </div>
        <div class="chip-row" id="category-row">
          ${foodCategories.map((category) => `
            <button
              class="chip ${state.foodCategory === category.id ? "is-active" : ""}"
              type="button"
              data-category="${category.id}"
            >
              ${category.label}
            </button>
          `).join("")}
        </div>
        <div class="food-grid">
          ${filteredFoods.map((food) => `
            <article class="food-card">
              <div class="food-illustration" aria-hidden="true">${foodIllustrationSvg(food.art)}</div>
              <div class="food-head">
                <div class="food-topline">
                  <strong>${food.name}</strong>
                  <div class="food-meta-line">
                    <span>${food.portion}</span>
                    <span class="food-calories-inline">热量 ${food.calories} kcal</span>
                  </div>
                </div>
              </div>
              <div class="macro-grid">
                ${macroItem("蛋白质", food.macros.protein)}
                ${macroItem("碳水", food.macros.carbs)}
                ${macroItem("脂肪", food.macros.fat)}
              </div>
              <div class="tag-row">
                ${food.tags.map((tag) => `<span class="tag ${tag.type}">${tag.label}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>缺某个营养素？先看这些食物</h3>
          <p>先选营养素，再给自己几个最容易执行的食物选项。</p>
        </div>
        <div class="chip-row" id="lookup-row">
          ${Object.keys(nutrientLookup).map((nutrient) => `
            <button
              class="chip ${state.lookupNutrient === nutrient ? "is-active" : ""}"
              type="button"
              data-nutrient="${nutrient}"
            >
              ${nutrient}
            </button>
          `).join("")}
        </div>
        <div class="lookup-panel">
          ${lookupItems.length
            ? lookupItems.map((item) => `
                <article class="lookup-item">
                  <strong>${item.food}</strong>
                  <p>${item.tip}</p>
                </article>
              `).join("")
            : '<div class="empty-state">这里暂时还没有内容。</div>'}
        </div>
      </section>
    `;

    app.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.foodCategory = button.dataset.category;
        renderFoodsTab();
      });
    });

    app.querySelectorAll("[data-nutrient]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lookupNutrient = state.lookupNutrient === button.dataset.nutrient ? "" : button.dataset.nutrient;
        if (!state.lookupNutrient) {
          state.lookupNutrient = Object.keys(nutrientLookup)[0];
        }
        renderFoodsTab();
      });
    });
  }

  function mountRangeInputs() {
    const rangeGrid = document.getElementById("range-grid");

    rangeGrid.innerHTML = Object.entries(ranges).map(([key, config]) => `
      <label class="range-card">
        <div class="range-header">
          <span class="range-title">${config.label}</span>
          <span class="range-value">${formatRangeValue(state.profile[key], config.unit)}</span>
        </div>
        <input
          type="range"
          min="${config.min}"
          max="${config.max}"
          step="${config.step}"
          value="${state.profile[key]}"
          data-range-key="${key}"
        />
      </label>
    `).join("");

    rangeGrid.querySelectorAll("[data-range-key]").forEach((input) => {
      input.addEventListener("input", (event) => {
        const key = event.target.dataset.rangeKey;
        state.profile[key] = Number(event.target.value);
        saveProfile();
        renderGoalsTab();
      });
    });
  }

  function mountFeedOptions() {
    const container = document.getElementById("feed-grid");
    container.innerHTML = feedingOptions.map((option) => `
      <button
        class="feed-option ${state.profile.feeding === option.id ? "is-selected" : ""}"
        type="button"
        data-feeding="${option.id}"
      >
        <strong>${option.label}</strong>
        <span>${option.hint}</span>
      </button>
    `).join("");

    container.querySelectorAll("[data-feeding]").forEach((button) => {
      button.addEventListener("click", () => {
        state.profile.feeding = button.dataset.feeding;
        saveProfile();
        renderGoalsTab();
      });
    });
  }

  function calculateTargets(profile) {
    const feeding = feedingOptions.find((option) => option.id === profile.feeding) || feedingOptions[1];
    const bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) - 161;
    const calories = (bmr * 1.3) + feeding.energyBonus;
    const protein = (profile.weight * 1.3) + feeding.proteinBonus;
    const fat = (calories * 0.28) / 9;
    const carbs = (calories - (protein * 4) - (fat * 9)) / 4;

    return {
      calories,
      protein,
      fat,
      carbs
    };
  }

  function buildSummary(profile, totals) {
    const feeding = feedingOptions.find((option) => option.id === profile.feeding) || feedingOptions[1];
    return `你每天需要约 ${formatNumber(totals.calories)} kcal，蛋白质目标约 ${formatNumber(totals.protein)}g。${feeding.label}的额外需求已经算进去了，所以你不用再自己手动加一遍。`;
  }

  function metricCard(label, value, unit, hint) {
    return `
      <article class="metric-card card">
        <span class="metric-label">${label}</span>
        <div>
          <span class="metric-value">${value}</span>
          <span class="metric-unit">${unit}</span>
        </div>
        <p class="tiny-copy">${hint}</p>
      </article>
    `;
  }

  function formatNumber(value) {
    return Math.round(value);
  }

  function macroItem(label, value) {
    return `
      <div class="macro-item">
        <span>${label}</span>
        <strong>${value}g</strong>
      </div>
    `;
  }

  function foodIllustrationSvg(type) {
    const illustrations = {
      salmon: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF2EC"/>
          <ellipse cx="32" cy="33" rx="18" ry="11" fill="#FF9E82"/>
          <ellipse cx="31" cy="33" rx="13" ry="7.5" fill="#FFD4C5"/>
          <path d="M45 33l8-6v12l-8-6z" fill="#FF8A6B"/>
          <circle cx="23" cy="30" r="1.8" fill="#073118"/>
          <path d="M25 36c2 1.7 6 1.7 8 0" stroke="#E07058" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      beef: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF1EE"/>
          <path d="M20 22c6-6 19-6 24 0 6 6 4 18-3 23-7 6-18 6-24 0-6-6-4-17 3-23z" fill="#D86D58"/>
          <path d="M26 27c2-2 7-2 10 0 2 2 2 6 0 8-3 3-8 3-10 0-2-2-2-6 0-8z" fill="#F8C2B4"/>
          <path d="M20 37c4 3 8 4 13 4" stroke="#F8C2B4" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      chicken: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF7E4"/>
          <path d="M18 38c0-8 6-15 14-15 7 0 13 6 13 13s-6 11-13 11c-8 0-14-3-14-9z" fill="#F3BC59"/>
          <circle cx="45" cy="27" r="4.8" fill="#FFF8ED"/>
          <circle cx="49" cy="23" r="2.8" fill="#FFF8ED"/>
          <path d="M20 39c3 4 11 6 18 4" stroke="#E0972D" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      shrimp: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF1EC"/>
          <path d="M42 21c-9 0-17 7-17 16 0 4 2 8 5 11 2 2 6 3 9 0l5-4c2-2 2-5 0-7l-2-2c-1-1-1-3 0-4l4-4c2-2 0-6-4-6z" fill="#FF9B86"/>
          <circle cx="38.5" cy="26.5" r="1.8" fill="#073118"/>
          <path d="M27 38c4 3 10 3 15 0" stroke="#E87660" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      tofu: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#EFFAF1"/>
          <rect x="18" y="20" width="28" height="24" rx="7" fill="#FFFDF8"/>
          <rect x="24" y="16" width="22" height="24" rx="7" fill="#C5E5CE"/>
          <circle cx="29" cy="28" r="2" fill="#9BC7A6"/>
          <circle cx="38" cy="24" r="1.8" fill="#9BC7A6"/>
        </svg>
      `,
      broccoli: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#EFFAF1"/>
          <path d="M30 24c2-5 11-5 13 0 5-2 10 2 10 8 0 5-4 9-10 9H22c-5 0-9-3-9-8 0-6 6-10 11-8 1-4 4-6 6-6z" fill="#5FA86E"/>
          <rect x="29" y="38" width="6" height="12" rx="3" fill="#97C57D"/>
        </svg>
      `,
      spinach: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#EFFAF1"/>
          <path d="M31 16c9 2 15 11 13 21-2 9-11 15-20 13-9-2-14-11-12-20 2-10 10-16 19-14z" fill="#70BA79"/>
          <path d="M23 41c5-6 10-13 16-20" stroke="#DFF7D7" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
      `,
      pea: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#F2FAEA"/>
          <path d="M18 38c5-9 14-13 28-12-3 12-11 18-24 18-3 0-5-3-4-6z" fill="#8BC267"/>
          <circle cx="27" cy="35" r="3.8" fill="#C6E88B"/>
          <circle cx="35" cy="34" r="3.8" fill="#B5DD77"/>
          <circle cx="43" cy="34" r="3.8" fill="#A5D767"/>
        </svg>
      `,
      carrot: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF5EA"/>
          <path d="M26 18l6 4 6-4-2 8 3 4c2 3 1 8-2 10L28 47c-4 2-8 0-10-3-2-3-1-7 2-10l4-3 2-13z" fill="#F19A42"/>
          <path d="M28 18c2-3 5-5 8-6" stroke="#72B77A" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M34 18c2-4 5-6 9-7" stroke="#8FD29B" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      `,
      mushroom: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FBF4EC"/>
          <path d="M18 31c0-8 6-13 14-13s14 5 14 13H18z" fill="#BE9470"/>
          <rect x="28" y="31" width="8" height="14" rx="4" fill="#F5E7D9"/>
          <circle cx="25" cy="26" r="2" fill="#F1D6BE"/>
          <circle cx="33" cy="23" r="2" fill="#F1D6BE"/>
          <circle cx="40" cy="27" r="2" fill="#F1D6BE"/>
        </svg>
      `,
      rice: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF8EC"/>
          <path d="M18 38h28c0 7-5 12-14 12s-14-5-14-12z" fill="#D7C087"/>
          <path d="M19 35c0-6 6-11 13-11s13 5 13 11H19z" fill="#FFF9F0"/>
          <path d="M25 29l2-3M32 28l0-3M39 29l-2-3" stroke="#E7DFC6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      oats: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF7EA"/>
          <path d="M18 38h28c0 7-5 12-14 12s-14-5-14-12z" fill="#D6B06D"/>
          <path d="M21 34c3-5 7-8 11-8s8 3 11 8H21z" fill="#F4E2B5"/>
          <circle cx="27" cy="35" r="1.4" fill="#D8B46E"/>
          <circle cx="32" cy="33" r="1.4" fill="#D8B46E"/>
          <circle cx="37" cy="35" r="1.4" fill="#D8B46E"/>
        </svg>
      `,
      beans: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#F8F2EC"/>
          <ellipse cx="24" cy="35" rx="7" ry="9" fill="#A53D46"/>
          <ellipse cx="34" cy="29" rx="7" ry="9" fill="#2F3130"/>
          <ellipse cx="42" cy="37" rx="7" ry="9" fill="#7A2F42"/>
          <path d="M22 33c1-1 2-1 3-1" stroke="#D97F87" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M32 27c1-1 2-1 3-1" stroke="#7A7F7B" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `,
      "sweet-potato": `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#F7EFFD"/>
          <path d="M19 38c0-9 9-16 19-16 7 0 12 4 12 10 0 9-10 16-20 16-6 0-11-4-11-10z" fill="#A56BD6"/>
          <path d="M25 33c3-2 7-4 10-4" stroke="#D9BFF6" stroke-width="2" stroke-linecap="round"/>
          <path d="M28 40c3-2 7-4 10-4" stroke="#D9BFF6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      egg: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF9ED"/>
          <path d="M32 18c8 0 14 10 14 20 0 8-6 14-14 14s-14-6-14-14c0-10 6-20 14-20z" fill="#FFFDF7"/>
          <circle cx="32" cy="37" r="6.5" fill="#FFD562"/>
        </svg>
      `,
      milk: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#EEF5FF"/>
          <path d="M26 18h12l3 8v22c0 2-2 4-4 4H27c-2 0-4-2-4-4V26l3-8z" fill="#FFFFFF"/>
          <path d="M26 18h12l-2 5H28l-2-5z" fill="#C9DBFF"/>
          <path d="M25 34c3 2 6 2 9 0 3-2 6-2 9 0" stroke="#D9E7FF" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      yogurt: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF0F8"/>
          <path d="M20 26h24l-3 20c-1 4-4 6-9 6s-8-2-9-6l-3-20z" fill="#F6A5CF"/>
          <path d="M22 26c1-4 5-7 10-7s9 3 10 7H22z" fill="#FFF9FD"/>
          <circle cx="32" cy="23" r="2.5" fill="#FFD96D"/>
        </svg>
      `,
      avocado: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#F4FAEA"/>
          <path d="M32 18c10 0 16 11 16 20 0 8-7 14-16 14S16 46 16 38c0-9 6-20 16-20z" fill="#84B95E"/>
          <path d="M32 23c7 0 11 8 11 14 0 5-5 10-11 10s-11-5-11-10c0-6 4-14 11-14z" fill="#D8F0A7"/>
          <circle cx="32" cy="38" r="5" fill="#9B6C3D"/>
        </svg>
      `,
      walnut: `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FBF2EA"/>
          <path d="M32 20c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14z" fill="#B07D56"/>
          <path d="M32 22v24M26 27c3 2 4 5 4 7s-1 5-4 7M38 27c-3 2-4 5-4 7s1 5 4 7" stroke="#E6C7A8" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,
      "olive-oil": `
        <svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF8E3"/>
          <path d="M29 18h6v6h4v7c0 2-1 4-2 6l-2 9c-1 4-5 6-8 6s-7-2-8-6l2-9c1-2 2-4 2-6v-7h4v-6z" fill="#C6B249"/>
          <path d="M25 31c2 1 6 1 10 0" stroke="#F8F0A6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    };

    return illustrations[type] || "";
  }

  function formatRangeValue(value, unit) {
    const formatted = Number.isInteger(value) ? value : value.toFixed(1);
    return `${formatted}${unit}`;
  }
})();
