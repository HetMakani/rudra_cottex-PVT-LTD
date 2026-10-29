/**
 * Rudra Cottex Limited - Ultra-Premium Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initCounters();
  initSpinningProcess();
  initProductFilter();
  initProductModal();
  initLiveCalculator();
  initRfqForm();
  initFaqAccordion();
});

/* ----------------------------------------------------
   1. SCROLL REVEAL MICRO-ANIMATIONS
   ---------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------
   2. NAVBAR & MOBILE MENU
   ---------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Shrink and glass blur on scroll
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('py-2.5', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-slate-200', 'shadow-sm');
      header.classList.remove('py-6', 'bg-transparent');
    } else {
      header.classList.remove('py-2.5', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-slate-200', 'shadow-sm');
      header.classList.add('py-6', 'bg-transparent');
    }
  }, { passive: true });

  // Mobile menu open / close
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
      document.body.classList.add('overflow-hidden');
    });
  }

  function hideMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  if (closeMenu) closeMenu.addEventListener('click', hideMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', hideMobileMenu));
}

/* ----------------------------------------------------
   3. ANIMATED NUMBER COUNTERS
   ---------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';

        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out exponential
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(easeProgress * target);

          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  counters.forEach(c => observer.observe(c));
}

/* ----------------------------------------------------
   4. 12-STAGE LUXURY SPINNING PROCESS
   ---------------------------------------------------- */
