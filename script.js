(() => {
  "use strict";

  /* ---------------------------------------------------------
     Data
  --------------------------------------------------------- */
  const FRUITS = ['🍎', '🍊', '🍇', '🍋', '🍓', '🍑', '🍐', '🥝'];

  const EXPRESSIONS = {
    cn2kr: [
      { id: 'kr1', phrase: '안 봐도 비디오야', pron: 'an bwado bidieoya', meaning: '보지 않아도 결과가 뻔하다는 뜻이에요. (不用看也知道结果)', example: '"내일 시험 어떻게 될지 안 봐도 비디오야."' },
      { id: 'kr2', phrase: '핵인싸', pron: 'haek-inssa', meaning: '무리에 아주 잘 어울리는 사교적인 사람을 뜻해요.', example: '"저 친구 완전 핵인싸다, 모르는 사람이 없어."' },
      { id: 'kr3', phrase: '꿀팁', pron: 'kkul-tip', meaning: '아주 유용한 정보나 요령을 뜻해요.', example: '"이거 진짜 꿀팁이니까 꼭 저장해 둬."' },
      { id: 'kr4', phrase: '갑분싸', pron: 'gap-bun-ssa', meaning: '갑자기 분위기가 싸늘해졌다는 뜻이에요.', example: '"내가 그 말 하자마자 갑분싸 됐잖아."' },
      { id: 'kr5', phrase: '인정!', pron: 'injeong', meaning: '상대의 말에 강하게 동의할 때 쓰는 말이에요.', example: '"그 카페 진짜 맛있지? — 인정!"' },
      { id: 'kr6', phrase: '머쓱하다', pron: 'meosseukhada', meaning: '민망하고 어색해서 쑥스러운 기분을 뜻해요.', example: '"혼자 박수쳐서 좀 머쓱했어."' },
      { id: 'kr7', phrase: 'TMI', pron: 'ti-em-ai', meaning: '"Too Much Information", 굳이 몰라도 될 과한 정보라는 뜻이에요.', example: '"나 어제 라면 세 봉지 먹었어 — 그건 TMI야."' }
    ],
    kr2cn: [
      { id: 'cn1', phrase: '绝绝子', pron: 'jué jué zi', meaning: '"완전 최고다, 진짜 대박이다"라는 뜻의 신조어예요.', example: '"这家店的奶茶绝绝子!" (이 가게 밀크티 완전 대박이야!)' },
      { id: 'cn2', phrase: '666', pron: 'liù liù liù', meaning: '숫자 6의 발음이 "溜(능숙하다)"와 비슷해서, "대단해!"라는 뜻으로 써요.', example: '"你打游戏太666了!" (너 게임 진짜 잘한다!)' },
      { id: 'cn3', phrase: '打工人', pron: 'dǎ gōng rén', meaning: '월급쟁이 직장인을 자조적으로 부르는 말이에요.', example: '"早上六点起床,打工人的一天开始了。" (아침 6시 기상, 직장인의 하루 시작.)' },
      { id: 'cn4', phrase: '内卷', pron: 'nèi juǎn', meaning: '노력 대비 성과가 줄어드는 과도한 경쟁 상태를 뜻해요.', example: '"这个行业太内卷了。" (이 업계는 경쟁이 너무 심해.)' },
      { id: 'cn5', phrase: '摆烂', pron: 'bǎi làn', meaning: '더 애쓰지 않고 "될 대로 되라"는 태도를 뜻해요.', example: '"我今天要摆烂一天。" (오늘은 그냥 손 놓고 쉴래.)' },
      { id: 'cn6', phrase: '拿捏', pron: 'ná niē', meaning: '어떤 상황이나 사람을 완전히 파악하고 다룰 수 있다는 뜻이에요.', example: '"这道题我拿捏了。" (이 문제 완전히 파악했어.)' },
      { id: 'cn7', phrase: '破防了', pron: 'pò fáng le', meaning: '마음의 방어선이 무너질 만큼 감동받거나 충격받았다는 뜻이에요.', example: '"看到这段视频我直接破防了。" (이 영상 보고 완전 감동해서 울었어.)' }
    ]
  };

  const PARTNERS = [
    { id: 'p1', name: '하늘', region: '서울', native: '한국어', learning: '중국어 학습 중', emoji: '🍊' },
    { id: 'p2', name: '李明 (리밍)', region: '베이징', native: '중국어', learning: '한국어 학습 중', emoji: '🍎' },
    { id: 'p3', name: '유진', region: '부산', native: '한국어', learning: '중국어 학습 중', emoji: '🍇' },
    { id: 'p4', name: '王芳 (왕팡)', region: '상하이', native: '중국어', learning: '한국어 학습 중', emoji: '🍋' }
  ];

  const CERTS = [
    { id: 'topik', title: 'TOPIK · 한국어능력시험', sub: '한국어 실력을 공식적으로 증명하는 시험이에요.', levels: 6, recommendFor: 'cn2kr' },
    { id: 'hsk', title: 'HSK · 汉语水平考试', sub: '중국어 실력을 공식적으로 증명하는 시험이에요.', levels: 6, recommendFor: 'kr2cn' }
  ];

  /* ---------------------------------------------------------
     Basket state (localStorage)
  --------------------------------------------------------- */
  const STORAGE_KEY = 'yddsa_basket_items';

  function loadBasket() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveBasket(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) { /* ignore storage errors */ }
  }

  let basketItems = loadBasket();

  function hasItem(id) {
    return basketItems.includes(id);
  }

  function addItem(id) {
    if (hasItem(id)) return false;
    basketItems.push(id);
    saveBasket(basketItems);
    renderBaskets();
    return true;
  }

  function clearBasket() {
    basketItems = [];
    saveBasket(basketItems);
    renderBaskets();
  }

  function renderBaskets() {
    const count = basketItems.length;

    // mini basket in header
    const miniFruits = document.getElementById('miniBasketFruits');
    const miniCount = document.getElementById('miniBasketCount');
    if (miniFruits) {
      miniFruits.innerHTML = basketItems
        .slice(-8)
        .map((id, i) => `<span>${fruitFor(id, i)}</span>`)
        .join('');
    }
    if (miniCount) miniCount.textContent = String(count);

    // big showcase basket
    const bigFruits = document.getElementById('bigBasketFruits');
    if (bigFruits) {
      bigFruits.innerHTML = basketItems
        .map((id, i) => `<span>${fruitFor(id, i)}</span>`)
        .join('');
    }

    const footerCount = document.getElementById('footerCount');
    if (footerCount) footerCount.textContent = String(count);

    // reflect "done" state on buttons that add basket items
    document.querySelectorAll('[data-basket-id]').forEach(btn => {
      const id = btn.getAttribute('data-basket-id');
      const done = hasItem(id);
      btn.classList.toggle('is-done', done);
      if (btn.dataset.labelDefault === undefined) {
        btn.dataset.labelDefault = btn.textContent;
      }
      if (btn.dataset.labelDone) {
        btn.textContent = done ? btn.dataset.labelDone : btn.dataset.labelDefault;
      }
    });
  }

  function fruitFor(id, index) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % FRUITS.length;
    return FRUITS[(hash + index) % FRUITS.length];
  }

  /* ---------------------------------------------------------
     Direction state (cn2kr = 중국인이 한국어 학습 / kr2cn = 한국인이 중국어 학습)
  --------------------------------------------------------- */
  let direction = 'cn2kr';

  function dayIndex(len) {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const now = new Date();
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day % len;
  }

  function setDirection(next) {
    direction = next;
    document.body.setAttribute('data-direction', direction);

    document.getElementById('paneCn').setAttribute('aria-pressed', String(direction === 'cn2kr'));
    document.getElementById('paneKr').setAttribute('aria-pressed', String(direction === 'kr2cn'));

    const status = document.getElementById('heroStatus');
    if (status) {
      status.textContent = direction === 'cn2kr'
        ? '지금은 "중국인 → 한국어 학습" 모드예요. 아래 표현과 매칭도 한국어 기준으로 보여드릴게요.'
        : '지금은 "한국인 → 중국어 학습" 모드예요. 아래 표현과 매칭도 중국어 기준으로 보여드릴게요.';
    }

    renderExpression();
    renderLocalGrid();
    renderPartners();
    renderCerts();
  }

  /* ---------------------------------------------------------
     Today's expression (flip card)
  --------------------------------------------------------- */
  function renderExpression() {
    const list = EXPRESSIONS[direction];
    const today = list[dayIndex(list.length)];

    document.getElementById('exprTag').textContent = direction === 'cn2kr' ? '오늘의 한국어' : '오늘의 중국어';
    document.getElementById('exprPhrase').textContent = today.phrase;
    document.getElementById('exprPron').textContent = today.pron;
    document.getElementById('exprMeaning').textContent = today.meaning;
    document.getElementById('exprExample').textContent = today.example;

    const card = document.getElementById('expressionCard');
    card.classList.remove('is-flipped');
    card.dataset.currentId = today.id;

    const addBtn = document.getElementById('addTodayBtn');
    addBtn.setAttribute('data-basket-id', today.id);
    addBtn.dataset.labelDone = '담았어요 ✓';
    addBtn.onclick = (e) => {
      e.stopPropagation();
      addItem(today.id);
    };

    renderBaskets();
  }

  function setupExpressionFlip() {
    const card = document.getElementById('expressionCard');
    const toggle = () => card.classList.toggle('is-flipped');
    card.addEventListener('click', (e) => {
      if (e.target.closest('#addTodayBtn')) return;
      toggle();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  }

  /* ---------------------------------------------------------
     Local slang grid (next few expressions, excluding today's)
  --------------------------------------------------------- */
  function renderLocalGrid() {
    const list = EXPRESSIONS[direction];
    const todayIdx = dayIndex(list.length);
    const shown = [];
    for (let i = 1; i <= 4; i++) {
      shown.push(list[(todayIdx + i) % list.length]);
    }

    const grid = document.getElementById('localGrid');
    grid.innerHTML = shown.map(item => `
      <div class="local-card">
        <p class="lc-phrase">${item.phrase}</p>
        <p class="lc-pron">${item.pron}</p>
        <p class="lc-meaning">${item.meaning}</p>
        <button type="button" class="lc-btn" data-basket-id="${item.id}" data-label-done="담았어요 ✓">바구니에 담기</button>
      </div>
    `).join('');

    grid.querySelectorAll('.lc-btn').forEach(btn => {
      btn.addEventListener('click', () => addItem(btn.getAttribute('data-basket-id')));
    });

    renderBaskets();
  }

  /* ---------------------------------------------------------
     Language exchange partners
  --------------------------------------------------------- */
  function renderPartners() {
    const wantNative = direction === 'cn2kr' ? '한국어' : '중국어';
    const desc = document.getElementById('exchangeDesc');
    desc.textContent = direction === 'cn2kr'
      ? '한국어가 모국어이고 중국어를 배우고 싶어하는 상대를 찾아보세요.'
      : '중국어가 모국어이고 한국어를 배우고 싶어하는 상대를 찾아보세요.';

    const matched = PARTNERS.filter(p => p.native === wantNative);
    const grid = document.getElementById('partnerGrid');
    grid.innerHTML = matched.map(p => {
      const basketId = 'exchange-' + p.id;
      return `
        <div class="partner-card">
          <span class="partner-avatar">${p.emoji}</span>
          <p class="partner-name">${p.name}</p>
          <p class="partner-meta">${p.region} · 모국어 ${p.native}</p>
          <span class="partner-tag">${p.learning}</span>
          <button type="button" class="btn btn-add" data-basket-id="${basketId}" data-label-done="신청 완료 ✓">교환 신청하기</button>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('[data-basket-id]').forEach(btn => {
      btn.addEventListener('click', () => addItem(btn.getAttribute('data-basket-id')));
    });

    renderBaskets();
  }

  /* ---------------------------------------------------------
     Certification cards
  --------------------------------------------------------- */
  function renderCerts() {
    const grid = document.getElementById('certGrid');
    grid.innerHTML = CERTS.map(c => {
      const recommended = c.recommendFor === direction;
      const basketId = 'cert-' + c.id;
      const dots = Array.from({ length: c.levels })
        .map((_, i) => `<span class="cert-level ${i < 3 ? 'is-active' : ''}"></span>`)
        .join('');
      return `
        <div class="cert-card ${recommended ? 'is-recommended' : ''}">
          ${recommended ? '<span class="cert-badge">추천</span>' : ''}
          <p class="cert-title">${c.title}</p>
          <p class="cert-sub">${c.sub}</p>
          <div class="cert-levels">${dots}</div>
          <button type="button" class="btn btn-add" data-basket-id="${basketId}" data-label-done="목표 설정됨 ✓">학습 목표 설정하기</button>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('[data-basket-id]').forEach(btn => {
      btn.addEventListener('click', () => addItem(btn.getAttribute('data-basket-id')));
    });

    renderBaskets();
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  function init() {
    document.getElementById('paneCn').addEventListener('click', () => setDirection('cn2kr'));
    document.getElementById('paneKr').addEventListener('click', () => setDirection('kr2cn'));
    document.getElementById('swapBtn').addEventListener('click', () => {
      setDirection(direction === 'cn2kr' ? 'kr2cn' : 'cn2kr');
    });

    document.getElementById('miniBasket').addEventListener('click', () => {
      document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      clearBasket();
      renderExpression();
      renderLocalGrid();
      renderPartners();
      renderCerts();
    });

    setupExpressionFlip();
    setDirection(direction);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
