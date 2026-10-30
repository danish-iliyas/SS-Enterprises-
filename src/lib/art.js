// Flat brand-coloured illustrations as SVG strings.
// Used on the site (services, product placeholders, hero) and by the seed script,
// which renders them to compressed WebP with sharp and stores them in MongoDB.

const C = {
  navy: '#10244D',
  blue: '#0755E8',
  blue2: '#3D7BF2',
  sky: '#DCE7FE',
  sky2: '#B6CDFC',
  water: '#7FB0FF',
  sun: '#FFD600',
  white: '#FFFFFF',
  grey: '#E7ECF5',
  steel: '#C9D3E3',
  skin: '#F1BE95',
};

const S = `stroke="${C.navy}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const s3 = `stroke="${C.navy}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;

const drawings = {
  ro: () => `
    <rect x="135" y="38" width="130" height="200" rx="20" fill="${C.white}" ${S}/>
    <path d="M135 82 V58 a20 20 0 0 1 20 -20 h90 a20 20 0 0 1 20 20 V82 Z" fill="${C.blue}" ${S}/>
    <circle cx="160" cy="60" r="5" fill="${C.sun}"/><circle cx="178" cy="60" r="5" fill="${C.white}"/>
    <rect x="160" y="100" width="80" height="96" rx="12" fill="${C.sky}" ${s3}/>
    <path d="M160 150 q20 -10 40 0 t40 0 V184 a12 12 0 0 1 -12 12 h-56 a12 12 0 0 1 -12 -12 Z" fill="${C.water}"/>
    <circle cx="185" cy="170" r="4" fill="${C.white}"/><circle cx="210" cy="160" r="3" fill="${C.white}"/>
    <rect x="160" y="100" width="80" height="96" rx="12" fill="none" ${s3}/>
    <rect x="182" y="210" width="36" height="10" rx="5" fill="${C.sun}" ${s3}/>
    <path d="M200 238 v14 h22 v10" fill="none" ${S}/>
    <path d="M222 270 q-6 9 0 13 q6 -4 0 -13Z" fill="${C.blue}"/>`,

  ac: () => `
    <rect x="55" y="70" width="290" height="100" rx="24" fill="${C.white}" ${S}/>
    <path d="M55 135 h290" ${s3} fill="none"/>
    <rect x="72" y="145" width="256" height="12" rx="6" fill="${C.sky}" ${s3}/>
    <rect x="270" y="92" width="46" height="22" rx="6" fill="${C.navy}"/>
    <rect x="277" y="98" width="14" height="10" rx="2" fill="${C.sun}"/><circle cx="304" cy="103" r="3.5" fill="${C.water}"/>
    <path d="M80 100 h150" stroke="${C.sky2}" stroke-width="6" stroke-linecap="round"/>
    <path d="M110 190 q10 14 0 28 t0 28 M170 190 q10 14 0 28 t0 28 M230 190 q10 14 0 28 t0 28 M290 190 q10 14 0 28 t0 28" fill="none" stroke="${C.blue2}" stroke-width="5" stroke-linecap="round"/>
    <g transform="translate(330 58)"><circle r="20" fill="${C.sun}" ${s3}/><path d="M0 -11 V11 M-10 -6 L10 6 M-10 6 L10 -6" stroke="${C.navy}" stroke-width="3.5" stroke-linecap="round"/></g>`,

  cooler: () => `
    <rect x="125" y="62" width="150" height="180" rx="18" fill="${C.blue}" ${S}/>
    <rect x="115" y="40" width="170" height="34" rx="12" fill="${C.navy}" ${S}/>
    <rect x="145" y="88" width="110" height="110" rx="14" fill="${C.white}" ${s3}/>
    <circle cx="200" cy="143" r="42" fill="${C.sky}" ${s3}/>
    <g fill="${C.blue2}" ${s3}>
      <path d="M200 143 q-6 -30 18 -34 q6 22 -18 34Z"/><path d="M200 143 q30 -6 34 18 q-22 6 -34 -18Z"/>
      <path d="M200 143 q6 30 -18 34 q-6 -22 18 -34Z"/><path d="M200 143 q-30 6 -34 -18 q22 -6 34 18Z"/>
    </g>
    <circle cx="200" cy="143" r="7" fill="${C.sun}" ${s3}/>
    <rect x="145" y="208" width="110" height="18" rx="9" fill="${C.sky}" ${s3}/>
    <circle cx="232" cy="217" r="4" fill="${C.sun}"/>
    <circle cx="148" cy="255" r="11" fill="${C.navy}"/><circle cx="252" cy="255" r="11" fill="${C.navy}"/>`,

  washing_machine: () => `
    <rect x="110" y="35" width="180" height="230" rx="20" fill="${C.white}" ${S}/>
    <path d="M110 85 h180" ${s3} fill="none"/>
    <rect x="128" y="52" width="60" height="18" rx="6" fill="${C.sky}" ${s3}/>
    <circle cx="240" cy="61" r="11" fill="${C.sun}" ${s3}/><circle cx="268" cy="61" r="6" fill="${C.blue}"/>
    <circle cx="200" cy="170" r="62" fill="${C.grey}" ${S}/>
    <circle cx="200" cy="170" r="46" fill="${C.sky}" ${s3}/>
    <path d="M156 178 q11 -12 22 0 t22 0 t22 0 t22 0 V182 a46 46 0 0 1 -88 0Z" fill="${C.water}"/>
    <circle cx="200" cy="170" r="46" fill="none" ${s3}/>
    <path d="M178 150 a28 28 0 0 1 20 -10" stroke="${C.white}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="125" y="265" width="22" height="8" rx="3" fill="${C.navy}"/><rect x="253" y="265" width="22" height="8" rx="3" fill="${C.navy}"/>`,

  refrigerator: () => `
    <rect x="135" y="22" width="130" height="252" rx="18" fill="${C.white}" ${S}/>
    <rect x="135" y="22" width="22" height="252" rx="10" fill="${C.sky}" opacity=".7"/>
    <rect x="135" y="22" width="130" height="252" rx="18" fill="none" ${S}/>
    <path d="M135 105 h130" ${S} fill="none"/>
    <rect x="240" y="48" width="10" height="38" rx="5" fill="${C.navy}"/>
    <rect x="240" y="122" width="10" height="64" rx="5" fill="${C.navy}"/>
    <circle cx="170" cy="130" r="9" fill="${C.sun}" ${s3}/>
    <g transform="translate(200 66)" stroke="${C.blue}" stroke-width="3.5" stroke-linecap="round"><path d="M0 -14 V14 M-12 -7 L12 7 M-12 7 L12 -7"/></g>
    <rect x="150" y="274" width="20" height="8" rx="3" fill="${C.navy}"/><rect x="230" y="274" width="20" height="8" rx="3" fill="${C.navy}"/>`,

  geyser: () => `
    <rect x="145" y="30" width="110" height="185" rx="50" fill="${C.white}" ${S}/>
    <rect x="145" y="30" width="110" height="185" rx="50" fill="${C.sky}" opacity=".35"/>
    <rect x="145" y="30" width="110" height="185" rx="50" fill="none" ${S}/>
    <rect x="172" y="130" width="56" height="34" rx="10" fill="${C.navy}"/>
    <circle cx="188" cy="147" r="6" fill="${C.sun}"/><circle cx="212" cy="147" r="6" fill="#FF6B4A"/>
    <path d="M180 215 v45 M220 215 v45" ${S} fill="none"/>
    <rect x="170" y="255" width="20" height="14" rx="4" fill="${C.blue}" ${s3}/>
    <rect x="210" y="255" width="20" height="14" rx="4" fill="#FF6B4A" ${s3}/>
    <path d="M182 72 q8 -10 0 -20 M200 72 q8 -10 0 -20 M218 72 q8 -10 0 -20" stroke="#FF8A65" stroke-width="5" fill="none" stroke-linecap="round"/>`,

  wiring: () => `
    <rect x="150" y="70" width="100" height="120" rx="14" fill="${C.white}" ${S}/>
    <rect x="168" y="90" width="64" height="80" rx="8" fill="${C.sky}" ${s3}/>
    <rect x="185" y="105" width="30" height="20" rx="5" fill="${C.white}" ${s3}/>
    <rect x="185" y="135" width="30" height="20" rx="5" fill="${C.sun}" ${s3}/>
    <path d="M150 110 C 100 110 110 40 60 50" stroke="${C.navy}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M150 110 C 100 110 110 40 60 50" stroke="#FF6B4A" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M250 150 C 300 150 290 230 345 220" stroke="${C.navy}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M250 150 C 300 150 290 230 345 220" stroke="${C.blue}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M200 190 C 200 230 150 230 140 265" stroke="${C.navy}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M200 190 C 200 230 150 230 140 265" stroke="#35B26B" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M300 40 l-22 40 h22 l-14 36 l36 -50 h-22 l14 -26Z" fill="${C.sun}" ${s3}/>`,

  electrical: () => `
    <path d="M200 40 a62 62 0 0 1 36 112 v26 h-72 v-26 a62 62 0 0 1 36 -112Z" fill="${C.sun}" ${S}/>
    <path d="M186 176 v-50 l7 -12 l7 12 l7 -12 l7 12 v50" stroke="${C.navy}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="166" y="178" width="68" height="16" rx="5" fill="${C.steel}" ${s3}/>
    <rect x="170" y="194" width="60" height="16" rx="5" fill="${C.steel}" ${s3}/>
    <path d="M186 210 h28 l-6 14 h-16Z" fill="${C.navy}"/>
    <path d="M110 70 l-22 -12 M100 120 h-26 M290 70 l22 -12 M300 120 h26 M120 30 l-12 -18 M280 30 l12 -18" stroke="${C.blue}" stroke-width="6" stroke-linecap="round"/>
    <g transform="translate(300 220) rotate(-35)"><rect x="-8" y="-50" width="16" height="60" rx="5" fill="${C.blue}" ${s3}/><rect x="-4" y="10" width="8" height="40" fill="${C.steel}" ${s3}/></g>`,

  filter: () => `
    <rect x="70" y="115" width="260" height="76" rx="18" fill="${C.white}" ${S}/>
    <rect x="70" y="115" width="44" height="76" rx="14" fill="${C.blue}" ${S}/>
    <rect x="286" y="115" width="44" height="76" rx="14" fill="${C.blue}" ${S}/>
    <path d="M136 120 v66 M160 120 v66 M184 120 v66 M208 120 v66 M232 120 v66 M256 120 v66" stroke="${C.sky2}" stroke-width="5"/>
    <rect x="160" y="134" width="80" height="38" rx="8" fill="${C.sun}" ${s3}/>
    <rect x="52" y="141" width="18" height="24" rx="5" fill="${C.navy}"/><rect x="330" y="141" width="18" height="24" rx="5" fill="${C.navy}"/>`,

  membrane: () => `
    <rect x="50" y="118" width="300" height="70" rx="35" fill="${C.blue}" ${S}/>
    <rect x="130" y="118" width="120" height="70" fill="${C.white}" ${s3}/>
    <rect x="150" y="138" width="80" height="10" rx="5" fill="${C.navy}"/><rect x="150" y="156" width="54" height="8" rx="4" fill="${C.sky2}"/>
    <path d="M90 128 v50 M110 128 v50 M270 128 v50 M290 128 v50" stroke="${C.blue2}" stroke-width="4"/>
    <rect x="30" y="143" width="22" height="20" rx="5" fill="${C.navy}"/><rect x="348" y="143" width="22" height="20" rx="5" fill="${C.navy}"/>`,

  pump: () => `
    <rect x="80" y="110" width="150" height="100" rx="20" fill="${C.navy}" ${S}/>
    <path d="M100 125 v70 M120 125 v70 M140 125 v70 M160 125 v70 M180 125 v70 M200 125 v70" stroke="${C.blue2}" stroke-width="5"/>
    <rect x="230" y="98" width="90" height="124" rx="22" fill="${C.white}" ${S}/>
    <circle cx="275" cy="160" r="28" fill="${C.sky}" ${s3}/><circle cx="275" cy="160" r="9" fill="${C.sun}" ${s3}/>
    <rect x="262" y="70" width="26" height="30" rx="5" fill="${C.blue}" ${s3}/>
    <rect x="318" y="146" width="30" height="26" rx="5" fill="${C.blue}" ${s3}/>
    <rect x="100" y="210" width="110" height="18" rx="6" fill="${C.steel}" ${s3}/>`,

  accessory: () => `
    <path d="M110 120 h110 a30 30 0 0 1 30 30 v40" fill="none" stroke="${C.navy}" stroke-width="28" stroke-linecap="round"/>
    <path d="M110 120 h110 a30 30 0 0 1 30 30 v40" fill="none" stroke="${C.steel}" stroke-width="18" stroke-linecap="round"/>
    <rect x="70" y="95" width="50" height="50" rx="10" fill="${C.blue}" ${S}/>
    <rect x="160" y="70" width="44" height="30" rx="8" fill="${C.sun}" ${S}/>
    <path d="M182 100 v16" ${S}/>
    <path d="M250 218 q-12 18 0 26 q12 -8 0 -26Z" fill="${C.water}" ${s3}/>
    <path d="M250 254 q-9 13 0 19 q9 -6 0 -19Z" fill="${C.water}"/>`,

  capacitor: () => `
    <rect x="140" y="80" width="120" height="170" rx="22" fill="${C.steel}" ${S}/>
    <rect x="140" y="80" width="28" height="170" rx="14" fill="${C.white}" opacity=".7"/>
    <rect x="140" y="80" width="120" height="170" rx="22" fill="none" ${S}/>
    <rect x="160" y="140" width="80" height="56" rx="8" fill="${C.blue}" ${s3}/>
    <path d="M178 158 h44 M178 176 h30" stroke="${C.white}" stroke-width="5" stroke-linecap="round"/>
    <rect x="150" y="62" width="100" height="22" rx="8" fill="${C.navy}"/>
    <rect x="168" y="38" width="14" height="26" rx="3" fill="${C.sun}" ${s3}/><rect x="218" y="38" width="14" height="26" rx="3" fill="${C.sun}" ${s3}/>`,

  motor: () => `
    <rect x="95" y="95" width="170" height="120" rx="26" fill="${C.blue}" ${S}/>
    <path d="M120 105 v100 M145 105 v100 M170 105 v100 M195 105 v100 M220 105 v100 M245 105 v100" stroke="${C.blue2}" stroke-width="6"/>
    <rect x="95" y="95" width="170" height="120" rx="26" fill="none" ${S}/>
    <rect x="265" y="130" width="24" height="50" rx="6" fill="${C.navy}"/>
    <rect x="289" y="148" width="60" height="14" rx="5" fill="${C.steel}" ${s3}/>
    <rect x="150" y="68" width="50" height="30" rx="6" fill="${C.sun}" ${s3}/>
    <path d="M115 215 l-15 30 h160 l-15 -30" fill="${C.navy}"/>`,

  cooling_pad: () => `
    <rect x="100" y="45" width="200" height="215" rx="10" fill="#E9C77B" ${S}/>
    <g stroke="#B58A2F" stroke-width="4" fill="none">
      <path d="M100 75 l40 25 l40 -25 l40 25 l40 -25 l40 25"/>
      <path d="M100 115 l40 25 l40 -25 l40 25 l40 -25 l40 25"/>
      <path d="M100 155 l40 25 l40 -25 l40 25 l40 -25 l40 25"/>
      <path d="M100 195 l40 25 l40 -25 l40 25 l40 -25 l40 25"/>
      <path d="M100 235 l40 20 l40 -20 l40 20 l40 -20 l40 20"/>
    </g>
    <rect x="100" y="45" width="200" height="215" rx="10" fill="none" ${S}/>
    <path d="M320 90 q-10 15 0 22 q10 -7 0 -22Z M335 130 q-8 12 0 18 q8 -6 0 -18Z" fill="${C.water}"/>`,

  drain_pump: () => `
    <circle cx="180" cy="160" r="60" fill="${C.white}" ${S}/>
    <circle cx="180" cy="160" r="36" fill="${C.sky}" ${s3}/>
    <circle cx="180" cy="160" r="10" fill="${C.sun}" ${s3}/>
    <rect x="232" y="138" width="90" height="34" rx="12" fill="${C.blue}" ${S}/>
    <rect x="160" y="70" width="40" height="40" rx="8" fill="${C.navy}"/>
    <rect x="166" y="52" width="10" height="22" rx="3" fill="${C.sun}"/><rect x="184" y="52" width="10" height="22" rx="3" fill="${C.sun}"/>
    <path d="M130 210 l-20 30 M230 210 l20 30" ${S}/>`,

  switch: () => `
    <rect x="80" y="80" width="240" height="150" rx="18" fill="${C.white}" ${S}/>
    <rect x="100" y="100" width="44" height="66" rx="8" fill="${C.grey}" ${s3}/><rect x="108" y="108" width="28" height="22" rx="5" fill="${C.blue}"/>
    <rect x="152" y="100" width="44" height="66" rx="8" fill="${C.grey}" ${s3}/><rect x="160" y="136" width="28" height="22" rx="5" fill="${C.navy}"/>
    <rect x="204" y="100" width="96" height="66" rx="8" fill="${C.grey}" ${s3}/>
    <circle cx="232" cy="133" r="7" fill="${C.navy}"/><circle cx="256" cy="120" r="6" fill="${C.navy}"/><circle cx="256" cy="146" r="6" fill="${C.navy}"/>
    <rect x="100" y="182" width="200" height="30" rx="8" fill="${C.sky}" ${s3}/>
    <circle cx="120" cy="197" r="6" fill="${C.sun}"/>`,

  tools: () => `
    <g transform="rotate(-40 200 160)">
      <rect x="188" y="70" width="24" height="170" rx="10" fill="${C.steel}" ${S}/>
      <path d="M170 60 a30 30 0 1 0 60 0 l-12 0 v18 h-36 v-18Z" fill="${C.steel}" ${S}/>
    </g>
    <g transform="rotate(40 200 160)">
      <rect x="186" y="150" width="28" height="100" rx="10" fill="${C.blue}" ${S}/>
      <rect x="194" y="60" width="12" height="92" fill="${C.steel}" ${s3}/>
      <path d="M194 60 l6 -16 l6 16Z" fill="${C.navy}"/>
    </g>
    <circle cx="200" cy="160" r="12" fill="${C.sun}" ${s3}/>`,
};

