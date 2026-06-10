(function () {
  const {
    defaults,
    ranges,
    feedingOptions,
    handGuide,
    mealGuides,
    snackWindows,
    workoutFuel,
    swapIdeas,
    focusPrompts,
    routeStates,
    changeGroups,
    changeWins,
    blockers,
    lookupSymptoms,
    lookupNutrients,
    foodCategories,
    foods
  } = window.APP_DATA;

  const storageKey = "nutrition-map-state-v3";
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get("client") || "";

  const state = {
    activeTab: "state",
    foodCategory: "all",
    selectedSymptom: lookupSymptoms[0].id,
    selectedNutrient: lookupNutrients[0].id,
    profile: loadProfile(),
    changes: loadChanges(),
    selectedRoute: loadSelectedRoute()
  };

  const app = document.getElementById("app");
  const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
  const tracker = createTracker();

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      goToTab(button.dataset.tab);
    });
  });

  syncTabs();
  tracker.track("session_start", { clientId, tab: state.activeTab });
  render();

  window.addEventListener("pagehide", () => {
    tracker.track("session_end", { tab: state.activeTab, route: state.selectedRoute || null });
  });

  function loadProfile() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
      return {
        height: finiteOr(saved.height, defaults.height),
        weight: finiteOr(saved.weight, defaults.weight),
        age: finiteOr(saved.age, defaults.age),
        feeding: feedingOptions.some((option) => option.id === saved.feeding) ? saved.feeding : defaults.feeding
      };
    } catch (error) {
      return { ...defaults };
    }
  }

  function loadChanges() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey + "-changes") || "{}");
      return {
        body: saved.body || "",
        emotion: saved.emotion || "",
        cognition: saved.cognition || "",
        blocker: saved.blocker || "",
        win: saved.win || ""
      };
    } catch (error) {
      return {
        body: "",
        emotion: "",
        cognition: "",
        blocker: "",
        win: ""
      };
    }
  }

  function loadSelectedRoute() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey + "-route") || "{}");
      return routeStates.some((item) => item.id === saved.selectedRoute) ? saved.selectedRoute : routeStates[0].id;
    } catch (error) {
      return routeStates[0].id;
    }
  }

  function saveProfile() {
    window.localStorage.setItem(storageKey, JSON.stringify(state.profile));
  }

  function saveChanges() {
    window.localStorage.setItem(storageKey + "-changes", JSON.stringify(state.changes));
    tracker.track("state_checkin", state.changes);
  }

  function saveSelectedRoute() {
    window.localStorage.setItem(storageKey + "-route", JSON.stringify({ selectedRoute: state.selectedRoute }));
  }

  function finiteOr(value, fallback) {
    return Number.isFinite(Number(value)) ? Number(value) : fallback;
  }

  function goToTab(tab) {
    state.activeTab = tab;
    syncTabs();
    tracker.track("tab_open", { tab: state.activeTab, route: state.selectedRoute || null });
    render();
  }

  function syncTabs() {
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
    });
  }

  function render() {
    if (state.activeTab === "current") {
      renderCurrentTab();
      return;
    }

    if (state.activeTab === "state") {
      renderStateTab();
      return;
    }

    if (state.activeTab === "changes") {
      renderChangesTab();
      return;
    }

    if (state.activeTab === "lookup") {
      renderLookupTab();
      return;
    }

    if (state.activeTab === "foods") {
      renderFoodsTab();
      return;
    }

    renderTodayTab();
  }

  function renderCurrentTab() {
    const totals = calculateTargets(state.profile);
    const feedingPrompt = focusPrompts[state.profile.feeding] || focusPrompts.mixed;

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>我的现在</h2>
          <p>先知道自己现在大概需要什么，不用算得很精，也能把底盘稳下来。</p>
        </div>
        <div class="focus-banner">
          <strong>先把焦虑放轻一点</strong>
          <p>${feedingPrompt}</p>
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
          <h3>今日参考范围</h3>
          <p>这些数字只是参考坐标，不是让你每天去交作业。</p>
        </div>
        <div class="metric-grid">
          ${metricCard("热量", round(totals.calories), "kcal", "已经把哺乳额外需求算进去了")}
          ${metricCard("蛋白质", round(totals.protein), "g", "每餐先保住蛋白质，通常就不太会偏")}
          ${metricCard("脂肪", round(totals.fat), "g", "脂肪不是敌人，稳定感和恢复也需要它")}
          ${metricCard("碳水", round(totals.carbs), "g", "普拉提、产奶和恢复都在用能量，别长期吃太少")}
        </div>
        <div class="goal-highlight">
          <p>${buildSummary(totals)}</p>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>手型估量法</h3>
          <p>不想称重时，用手就够了。重点是建立直觉，不是追求完美。</p>
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

      <section class="section">
        <div class="cta-bar">
          <button class="action-button action-button--primary" type="button" data-nav="state">看看我现在更像哪种状态</button>
          <button class="action-button action-button--ghost" type="button" data-nav="today">我想直接看今天怎么吃</button>
        </div>
      </section>
    `;

    mountProfileInputs();
    mountNavButtons();
  }

  function renderStateTab() {
    const selectedRoute = getSelectedRoute();

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>我现在更像哪种状态</h2>
          <p>不用选得很准，只要选一个最像最近的你。这里不是问卷，是先帮你把范围缩小。</p>
        </div>
        <div class="route-grid">
          ${routeStates.map((item) => `
            <button class="route-card ${item.id === state.selectedRoute ? "is-selected" : ""}" type="button" data-route="${item.id}">
              <span class="route-pill">${item.shortLabel}</span>
              <strong>${item.title}</strong>
              <p>${item.summary}</p>
            </button>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <article class="route-detail">
          <div class="route-detail__header">
            <span class="route-pill route-pill--active">${selectedRoute.shortLabel}</span>
            <h3>${selectedRoute.title}</h3>
          </div>
          <p class="route-lead">${selectedRoute.diagnosis}</p>
          <div class="detail-grid">
            <article class="detail-card detail-card--mint">
              <strong>你先做的最小动作</strong>
              <p>${selectedRoute.action}</p>
            </article>
            <article class="detail-card detail-card--warm">
              <strong>如果做不到，先退一步</strong>
              <p>${selectedRoute.fallback}</p>
            </article>
          </div>
          <div class="mini-link-grid">
            ${selectedRoute.quickLinks.map((item) => `<span class="mini-link">${item}</span>`).join("")}
          </div>
          <div class="cta-bar">
            <button class="action-button action-button--primary" type="button" data-nav="today">看我今天先怎么吃</button>
            <button class="action-button action-button--ghost" type="button" data-nav="lookup">我想先查查为什么会这样</button>
          </div>
        </article>
      </section>
    `;

    app.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedRoute = button.dataset.route;
        saveSelectedRoute();
        tracker.track("route_select", { route: state.selectedRoute });
        renderStateTab();
      });
    });

    mountNavButtons();
  }

  function renderTodayTab() {
    const route = getSelectedRoute();
    const prompt = route.todayPlan.prompt;
    const orderedSections = route.todayPlan.order.map((sectionId) => buildTodaySection(sectionId)).join("");

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>今天怎么吃</h2>
          <p>今天这一页会跟着你现在的状态走，不需要所有内容都一起看完。</p>
        </div>
        <div class="focus-banner">
          <strong>${route.todayPlan.emphasisTitle}</strong>
          <p>${prompt}</p>
        </div>
        <div class="status-ribbon">
          <span class="route-pill route-pill--active">${route.shortLabel}</span>
          <p>${route.todayPlan.emphasisBody}</p>
        </div>
      </section>

      ${orderedSections}

      <section class="section">
        <div class="cta-bar">
          <button class="action-button action-button--primary" type="button" data-nav="changes">${route.todayPlan.primaryCta}</button>
          <button class="action-button action-button--ghost" type="button" data-nav="lookup">我还是想查查缺什么</button>
        </div>
      </section>
    `;

    mountNavButtons();
  }

  function buildTodaySection(sectionId) {
    if (sectionId === "swap") {
      return `
        <section class="section">
          <div class="section-header">
            <h3>做不到时怎么替代</h3>
            <p>你的目标不是照本宣科，而是在真实生活里找到能做下去的版本。</p>
          </div>
          <div class="lookup-panel">
            ${swapIdeas.map((item) => `
              <article class="lookup-item">
                <strong>${item.problem}</strong>
                <p>${item.answer}</p>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (sectionId === "meals") {
      return `
        <section class="section">
          <div class="section-header">
            <h3>三餐怎么搭更稳</h3>
            <p>不是吃得完美，而是让每一餐都更容易接住你。</p>
          </div>
          <div class="stack-grid">
            ${mealGuides.map((meal) => `
              <article class="recovery-card recovery-green">
                <div class="mini-label">${meal.subtitle}</div>
                <strong>${meal.title}</strong>
                <p>${meal.summary}</p>
                <ul class="recovery-list">
                  ${meal.examples.map((item) => `<li>${item}</li>`).join("")}
                </ul>
                <div class="tip-box">兜底选项：${meal.fallback}</div>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (sectionId === "snacks") {
      return `
        <section class="section">
          <div class="section-header">
            <h3>加餐怎么选</h3>
            <p>加餐不是吃多了，而是在这个阶段帮身体把能量接住。</p>
          </div>
          <div class="stack-grid">
            ${snackWindows.map((snack) => `
              <article class="recovery-card recovery-peach">
                <strong>${snack.title}</strong>
                <p>${snack.summary}</p>
                <ul class="recovery-list">
                  ${snack.combos.map((item) => `<li>${item}</li>`).join("")}
                </ul>
                <div class="tip-box">${snack.note}</div>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (sectionId === "workout") {
      return `
        <section class="section">
          <div class="section-header">
            <h3>普拉提前后怎么吃</h3>
            <p>${workoutFuel.intro}</p>
          </div>
          <div class="stack-grid">
            <article class="recovery-card recovery-blue">
              <strong>${workoutFuel.before.title}</strong>
              <p>${workoutFuel.before.summary}</p>
              <ul class="recovery-list">
                ${workoutFuel.before.ideas.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </article>
            <article class="recovery-card recovery-green">
              <strong>${workoutFuel.after.title}</strong>
              <p>${workoutFuel.after.summary}</p>
              <ul class="recovery-list">
                ${workoutFuel.after.ideas.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </article>
          </div>
          <div class="principles-list">
            ${workoutFuel.dayAdjustments.map((item, index) => `
              <article class="principle-item">
                <div class="principle-number">${index + 1}</div>
                <p>${item}</p>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    return "";
  }

  function renderChangesTab() {
    const route = getSelectedRoute();

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>我最近的变化</h2>
          <p>不是打卡，也不是评分，只是帮你看见：你有没有开始从现在的状态里慢慢往前走。</p>
        </div>
        <div class="goal-highlight">
          <p>${buildChangesSummary()}</p>
        </div>
        <div class="status-ribbon">
          <span class="route-pill route-pill--active">${route.shortLabel}</span>
          <p>你现在主要在看的是「${route.title}」这条线，所以这里更值得留意身体有没有开始稳下来。</p>
        </div>
      </section>

      ${changeGroups.map((group) => `
        <section class="section">
          <div class="section-header">
            <h3>${group.title}</h3>
            <p>现在更像哪一种？点一下就好，不用想得太复杂。</p>
          </div>
          <div class="choice-grid" data-group="${group.id}">
            ${group.options.map((option) => `
              <button
                class="choice-card ${state.changes[group.id] === option.id ? "is-selected" : ""}"
                type="button"
                data-group-id="${group.id}"
                data-option-id="${option.id}"
              >
                <strong>${option.label}</strong>
                <p>${option.feedback}</p>
              </button>
            `).join("")}
          </div>
        </section>
      `).join("")}

      <section class="section">
        <div class="section-header">
          <h3>你已经开始出现的小变化</h3>
          <p>哪一个最像你最近已经感觉到的进步？</p>
        </div>
        <div class="chip-row" id="wins-row">
          ${changeWins.map((item) => `
            <button class="chip ${state.changes.win === item ? "is-active" : ""}" type="button" data-win="${item}">
              ${item}
            </button>
          `).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>还卡在哪</h3>
          <p>不是要你做得完美，而是先知道自己最卡在哪里。</p>
        </div>
        <div class="chip-row" id="blocker-row">
          ${blockers.map((item) => `
            <button class="chip ${state.changes.blocker === item ? "is-active" : ""}" type="button" data-blocker="${item}">
              ${item}
            </button>
          `).join("")}
        </div>
        <div class="cta-bar">
          <button class="action-button action-button--primary" type="button" data-nav="today">继续看我今天怎么吃</button>
          <button class="action-button action-button--ghost" type="button" data-nav="state">我想重新判断一下状态</button>
        </div>
      </section>
    `;

    app.querySelectorAll("[data-group-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.changes[button.dataset.groupId] = button.dataset.optionId;
        saveChanges();
        renderChangesTab();
      });
    });

    app.querySelectorAll("[data-win]").forEach((button) => {
      button.addEventListener("click", () => {
        state.changes.win = button.dataset.win;
        saveChanges();
        renderChangesTab();
      });
    });

    app.querySelectorAll("[data-blocker]").forEach((button) => {
      button.addEventListener("click", () => {
        state.changes.blocker = button.dataset.blocker;
        saveChanges();
        renderChangesTab();
      });
    });

    mountNavButtons();
  }

  function renderLookupTab() {
    const symptom = lookupSymptoms.find((item) => item.id === state.selectedSymptom) || lookupSymptoms[0];
    const nutrient = lookupNutrients.find((item) => item.id === state.selectedNutrient) || lookupNutrients[0];

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>缺什么查什么</h2>
          <p>先接住你现在的感觉，再给你一个简单方向，不用自己在脑子里拼图。</p>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>你现在的感觉</h3>
          <p>点一种最像现在的状态，先看看从哪几个方向查起。</p>
        </div>
        <div class="chip-row" id="symptom-row">
          ${lookupSymptoms.map((item) => `
            <button class="chip ${state.selectedSymptom === item.id ? "is-active" : ""}" type="button" data-symptom="${item.id}">
              ${item.label}
            </button>
          `).join("")}
        </div>
        <article class="lookup-item emphasis-item">
          <strong>${symptom.label}</strong>
          <p>先看：${symptom.leads.join(" / ")}</p>
          <p>${symptom.action}</p>
        </article>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>你想补什么</h3>
          <p>如果你已经知道自己想看哪个营养素，这里可以直接走捷径。</p>
        </div>
        <div class="chip-row" id="nutrient-row">
          ${lookupNutrients.map((item) => `
            <button class="chip ${state.selectedNutrient === item.id ? "is-active" : ""}" type="button" data-nutrient="${item.id}">
              ${item.title}
            </button>
          `).join("")}
        </div>
        <article class="lookup-item">
          <strong>${nutrient.title}</strong>
          <p>${nutrient.why}</p>
          <ul class="recovery-list">
            ${nutrient.foods.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="tip-box">做不到时怎么办：${nutrient.fallback}</div>
        </article>
        <div class="cta-bar">
          <button class="action-button action-button--primary" type="button" data-nav="today">回到今天怎么吃</button>
          <button class="action-button action-button--ghost" type="button" data-nav="foods">看看哪些食物最适合我</button>
        </div>
      </section>
    `;

    app.querySelectorAll("[data-symptom]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedSymptom = button.dataset.symptom;
        tracker.track("lookup_symptom", { symptom: state.selectedSymptom });
        renderLookupTab();
      });
    });

    app.querySelectorAll("[data-nutrient]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedNutrient = button.dataset.nutrient;
        tracker.track("lookup_nutrient", { nutrient: state.selectedNutrient });
        renderLookupTab();
      });
    });

    mountNavButtons();
  }

  function renderFoodsTab() {
    const filteredFoods = state.foodCategory === "all"
      ? foods
      : foods.filter((item) => item.category === state.foodCategory);

    app.innerHTML = `
      <section class="section">
        <div class="section-header">
          <h2>食物选择</h2>
          <p>当你看到某个食物时，知道它大概能帮你什么，这就是直觉开始长出来的样子。</p>
        </div>
        <div class="chip-row" id="category-row">
          ${foodCategories.map((category) => `
            <button class="chip ${state.foodCategory === category.id ? "is-active" : ""}" type="button" data-category="${category.id}">
              ${category.label}
            </button>
          `).join("")}
        </div>
        <div class="food-grid">
          ${filteredFoods.map((food) => `
            <article class="food-card">
              <div class="food-illustration" aria-hidden="true">${foodIllustrationSvg(food.art)}</div>
              <div class="food-topline">
                <strong>${food.name}</strong>
                <div class="food-meta-line">
                  <span>${food.portion}</span>
                  <span class="food-calories-inline">热量 ${food.calories} kcal</span>
                </div>
              </div>
              <div class="macro-grid">
                ${macroItem("蛋白质", food.macros.protein)}
                ${macroItem("碳水", food.macros.carbs)}
                ${macroItem("脂肪", food.macros.fat)}
              </div>
              <p class="food-note">${food.note}</p>
              <div class="tag-row">
                ${food.tags.map((tag) => `<span class="tag ${tag.type}">${tag.label}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
        <div class="cta-bar">
          <button class="action-button action-button--primary" type="button" data-nav="lookup">我想看这个补什么</button>
          <button class="action-button action-button--ghost" type="button" data-nav="today">回到今天怎么吃</button>
        </div>
      </section>
    `;

    app.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.foodCategory = button.dataset.category;
        tracker.track("food_filter", { category: state.foodCategory });
        renderFoodsTab();
      });
    });

    mountNavButtons();
  }

  function mountProfileInputs() {
    const rangeGrid = document.getElementById("range-grid");
    const feedGrid = document.getElementById("feed-grid");

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

    feedGrid.innerHTML = feedingOptions.map((option) => `
      <button class="feed-option ${state.profile.feeding === option.id ? "is-selected" : ""}" type="button" data-feeding="${option.id}">
        <strong>${option.label}</strong>
        <span>${option.hint}</span>
      </button>
    `).join("");

    rangeGrid.querySelectorAll("[data-range-key]").forEach((input) => {
      input.addEventListener("input", (event) => {
        const key = event.target.dataset.rangeKey;
        state.profile[key] = Number(event.target.value);
        saveProfile();
        tracker.track("profile_update", { field: key, value: state.profile[key] });
        renderCurrentTab();
      });
    });

    feedGrid.querySelectorAll("[data-feeding]").forEach((button) => {
      button.addEventListener("click", () => {
        state.profile.feeding = button.dataset.feeding;
        saveProfile();
        tracker.track("profile_update", { field: "feeding", value: state.profile.feeding });
        renderCurrentTab();
      });
    });
  }

  function mountNavButtons() {
    app.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        goToTab(button.dataset.nav);
      });
    });
  }

  function getSelectedRoute() {
    return routeStates.find((item) => item.id === state.selectedRoute) || routeStates[0];
  }

  function buildChangesSummary() {
    const selected = [];

    changeGroups.forEach((group) => {
      const chosen = group.options.find((item) => item.id === state.changes[group.id]);
      if (chosen) selected.push(chosen.label);
    });

    if (!selected.length) {
      return "你现在不用急着证明自己变好了。先点一点最近更像哪种状态，让变化有机会被你看见。";
    }

    return `你最近更像：${selected.join("、")}。哪怕只是这些很小的变化，也说明身体正在慢慢给你回应。`;
  }

  function calculateTargets(profile) {
    const feeding = feedingOptions.find((option) => option.id === profile.feeding) || feedingOptions[1];
    const bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) - 161;
    const calories = (bmr * 1.3) + feeding.energyBonus;
    const protein = (profile.weight * 1.3) + feeding.proteinBonus;
    const fat = (calories * 0.28) / 9;
    const carbs = (calories - (protein * 4) - (fat * 9)) / 4;
    return { calories, protein, fat, carbs };
  }

  function buildSummary(totals) {
    return `你每天大概需要 ${round(totals.calories)} kcal，蛋白质约 ${round(totals.protein)}g。重点不是严格命中，而是别长期明显吃少。`;
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

  function macroItem(label, value) {
    return `
      <div class="macro-item">
        <span>${label}</span>
        <strong>${value}g</strong>
      </div>
    `;
  }

  function round(value) {
    return Math.round(value);
  }

  function formatRangeValue(value, unit) {
    const formatted = Number.isInteger(value) ? value : value.toFixed(1);
    return `${formatted}${unit}`;
  }

  function getOrCreateVisitorId() {
    const key = "nutrition-map-visitor-id";
    const current = window.localStorage.getItem(key);
    if (current) return current;
    const created = "visitor_" + Math.random().toString(36).slice(2, 10);
    window.localStorage.setItem(key, created);
    return created;
  }

  function getOrCreateSessionId() {
    const key = "nutrition-map-session-id";
    const current = window.sessionStorage.getItem(key);
    if (current) return current;
    const created = "session_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
    window.sessionStorage.setItem(key, created);
    return created;
  }

  function createTracker() {
    const config = window.APP_CONFIG || {};
    const trackingEnabled = Boolean(config.trackingEnabled && config.supabaseUrl && config.supabaseAnonKey && window.supabase);
    let supabaseClient = null;
    let sessionCreated = false;

    if (trackingEnabled) {
      supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    }

    return {
      async track(eventType, payload) {
        if (!trackingEnabled || !clientId) return;
        try {
          const sessionId = getOrCreateSessionId();
          const visitorId = getOrCreateVisitorId();

          if (!sessionCreated) {
            sessionCreated = true;
            await supabaseClient.from("sessions").insert({
              client_id: clientId,
              visitor_id: visitorId,
              page_started: state.activeTab
            });
          }

          await supabaseClient.from("events").insert({
            client_id: clientId,
            session_id: sessionId,
            visitor_id: visitorId,
            event_type: eventType,
            page: state.activeTab,
            payload: payload || {}
          });

          if (eventType === "state_checkin") {
            await supabaseClient.from("checkins").insert({
              client_id: clientId,
              visitor_id: visitorId,
              body_state: payload.body || null,
              emotion_state: payload.emotion || null,
              cognition_state: payload.cognition || null,
              blocker: payload.blocker || null,
              win: payload.win || null
            });
          }
        } catch (error) {
          console.warn("tracking_failed", error);
        }
      }
    };
  }

  function foodIllustrationSvg(type) {
    const illustrations = {
      salmon: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF2EC"/><ellipse cx="32" cy="33" rx="18" ry="11" fill="#FF9E82"/><ellipse cx="31" cy="33" rx="13" ry="7.5" fill="#FFD4C5"/><path d="M45 33l8-6v12l-8-6z" fill="#FF8A6B"/><circle cx="23" cy="30" r="1.8" fill="#073118"/><path d="M25 36c2 1.7 6 1.7 8 0" stroke="#E07058" stroke-width="2" stroke-linecap="round"/></svg>`,
      beef: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF1EE"/><path d="M20 22c6-6 19-6 24 0 6 6 4 18-3 23-7 6-18 6-24 0-6-6-4-17 3-23z" fill="#D86D58"/><path d="M26 27c2-2 7-2 10 0 2 2 2 6 0 8-3 3-8 3-10 0-2-2-2-6 0-8z" fill="#F8C2B4"/><path d="M20 37c4 3 8 4 13 4" stroke="#F8C2B4" stroke-width="2" stroke-linecap="round"/></svg>`,
      chicken: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF7E4"/><path d="M18 38c0-8 6-15 14-15 7 0 13 6 13 13s-6 11-13 11c-8 0-14-3-14-9z" fill="#F3BC59"/><circle cx="45" cy="27" r="4.8" fill="#FFF8ED"/><circle cx="49" cy="23" r="2.8" fill="#FFF8ED"/><path d="M20 39c3 4 11 6 18 4" stroke="#E0972D" stroke-width="2" stroke-linecap="round"/></svg>`,
      shrimp: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF1EC"/><path d="M42 21c-9 0-17 7-17 16 0 4 2 8 5 11 2 2 6 3 9 0l5-4c2-2 2-5 0-7l-2-2c-1-1-1-3 0-4l4-4c2-2 0-6-4-6z" fill="#FF9B86"/><circle cx="38.5" cy="26.5" r="1.8" fill="#073118"/><path d="M27 38c4 3 10 3 15 0" stroke="#E87660" stroke-width="2" stroke-linecap="round"/></svg>`,
      tofu: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#EFFAF1"/><rect x="18" y="20" width="28" height="24" rx="7" fill="#FFFDF8"/><rect x="24" y="16" width="22" height="24" rx="7" fill="#C5E5CE"/><circle cx="29" cy="28" r="2" fill="#9BC7A6"/><circle cx="38" cy="24" r="1.8" fill="#9BC7A6"/></svg>`,
      broccoli: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#EFFAF1"/><path d="M30 24c2-5 11-5 13 0 5-2 10 2 10 8 0 5-4 9-10 9H22c-5 0-9-3-9-8 0-6 6-10 11-8 1-4 4-6 6-6z" fill="#5FA86E"/><rect x="29" y="38" width="6" height="12" rx="3" fill="#97C57D"/></svg>`,
      spinach: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#EFFAF1"/><path d="M31 16c9 2 15 11 13 21-2 9-11 15-20 13-9-2-14-11-12-20 2-10 10-16 19-14z" fill="#70BA79"/><path d="M23 41c5-6 10-13 16-20" stroke="#DFF7D7" stroke-width="2.2" stroke-linecap="round"/></svg>`,
      pea: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#F2FAEA"/><path d="M18 38c5-9 14-13 28-12-3 12-11 18-24 18-3 0-5-3-4-6z" fill="#8BC267"/><circle cx="27" cy="35" r="3.8" fill="#C6E88B"/><circle cx="35" cy="34" r="3.8" fill="#B5DD77"/><circle cx="43" cy="34" r="3.8" fill="#A5D767"/></svg>`,
      carrot: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF5EA"/><path d="M26 18l6 4 6-4-2 8 3 4c2 3 1 8-2 10L28 47c-4 2-8 0-10-3-2-3-1-7 2-10l4-3 2-13z" fill="#F19A42"/><path d="M28 18c2-3 5-5 8-6" stroke="#72B77A" stroke-width="2.5" stroke-linecap="round"/><path d="M34 18c2-4 5-6 9-7" stroke="#8FD29B" stroke-width="2.5" stroke-linecap="round"/></svg>`,
      mushroom: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FBF4EC"/><path d="M18 31c0-8 6-13 14-13s14 5 14 13H18z" fill="#BE9470"/><rect x="28" y="31" width="8" height="14" rx="4" fill="#F5E7D9"/><circle cx="25" cy="26" r="2" fill="#F1D6BE"/><circle cx="33" cy="23" r="2" fill="#F1D6BE"/><circle cx="40" cy="27" r="2" fill="#F1D6BE"/></svg>`,
      rice: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF8EC"/><path d="M18 38h28c0 7-5 12-14 12s-14-5-14-12z" fill="#D7C087"/><path d="M19 35c0-6 6-11 13-11s13 5 13 11H19z" fill="#FFF9F0"/><path d="M25 29l2-3M32 28l0-3M39 29l-2-3" stroke="#E7DFC6" stroke-width="2" stroke-linecap="round"/></svg>`,
      oats: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF7EA"/><path d="M18 38h28c0 7-5 12-14 12s-14-5-14-12z" fill="#D6B06D"/><path d="M21 34c3-5 7-8 11-8s8 3 11 8H21z" fill="#F4E2B5"/><circle cx="27" cy="35" r="1.4" fill="#D8B46E"/><circle cx="32" cy="33" r="1.4" fill="#D8B46E"/><circle cx="37" cy="35" r="1.4" fill="#D8B46E"/></svg>`,
      beans: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#F8F2EC"/><ellipse cx="24" cy="35" rx="7" ry="9" fill="#A53D46"/><ellipse cx="34" cy="29" rx="7" ry="9" fill="#2F3130"/><ellipse cx="42" cy="37" rx="7" ry="9" fill="#7A2F42"/><path d="M22 33c1-1 2-1 3-1" stroke="#D97F87" stroke-width="1.8" stroke-linecap="round"/><path d="M32 27c1-1 2-1 3-1" stroke="#7A7F7B" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      "sweet-potato": `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#F7EFFD"/><path d="M19 38c0-9 9-16 19-16 7 0 12 4 12 10 0 9-10 16-20 16-6 0-11-4-11-10z" fill="#A56BD6"/><path d="M25 33c3-2 7-4 10-4" stroke="#D9BFF6" stroke-width="2" stroke-linecap="round"/><path d="M28 40c3-2 7-4 10-4" stroke="#D9BFF6" stroke-width="2" stroke-linecap="round"/></svg>`,
      egg: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF9ED"/><path d="M32 18c8 0 14 10 14 20 0 8-6 14-14 14s-14-6-14-14c0-10 6-20 14-20z" fill="#FFFDF7"/><circle cx="32" cy="37" r="6.5" fill="#FFD562"/></svg>`,
      milk: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#EEF5FF"/><path d="M26 18h12l3 8v22c0 2-2 4-4 4H27c-2 0-4-2-4-4V26l3-8z" fill="#FFFFFF"/><path d="M26 18h12l-2 5H28l-2-5z" fill="#C9DBFF"/><path d="M25 34c3 2 6 2 9 0 3-2 6-2 9 0" stroke="#D9E7FF" stroke-width="2" stroke-linecap="round"/></svg>`,
      yogurt: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF0F8"/><path d="M20 26h24l-3 20c-1 4-4 6-9 6s-8-2-9-6l-3-20z" fill="#F6A5CF"/><path d="M22 26c1-4 5-7 10-7s9 3 10 7H22z" fill="#FFF9FD"/><circle cx="32" cy="23" r="2.5" fill="#FFD96D"/></svg>`,
      avocado: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#F4FAEA"/><path d="M32 18c10 0 16 11 16 20 0 8-7 14-16 14S16 46 16 38c0-9 6-20 16-20z" fill="#84B95E"/><path d="M32 23c7 0 11 8 11 14 0 5-5 10-11 10s-11-5-11-10c0-6 4-14 11-14z" fill="#D8F0A7"/><circle cx="32" cy="38" r="5" fill="#9B6C3D"/></svg>`,
      walnut: `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FBF2EA"/><path d="M32 20c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14z" fill="#B07D56"/><path d="M32 22v24M26 27c3 2 4 5 4 7s-1 5-4 7M38 27c-3 2-4 5-4 7s1 5 4 7" stroke="#E6C7A8" stroke-width="2" stroke-linecap="round"/></svg>`,
      "olive-oil": `<svg viewBox="0 0 64 64" class="food-svg" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="52" height="52" rx="18" fill="#FFF8E3"/><path d="M29 18h6v6h4v7c0 2-1 4-2 6l-2 9c-1 4-5 6-8 6s-7-2-8-6l2-9c1-2 2-4 2-6v-7h4v-6z" fill="#C6B249"/><path d="M25 31c2 1 6 1 10 0" stroke="#F8F0A6" stroke-width="2" stroke-linecap="round"/></svg>`
    };

    return illustrations[type] || "";
  }
})();
