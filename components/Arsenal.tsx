const gear = [
  { no: '01', name: 'SONY A7V × 2',            desc: 'Primary bodies. Full-frame, low light, uncompromising.' },
  { no: '02', name: 'SONY A7III',               desc: 'Backup and second angle.' },
  { no: '03', name: 'SONY A7C',                 desc: 'Compact. Run and gun.' },
  { no: '04', name: 'CANON 5D MK III',          desc: 'Legacy body. Still delivers.' },
  { no: '05', name: 'SONY 16-35MM GM II F/2.8', desc: 'Wide. Interiors, events, architecture.' },
  { no: '06', name: 'SONY 70-200MM GM II F/2.8',desc: 'Reach. Portraits, compression, events.' },
  { no: '07', name: 'TAMRON 28-75MM F/2.8',     desc: 'Versatile mid-range.' },
  { no: '08', name: 'VILTROX 20MM F/2.8',       desc: 'Ultra wide. Environmental context.' },
  { no: '09', name: 'DJI RS3 PRO',              desc: '3-axis stabilization. Cinema-smooth.' },
  { no: '10', name: 'DJI RS5',                  desc: 'Heavy body support. Events and real estate walkthroughs.' },
]

export default function Arsenal() {
  return (
    <section className="band" id="arsenal">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">III — The Gear</span>
          <h2 className="display">The Arsenal</h2>
          <p className="lede">Professional grade. Every shoot.</p>
        </div>

        <div className="arsenal-grid">
          {gear.map(g => (
            <div key={g.no} className="arsenal-item reveal">
              <span className="no">{g.no}</span>
              <div>
                <h3 className="gear-name">{g.name}</h3>
                <p className="gear-desc">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