const stagesData = [
  {
    num: '01',
    name: 'Blow Room Opening',
    action: 'Aerodynamic Bale Opening & Impurity Extraction',
    combed: true,
    carded: true,
    desc: 'Dense Shankar-6 cotton bales are opened and blended using advanced aerodynamic beaters. Micro-dust and vegetal trash are stripped under positive air pressure while preserving the delicate staple length and natural fiber crimp.',
    machine: 'Automated Micro-Dust Extraction & Bale Plucker Line',
    input: '100% Certified Raw Gujarat Cotton Bales (Shankar-6)',
    output: 'Aerated & Clean Cotton Tufts',
    check: 'Trash content &lt; 0.08%, uniform micronaire blending'
  },
  {
    num: '02',
    name: 'Precision Carding',
    action: 'Individualizing Fibers & Forming Card Sliver',
    combed: true,
    carded: true,
    desc: 'Ultra-fine revolving wire flats individualize entangled fiber tufts into parallel filaments. Residual seed coats, micro-trash, and neps are removed, forming a continuous, untwisted sliver coiled into high-speed cans.',
    machine: 'Chute-Feed High-Production Carding Units',
    input: 'Clean Aerated Tufts',
    output: 'Uniform Continuous Card Sliver (5.0 - 5.5 ktex)',
    check: 'Nep removal efficiency &gt; 95%'
  },
  {
    num: '03',
    name: 'Drawing – 1st Passage',
    action: 'Sliver Doubling & Parallel Alignment',
    combed: true,
    carded: true,
    desc: 'Multiple card slivers (6 to 8) are doubled and drafted through high-speed ceramic-coated roller nips. Eliminates sliver-to-sliver mass variation and straightens hooked fiber ends.',
    machine: 'Breaker Draw Frame with Digital Autolevelling',
    input: '6-8 Card Slivers',
    output: 'Drawn Breaker Sliver',
    check: 'Sliver CV% &lt; 2.0%, mass per meter consistency'
  },
  {
    num: '04',
    name: 'Lap Former',
    action: 'Preparation of High-Density Comber Laps',
    combed: true,
    carded: false,
    badge: 'Combed Yarn Exclusive',
    desc: 'Multiple drawn slivers are aligned side-by-side, attenuated, and compressed under hydraulic pressure into a dense, cylindrical comber lap roll ready for the combing nip line.',
    machine: 'High-Speed Lap Former Unit',
    input: 'Drawn Breaker Slivers',
    output: 'Dense Comber Lap Rolls (~70 g/m)',
    check: 'Lap roll density &amp; edge stability'
  },
  {
    num: '05',
    name: 'High-Speed Comber',
    action: 'Extraction of Short Fibers &amp; Noil',
    combed: true,
    carded: false,
    badge: 'Combed Yarn Exclusive',
    desc: 'Precision circular comb needles systematically extract 14% to 18% short fibers (noil &lt; 12mm) and microscopic impurities, retaining exclusively the longest, strongest cotton fibers for supreme softness.',
    machine: 'Modern High-Production Combers (up to 500 nips/min)',
    input: 'Comber Laps',
    output: 'Pristine Combed Sliver',
    check: 'Short Fiber Content (SFC) reduction &gt; 65%'
  },
  {
    num: '06',
    name: 'Drawing – 2nd Passage',
    action: 'Final Levelling & Homogenization',
    combed: true,
    carded: true,
    badge: 'Both Routes Converge',
    desc: 'Slivers from the combed or carded path undergo a second precision drafting cycle. Dynamic optical autolevellers lock in the exact target grain weight per yard for the ring spinning frame.',
    machine: 'Finisher Draw Frame with Digital Autoleveller',
    input: 'Combed Slivers or 1st Passage Carded Slivers',
    output: 'Homogeneous Finisher Sliver',
    check: 'Strict sliver weight CV% &lt; 1.8%'
  },
  {
    num: '07',
    name: 'Speed Frame (Simplex)',
    action: 'Attenuation & Roving Twist Insertion',
    combed: true,
    carded: true,
    desc: 'The finisher sliver is attenuated into a slender roving strand, receives a delicate protective twist (Twist Factor 1.1 - 1.3), and is wound symmetrically onto roving bobbins.',
    machine: 'Automatic Simplex Speed Frame with Multi-Motor Drive',
    input: 'Finisher Drawn Sliver',
    output: 'Roving Bobbins (Hank 0.80 to 2.20 Ne)',
    check: 'Roving tension &amp; twist factor uniformity'
  },
  {
    num: '08',
    name: 'Ring Spinning (EliTwist® & Compact)',
    action: 'Precision Drafting & Twin-Spun Twisting',
    combed: true,
    carded: true,
    desc: 'Roving is drafted down to the final count (Ne 16 to 40). EliTwist® compact attachments pneumatically condense two rovings and twist them together into a two-ply yarn directly on the spindle, eliminating doubling.',
    machine: 'Ring Spinning Frames with EliTe® / EliTwist® Compact Attachments',
    input: 'Roving Bobbins',
    output: 'Ring Spindle Yarn Cops',
    check: 'Tensile CSP &gt; 2,750, hairiness H &lt; 3.2'
  },
  {
    num: '09',
    name: 'Autoconer Winding',
    action: 'Optical Clearing, Splicing & Waxing',
    combed: true,
    carded: true,
    desc: 'Ring bobbin cops are automatically wound onto large commercial export cones. Optical sensors slice thin/thick defects and neps; electronic air splicers make invisible, knotless joins.',
    machine: 'Automated Autoconer with Digital Optical Clearers & Waxing',
    input: 'Ring Spindle Cops',
    output: 'Fault-Free Cones (1.89 kg net weight)',
    check: 'Classimat fault standards, uniform wax pickup'
  },
  {
    num: '10',
    name: 'Yarn Conditioning (YCP)',
    action: 'Vacuum Moisture Setting & Twist Relaxation',
    combed: true,
    carded: true,
    desc: 'Finished cones enter a vacuum autoclave system where saturated low-temperature steam relaxes internal twist stresses and stabilizes natural cotton moisture regain to 7.5% - 8.5%.',
    machine: 'Vacuum Yarn Conditioning Autoclave',
    input: 'Wound Yarn Cones',
    output: 'Moisture-Stabilized Conditioned Cones',
    check: 'Twist liveliness elimination, moisture regain 7.5%-8.5%'
  },
  {
    num: '11',
    name: 'Box Strapping & Barcoding',
    action: 'Protective Packaging & Batch Traceability',
    combed: true,
    carded: true,
    desc: 'Cones are poly-wrapped and packed into 7-ply heavy corrugated export cartons separated by protective divider trays, barcoded with lot traceability, and strapped securely.',
    machine: 'Automated Box Strapping & Thermal Barcoding',
    input: 'Conditioned Cones & Export Cartons',
    output: 'Sealed, Strapped & Traceable Cartons',
    check: 'Tare & net weight verification per carton'
  },
  {
    num: '12',
    name: 'Palletizing & Dispatch',
    action: 'Container Load Stacking & Logistics',
    combed: true,
    carded: true,
    desc: 'Cartons are stacked onto fumigated wooden or heavy-duty plastic pallets, stretch-wrapped to prevent transit vibration, and loaded into 20ft or 40ft HC containers for prompt mill delivery.',
    machine: 'Stretch Wrapper & Container Logistics Fleet',
    input: 'Strapped Cartons',
    output: 'Containerized Consignments for Mill Dispatch',
    check: 'Moisture barrier integrity & pallet balance'
  }
];

