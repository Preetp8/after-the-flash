/* After the Flash — Tweaks */
const { useEffect } = React;

// load the alternate display serif so the font tweak can swap instantly
(function ensureCaslon() {
  if (document.getElementById("caslon-font")) return;
  const l = document.createElement("link");
  l.id = "caslon-font";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap";
  document.head.appendChild(l);
})();

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#B26450",
  "wall": ["#F4EFE6", "#ECE4D6"],
  "headline": "Bodoni"
}/*EDITMODE-END*/;

const FONTS = {
  Bodoni: '"Bodoni Moda", "Times New Roman", serif',
  Caslon: '"Libre Caslon Display", "Times New Roman", serif',
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--terra", t.accent);
    const wall = Array.isArray(t.wall) ? t.wall : [t.wall, t.wall];
    r.setProperty("--cream", wall[0]);
    r.setProperty("--cream-2", wall[1] || wall[0]);
    r.setProperty("--serif", FONTS[t.headline] || FONTS.Bodoni);
  }, [t.accent, t.wall, t.headline]);

  return (
    <TweaksPanel>
      <TweakSection label="Accent" />
      <TweakColor
        label="Terracotta"
        value={t.accent}
        options={["#B26450", "#A8553C", "#C07E68", "#9C5E55"]}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakSection label="Gallery wall" />
      <TweakColor
        label="Warmth"
        value={t.wall}
        options={[
          ["#F4EFE6", "#ECE4D6"],
          ["#F7F4EC", "#EEE9DC"],
          ["#F1EFE9", "#E7E4DB"],
          ["#EFE8DA", "#E5DCC9"],
        ]}
        onChange={(v) => setTweak("wall", v)}
      />
      <TweakSection label="Headline serif" />
      <TweakRadio
        label="Typeface"
        value={t.headline}
        options={["Bodoni", "Caslon"]}
        onChange={(v) => setTweak("headline", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