export const ART_KINDS = Object.keys(drawings);

// Full illustration: soft background card + drawing. 400x300 viewBox (4:3).
export function artSvg(kind, { bg = true } = {}) {
  const draw = (drawings[kind] || drawings.tools)();
  const back = bg
    ? `<rect width="400" height="300" fill="#EEF4FF"/>
       <circle cx="345" cy="50" r="70" fill="${C.sky}"/>
       <circle cx="40" cy="270" r="55" fill="${C.sky}" opacity=".8"/>
       <circle cx="360" cy="255" r="10" fill="${C.sun}"/>
       <rect x="30" y="34" width="26" height="26" rx="7" fill="${C.sun}" opacity=".85" transform="rotate(18 43 47)"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="800" height="600">${back}${draw}</svg>`;
}

// Hero illustration: technician with appliances.
export function heroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 480">
  <circle cx="290" cy="250" r="205" fill="${C.sky}"/>
  <circle cx="290" cy="250" r="160" fill="#C9DAFD"/>
  <circle cx="470" cy="80" r="16" fill="${C.sun}"/>
  <circle cx="80" cy="120" r="9" fill="${C.blue}"/>

  <!-- AC on the wall -->
  <g transform="translate(250 40) scale(.9)">
    <rect x="0" y="0" width="250" height="78" rx="20" fill="${C.white}" ${S}/>
    <path d="M0 50 h250" ${s3}/>
    <rect x="14" y="58" width="222" height="10" rx="5" fill="${C.sky}" ${s3}/>
    <rect x="190" y="18" width="38" height="18" rx="5" fill="${C.navy}"/><rect x="196" y="23" width="12" height="8" rx="2" fill="${C.sun}"/>
    <path d="M50 92 q8 12 0 24 M110 92 q8 12 0 24 M170 92 q8 12 0 24" stroke="${C.blue2}" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>

  <!-- RO purifier -->
  <g transform="translate(60 150) scale(.75)">
    <rect x="0" y="0" width="130" height="200" rx="20" fill="${C.white}" ${S}/>
    <path d="M0 44 V20 a20 20 0 0 1 20 -20 h90 a20 20 0 0 1 20 20 V44Z" fill="${C.blue}" ${S}/>
    <rect x="25" y="62" width="80" height="96" rx="12" fill="${C.sky}" ${s3}/>
    <path d="M25 112 q20 -10 40 0 t40 0 V146 a12 12 0 0 1 -12 12 h-56 a12 12 0 0 1 -12 -12Z" fill="${C.water}"/>
    <rect x="25" y="62" width="80" height="96" rx="12" fill="none" ${s3}/>
    <circle cx="25" cy="22" r="5" fill="${C.sun}"/>
    <path d="M65 200 v16 h22 v10" fill="none" ${S}/>
  </g>

  <!-- Washing machine -->
  <g transform="translate(400 250) scale(.62)">
    <rect x="0" y="0" width="180" height="230" rx="20" fill="${C.white}" ${S}/>
    <path d="M0 50 h180" ${s3}/>
    <circle cx="140" cy="25" r="11" fill="${C.sun}" ${s3}/>
    <circle cx="90" cy="135" r="60" fill="${C.grey}" ${S}/>
    <circle cx="90" cy="135" r="44" fill="${C.sky}" ${s3}/>
    <path d="M46 143 q11 -12 22 0 t22 0 t22 0 t22 0 V147 a44 44 0 0 1 -88 0Z" fill="${C.water}"/>
  </g>

  <!-- Technician -->
  <g transform="translate(205 120)">
    <ellipse cx="85" cy="350" rx="110" ry="14" fill="${C.navy}" opacity=".12"/>
    <!-- legs -->
    <rect x="45" y="230" width="36" height="115" rx="14" fill="${C.navy}"/>
    <rect x="92" y="230" width="36" height="115" rx="14" fill="${C.navy}"/>
    <rect x="38" y="332" width="48" height="18" rx="9" fill="#2B2B2B"/>
    <rect x="88" y="332" width="48" height="18" rx="9" fill="#2B2B2B"/>
    <!-- body -->
    <path d="M30 120 q0 -38 40 -42 h34 q40 4 40 42 v120 h-114Z" fill="${C.blue}" ${S}/>
    <path d="M70 78 l17 30 l17 -30" fill="${C.white}" ${s3}/>
    <rect x="98" y="132" width="30" height="22" rx="5" fill="${C.sun}" ${s3}/>
    <path d="M30 200 h114" stroke="${C.navy}" stroke-width="5"/>
    <!-- arms -->
    <path d="M32 125 q-30 40 -12 92" fill="none" stroke="${C.blue}" stroke-width="28" stroke-linecap="round"/>
    <circle cx="22" cy="222" r="15" fill="${C.skin}" ${s3}/>
    <path d="M142 125 q40 10 52 -30" fill="none" stroke="${C.blue}" stroke-width="28" stroke-linecap="round"/>
    <circle cx="196" cy="88" r="15" fill="${C.skin}" ${s3}/>
    <!-- wrench -->
    <g transform="translate(200 70) rotate(35)">
      <rect x="-6" y="-10" width="12" height="70" rx="5" fill="${C.steel}" ${s3}/>
      <path d="M-16 -18 a16 16 0 1 0 32 0 l-7 0 v9 h-18 v-9Z" fill="${C.steel}" ${s3}/>
    </g>
    <!-- head -->
    <rect x="74" y="62" width="26" height="22" fill="${C.skin}"/>
    <circle cx="87" cy="40" r="32" fill="${C.skin}" ${S}/>
    <path d="M57 32 q30 -40 62 0Z" fill="${C.blue}" ${S}/>
    <path d="M110 30 h26 q4 8 -6 10 h-24Z" fill="${C.sun}" ${s3}/>
    <circle cx="76" cy="44" r="3.5" fill="${C.navy}"/><circle cx="98" cy="44" r="3.5" fill="${C.navy}"/>
    <path d="M78 56 q9 8 18 0" stroke="${C.navy}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- toolbox -->
    <g transform="translate(-60 290)">
      <rect x="0" y="0" width="90" height="56" rx="10" fill="${C.sun}" ${S}/>
      <path d="M28 0 v-14 h34 v14" fill="none" ${S}/>
      <path d="M0 22 h90" ${s3}/>
      <rect x="38" y="16" width="14" height="12" rx="3" fill="${C.navy}"/>
    </g>
  </g>

  <!-- check badge -->
  <g transform="translate(470 190)">
    <circle r="30" fill="${C.white}" ${S}/>
    <path d="M-13 0 l9 10 l18 -20" stroke="#18A957" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

export const svgDataUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