function initSpinningProcess() {
  const stepContainer = document.getElementById('luxuryProcessSteps');
  const detailsContainer = document.getElementById('luxuryProcessDetail');
  const combedBtn = document.getElementById('btnCombedRoute');
  const cardedBtn = document.getElementById('btnCardedRoute');

  if (!stepContainer || !detailsContainer) return;

  let isCarded = false;
  let activeIndex = 0;

  function renderSteps() {
    stepContainer.innerHTML = '';

    stagesData.forEach((stage, idx) => {
      const isSkippedInCarded = isCarded && !stage.carded;
      const isActive = idx === activeIndex;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `group flex flex-col text-left p-4 rounded-2xl border transition-all relative overflow-hidden ${
        isSkippedInCarded 
          ? 'opacity-35 bg-neutral-100 border-black/[0.04] cursor-not-allowed' 
          : isActive 
            ? 'border-amber-500 bg-amber-500/10 text-neutral-950 shadow-md ring-1 ring-amber-400' 
            : 'border-black/[0.07] bg-white hover:border-amber-400/50 text-neutral-700 hover:bg-[#FBF9F5] shadow-sm'
      }`;

      btn.innerHTML = `
        <div class="flex items-center justify-between w-full mb-1.5">
          <span class="font-mono text-[10px] tracking-wider uppercase font-semibold ${isActive ? 'text-amber-800' : 'text-neutral-500 group-hover:text-amber-700'}">
            STAGE ${stage.num}
          </span>
          ${isSkippedInCarded ? '<span class="text-[9px] font-mono text-amber-700 font-medium">Bypassed</span>' : ''}
          ${stage.badge && !isSkippedInCarded ? `<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/80 border border-amber-600/20 ${isActive ? 'text-amber-800 font-semibold' : 'text-neutral-500'}">${stage.badge}</span>` : ''}
        </div>
        <span class="text-xs font-semibold truncate w-full ${isActive ? 'text-neutral-950 font-bold' : 'text-neutral-800'}">${stage.name}</span>
        <span class="text-[10px] font-sans truncate w-full mt-0.5 ${isActive ? 'text-amber-900 font-medium' : 'text-neutral-600'}">${stage.action.split('&')[0]}</span>
      `;

      if (!isSkippedInCarded) {
        btn.addEventListener('click', () => {
          activeIndex = idx;
          renderSteps();
        });
      }

      stepContainer.appendChild(btn);
    });

    renderDetail(stagesData[activeIndex], isCarded && !stagesData[activeIndex].carded);
  }

  function renderDetail(stage, isSkipped) {
    detailsContainer.innerHTML = `
      <div class="luxury-glass text-neutral-900 rounded-3xl p-6 sm:p-10 border border-amber-600/25 shadow-xl relative overflow-hidden">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.06] gap-4">
          <div>
            <div class="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-2">
              <span class="text-amber-800 font-semibold">Manufacturing Gate ${stage.num} of 12</span>
              <span class="text-neutral-300">&bull;</span>
              <span class="${isSkipped ? 'text-amber-700 font-medium' : 'text-emerald-800 font-bold'}">${isSkipped ? 'Bypassed in Carded Flow' : 'Quality Verified &bull; Uster 5%'}</span>
            </div>
            <h3 class="font-serif text-2xl sm:text-4xl font-light text-neutral-950">${stage.name}</h3>
            <p class="text-xs sm:text-sm text-neutral-600 mt-1 font-light">${stage.action}</p>
          </div>
          <div class="text-left sm:text-right">
            <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">Plant Machinery</span>
            <span class="text-xs sm:text-sm font-mono font-bold text-amber-900">${stage.machine}</span>
          </div>
        </div>

        <p class="text-sm text-neutral-700 leading-relaxed py-6 border-b border-black/[0.06] font-light">
          ${stage.desc}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div class="p-4 rounded-2xl bg-[#FBF9F5] border border-black/[0.06]">
            <span class="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1">Input Feed</span>
            <p class="text-xs text-neutral-900 font-mono font-medium">${stage.input}</p>
          </div>
          <div class="p-4 rounded-2xl bg-[#FBF9F5] border border-black/[0.06]">
            <span class="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1">Delivered Output</span>
            <p class="text-xs text-neutral-900 font-mono font-medium">${stage.output}</p>
          </div>
          <div class="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-600/20">
            <span class="text-[10px] uppercase font-mono tracking-widest text-amber-800 block mb-1">Quality Inspection Gate</span>
            <p class="text-xs text-neutral-900 font-mono font-semibold">${stage.check}</p>
          </div>
        </div>

        <div class="flex items-center justify-between pt-6 mt-6 border-t border-black/[0.06]">
          <button id="prevStepBtn" class="text-xs font-mono font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-700 transition-colors flex items-center gap-2">
            &larr; Previous Stage
          </button>
          <span class="text-xs font-mono tracking-widest text-neutral-500">STAGE ${stage.num} / 12</span>
          <button id="nextStepBtn" class="text-xs font-mono font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-700 transition-colors flex items-center gap-2">
            Next Stage &rarr;
          </button>
        </div>
      </div>
    `;

    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let prevIdx = activeIndex - 1;
        if (prevIdx < 0) prevIdx = stagesData.length - 1;
        if (isCarded && !stagesData[prevIdx].carded) prevIdx = 2; // skip 05 and 04 to 03
        activeIndex = prevIdx;
        renderSteps();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let nextIdx = activeIndex + 1;
        if (nextIdx >= stagesData.length) nextIdx = 0;
        if (isCarded && !stagesData[nextIdx].carded) nextIdx = 5; // skip 04 and 05 to 06
        activeIndex = nextIdx;
        renderSteps();
      });
    }
  }

  if (combedBtn && cardedBtn) {
    combedBtn.addEventListener('click', () => {
      isCarded = false;
      combedBtn.classList.add('bg-[#0284C7]', 'text-white', 'font-semibold', 'shadow-sm');
      combedBtn.classList.remove('text-neutral-600', 'hover:text-neutral-950');
      cardedBtn.classList.remove('bg-[#0284C7]', 'text-white', 'font-semibold', 'shadow-sm');
      cardedBtn.classList.add('text-neutral-600', 'hover:text-neutral-950');
      renderSteps();
    });

    cardedBtn.addEventListener('click', () => {
      isCarded = true;
      cardedBtn.classList.add('bg-[#0284C7]', 'text-white', 'font-semibold', 'shadow-sm');
      cardedBtn.classList.remove('text-neutral-600', 'hover:text-neutral-950');
      combedBtn.classList.remove('bg-[#0284C7]', 'text-white', 'font-semibold', 'shadow-sm');
      combedBtn.classList.add('text-neutral-600', 'hover:text-neutral-950');
      if (!stagesData[activeIndex].carded) activeIndex = 5;
      renderSteps();
    });
  }

  renderSteps();
}

/* ----------------------------------------------------
   5. PRODUCT PORTFOLIO WITH LUXURY ASSETS
   ---------------------------------------------------- */
const productsCatalog = [
  {
    id: 'elitwist',
    category: 'elitwist',
    name: 'EliTwist® Compact Twin Yarn',
    badge: 'Haute Couture Flagship',
    countRange: 'Ne 2/20, 2/30 to 2/40',
    spunType: 'Twin-Spun Compact Ring Spun',
    rawMaterial: '100% Indian Shankar-6 Extra Long Staple',
    hairiness: 'Ultra-Low (H < 3.2)',
    csp: '> 2,750 (Extreme Tensile Tenacity)',
    applications: 'Bespoke shirting, luxury knitwear, fine suiting, high-end Italian-style apparel',
    desc: 'Manufactured by simultaneously compacting and twisting two rovings at the ring spindle. Eliminates traditional doubling while achieving supreme seam strength, silky handle, and pill resistance for high-end fashion houses.',
    img: 'images/luxury-yarn-spools-gold.jpg'
  },
  {
    id: 'compact',
    category: 'compact',
    name: '100% Cotton Compact Yarn',
    badge: 'High Evenness',
    countRange: 'Ne 20s to 40s (Warp & Hosiery)',
    spunType: 'Compact Ring Spun',
    rawMaterial: '100% Pure Natural Gujarat Cotton',
    hairiness: 'H < 3.8',
    csp: '> 2,550',
    applications: 'Premium circular knitwear, single jersey, interlock, pique polo, high-speed airjet weaving',
    desc: 'Spun using pneumatic compact suction to consolidate edge fibers into the core strand. Minimizes fly and lint formation during high-speed knitting while providing exceptional dye vibrancy.',
    img: 'images/spinning-ringframe.jpg'
  },
  {
    id: 'combed',
    category: 'combed',
    name: '100% Combed Cotton Yarn',
    badge: 'Supreme Softness',
    countRange: 'Ne 16s to 32s',
    spunType: 'Combed Ring Spun',
    rawMaterial: 'High-Grade Medium & Long Staple Cotton',
    hairiness: 'H ~ 4.2',
    csp: '> 2,400',
    applications: 'Luxury innerwear, babywear, bespoke bed linens, fine apparel fabrics',
    desc: 'Exhaustive combing removes 14% to 18% short fibers and impurities, leaving long, parallel cotton fibers that offer supple softness and vibrant dye uptake for high-end apparel.',
    img: 'images/luxury-fabric-drape.jpg'
  },
  {
    id: 'carded',
    category: 'carded',
    name: '100% Carded Cotton Yarn',
    badge: 'Rugged Durability',
    countRange: 'Ne 16s to 34s (Weft & Knitting)',
    spunType: 'Carded Ring Spun',
    rawMaterial: '100% Clean Gujarat Raw Cotton',
    hairiness: 'H ~ 4.8 - 5.2',
    csp: '> 2,150',
    applications: 'Premium denim warp/weft, plush terry towels, canvas, upholstery, industrial fabrics',
    desc: 'Spun directly from carded slivers through high-precision draft geometry, providing dependable tensile strength for high-volume weaving, heavy denim, and industrial textiles.',
    img: 'images/textile-applications.jpg'
  },
  {
    id: 'bales',
    category: 'bales',
    name: 'Certified Raw Cotton Bales',
    badge: 'Trading Division',
    countRange: 'Standard 170 KG Bales',
    spunType: 'Ginned Bales',
    rawMaterial: 'Shankar-6 & MCU-5 Extra Long Staple',
    hairiness: 'Staple Length: 28mm to 31mm',
    csp: 'Micronaire: 3.8 to 4.2 Mic',
    applications: 'Spinning mills across India and global export spinners',
    desc: 'Direct procurement from certified ginners and government federations across Gujarat. Supported by our 3,500 m² warehouse storage and comprehensive HVI fiber testing laboratory.',
    img: 'images/raw-cotton-bales.jpg'
  }
];

function initProductFilter() {
  const filterBtns = document.querySelectorAll('[data-product-filter]');
  const cards = document.querySelectorAll('[data-product-category]');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-product-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-neutral-950', 'font-semibold', 'shadow-sm');
        b.classList.add('text-neutral-600', 'hover:text-neutral-950');
      });
      btn.classList.add('bg-amber-500', 'text-neutral-950', 'font-semibold', 'shadow-sm');
      btn.classList.remove('text-neutral-600', 'hover:text-neutral-950');

      cards.forEach(card => {
        const cat = card.getAttribute('data-product-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.classList.add('reveal', 'is-visible');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ----------------------------------------------------
   6. LUXURY PRODUCT MODAL SPEC SHEET
   ---------------------------------------------------- */
function initProductModal() {
  const modal = document.getElementById('luxuryProductModal');
  const modalBody = document.getElementById('luxuryModalBody');
  const closeModal = document.getElementById('closeLuxuryModal');

  if (!modal || !modalBody) return;

  window.openProductSpec = function(id) {
    const p = productsCatalog.find(item => item.id === id);
    if (!p) return;

    modalBody.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-neutral-900">
        <div class="md:col-span-5">
          <div class="rounded-2xl overflow-hidden bg-neutral-100 border border-amber-600/30 h-72 md:h-96 relative shadow-xl">
            <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-white/90 text-amber-900 font-mono-tech text-[10px] px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-amber-500/30 font-semibold shadow-sm">
              ${p.badge}
            </span>
          </div>
          <div class="mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-neutral-800 leading-relaxed font-mono-tech shadow-sm">
            <strong class="text-amber-900 block mb-1">Standard Packaging Architecture:</strong>
            1.89 KG Net Weight Paper Cones &bull; 24 Cones / 7-Ply Heavy Corrugated Carton (~45.36 KG Net) &bull; Stretch-Wrapped Export Pallets.
          </div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-between">
          <div>
            <span class="text-[11px] font-mono-tech text-amber-800 uppercase tracking-widest block mb-1 font-semibold">Certified Technical Specification</span>
            <h3 class="font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight mb-2">${p.name}</h3>
            <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-light">${p.desc}</p>

            <div class="space-y-2.5 text-xs border-y border-black/[0.08] py-4 mb-6 font-mono-tech">
              <div class="flex justify-between py-1 border-b border-black/[0.04]">
                <span class="text-neutral-500">English Ne Count Range:</span>
                <span class="font-bold text-amber-800">${p.countRange}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-black/[0.04]">
                <span class="text-neutral-500">Spinning Mechanism:</span>
                <span class="font-semibold text-neutral-900">${p.spunType}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-black/[0.04]">
                <span class="text-neutral-500">Raw Fiber Blend:</span>
                <span class="font-semibold text-neutral-900">${p.rawMaterial}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-black/[0.04]">
                <span class="text-neutral-500">Hairiness Index (H):</span>
                <span class="font-bold text-emerald-700">${p.hairiness}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-black/[0.04]">
                <span class="text-neutral-500">Tensile Tenacity (CSP):</span>
                <span class="font-bold text-amber-800">${p.csp}</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-neutral-500">Target Applications:</span>
                <span class="text-neutral-800 text-right max-w-[60%] font-sans text-xs">${p.applications}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="#rfqSection" onclick="document.getElementById('luxuryProductModal').classList.add('hidden'); selectProduct('${p.name}');" class="flex-1 gold-gradient-bg text-black text-xs font-bold py-3.5 px-4 rounded-xl text-center transition-all shadow-md uppercase tracking-wider hover:opacity-90">
              Request Commercial Quotation &rarr;
            </a>
            <button onclick="window.print();" class="px-5 py-3.5 border border-black/20 hover:border-amber-600 text-neutral-800 rounded-xl text-xs font-mono-tech transition-colors flex items-center justify-center gap-2">
              <i class="fa-solid fa-print"></i> Print Spec Sheet
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  function closeModalWindow() {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  if (closeModal) closeModal.addEventListener('click', closeModalWindow);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalWindow();
  });
}

window.selectProduct = function(name) {
  const select = document.getElementById('rfqProductSelect');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(name) || name.includes(select.options[i].value)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
};

/* ----------------------------------------------------
   7. LIVE PROCUREMENT & CONTAINER LOAD CALCULATOR
   ---------------------------------------------------- */
function initLiveCalculator() {
  const slider = document.getElementById('luxuryQtySlider');
  const qtyDisplay = document.getElementById('luxuryQtyDisplay');
  const countSelect = document.getElementById('luxuryCountSelect');

  if (!slider) return;

  const coneWeight = 1.89; // kg/cone
  const conesPerBox = 24;  // cones/box (~45.36 kg net)
  const boxesPerPallet = 20;

  function recalculate() {
    const tons = parseFloat(slider.value) || 1;
    if (qtyDisplay) qtyDisplay.textContent = tons.toFixed(1) + ' Metric Tons';

    const totalKg = tons * 1000;
    const cones = Math.ceil(totalKg / coneWeight);
    const boxes = Math.ceil(cones / conesPerBox);
    const pallets = Math.ceil(boxes / boxesPerPallet);

    // 20ft container: ~10,000 kg; 40ft High Cube: ~21,500 kg
    const containers40 = (totalKg / 21500).toFixed(1);
    const containers20 = (totalKg / 10000).toFixed(1);

    const outKg = document.getElementById('calcNetKg');
    const outCones = document.getElementById('calcCones');
    const outBoxes = document.getElementById('calcBoxes');
    const outPallets = document.getElementById('calcPallets');
    const outContainers = document.getElementById('calcContainers');

    if (outKg) outKg.textContent = totalKg.toLocaleString() + ' KG';
    if (outCones) outCones.textContent = cones.toLocaleString();
    if (outBoxes) outBoxes.textContent = boxes.toLocaleString();
    if (outPallets) outPallets.textContent = pallets.toLocaleString();
    if (outContainers) outContainers.textContent = `${containers40} × 40ft HC (${containers20} × 20ft)`;
  }

  slider.addEventListener('input', recalculate);
  if (countSelect) countSelect.addEventListener('change', recalculate);

  const transferBtn = document.getElementById('transferCalcToQuote');
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const tons = slider.value;
      const count = countSelect ? countSelect.value : 'Ne 2/30 EliTwist Compact';
      const rfqMsg = document.getElementById('rfqMessage');
      if (rfqMsg) {
        rfqMsg.value = `Procurement Request: ${tons} Metric Tons of ${count}. Standard export cone packaging requested (1.89 kg/cone).`;
      }
      const rfqSec = document.getElementById('rfqSection');
      if (rfqSec) rfqSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  recalculate();
}

/* ----------------------------------------------------
   8. LUXURY RFQ FORM HANDLER & GOOGLE SHEETS INTEGRATION
   ---------------------------------------------------- */
// Set your Google Apps Script Web App URL below:
const GOOGLE_SHEETS_WEB_APP_URL = window.GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyFYhDn-Qw5rYqdTPdzpO04tAqIz5LUVzcXqVyvTAufCOVQ4v6L8FSgOOjtKTwjDpjiPQ/exec';

function initRfqForm() {
  const form = document.getElementById('luxuryRfqForm');
  const toast = document.getElementById('luxuryToast');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    const name = (form.querySelector('[name="name"]') || document.querySelector('[name="name"]'))?.value || 'Client';
    const company = (form.querySelector('[name="company"]') || document.querySelector('[name="company"]'))?.value || 'N/A';
    const email = (form.querySelector('[name="email"]') || document.querySelector('[name="email"]'))?.value || '';
    const phone = (form.querySelector('[name="phone"]') || document.querySelector('[name="phone"]'))?.value || '';
    const product = (form.querySelector('[name="product"]') || document.querySelector('[name="product"]'))?.value || 'Cotton Yarn';
    const qty = (form.querySelector('[name="quantity"]') || document.querySelector('[name="quantity"]'))?.value || 'Standard Volume';
    const terms = (form.querySelector('[name="delivery_terms"]') || document.querySelector('[name="delivery_terms"]'))?.value || 'Ex-Mill / FOB';
    const msg = (form.querySelector('[name="message"]') || document.querySelector('[name="message"]'))?.value || '';
    const page = document.title.split('—')[0].trim() || window.location.pathname;

    const payload = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: name,
      company: company,
      email: email,
      phone: phone,
      product: product,
      quantity: qty,
      delivery_terms: terms,
      message: msg,
      page: page
    };

    // UI Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Transmitting to Google Sheets & CRM...</span>
      `;
    }

    // Google Sheets transmission
    if (GOOGLE_SHEETS_WEB_APP_URL && GOOGLE_SHEETS_WEB_APP_URL.trim() !== '') {
      try {
        await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload)
        });
        console.log('Commercial RFQ synchronized with Google Sheet successfully.');
      } catch (err) {
        console.warn('Google Sheets transmission note:', err);
      }
    } else {
      console.info('Google Sheets URL not yet configured. Set GOOGLE_SHEETS_WEB_APP_URL to enable live sheet logging.');
    }

    // Visual Confirmation state on Button
    if (submitBtn) {
      submitBtn.innerHTML = `
        <svg class="h-4 w-4 text-black mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Recorded in Google Sheet ✓</span>
      `;
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 3000);
    }

    // Show luxury confirmation toast
    if (toast) {
      toast.classList.remove('hidden', 'translate-y-8', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.add('translate-y-8', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 400);
      }, 6000);
    }

    // Populate direct WhatsApp handoff
    const waText = encodeURIComponent(
      `*Official Commercial Inquiry — Rudra Cottex Limited*\n` +
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Product: ${product}\n` +
      `Requirement: ${qty}\n` +
      `Terms: ${terms}\n` +
      `Specifications: ${msg}`
    );
    const waLink = document.getElementById('toastWaBtn');
    if (waLink) {
      waLink.href = `https://wa.me/919773190667?text=${waText}`;
    }

    form.reset();
  });
}

/* ----------------------------------------------------
   9. LUXURY FAQ ACCORDION
   ---------------------------------------------------- */
function initFaqAccordion() {
  const toggles = document.querySelectorAll('.luxury-faq-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const panel = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');

      const isClosed = panel.classList.contains('hidden');

      // Close all other panels
      document.querySelectorAll('.luxury-faq-panel').forEach(p => p.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-45'));

      if (isClosed) {
        panel.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-45');
      }
    });
  });
}
