export default function EyeFallback(){
  return <svg className="eye-fallback" viewBox="0 0 1000 800" aria-hidden="true">
    <defs><radialGradient id="eye-halo"><stop stopColor="#058bd0" stopOpacity=".23"/><stop offset=".6" stopColor="#0a78a8" stopOpacity=".09"/><stop offset="1" stopColor="#00121b" stopOpacity="0"/></radialGradient><radialGradient id="eye-glass"><stop stopColor="#00040a"/><stop offset=".65" stopColor="#010811"/><stop offset=".88" stopColor="#082536"/><stop offset="1" stopColor="#25b8dd"/></radialGradient><filter id="eye-glow"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <circle cx="500" cy="400" r="370" fill="url(#eye-halo)"/>
    <g className="eye-circuit" fill="none" stroke="#3288a6" strokeWidth=".8" opacity=".55">{Array.from({length:50},(_,i)=>{const s=i%2?1:-1,y=180+Math.floor(i/2)*18;return <g key={i}><path d={`M ${500+s*218} ${y} h ${s*(35+i%4*9)} l ${s*23} ${i%2?23:-23} H ${500+s*(350+i%5*23)}`}/><circle cx={500+s*(350+i%5*23)} cy={y+(i%2?23:-23)} r="3"/></g>;})}</g>
    <g className="eye-assembly" style={{transformOrigin:"500px 400px"}}>
    <circle cx="500" cy="400" r="234" fill="none" stroke="#089bd2" strokeWidth="6" opacity=".4" filter="url(#eye-glow)"/>
    {Array.from({length:9},(_,i)=><g key={i} className={i%2?"eye-ring-odd":"eye-ring-even"} style={{transformOrigin:"500px 400px"}}><circle cx="500" cy="400" r={112+i*17} fill="none" stroke={i%3?"#16799b":"#82dff5"} strokeWidth={i%3?1:1.5} opacity={.4+i*.045}/><circle cx="500" cy="400" r={117+i*17} fill="none" stroke={i%2?"#12506b":"#5db3d0"} strokeWidth={i%2?5:2} strokeDasharray={`${65+i*14} ${94+i*8}`} transform={`rotate(${i*29} 500 400)`}/>{Array.from({length:90},(_,k)=><path key={k} d={`M 500 ${400-(112+i*17)} v ${k%5?4:9}`} transform={`rotate(${k*4} 500 400)`} stroke={i%3?"#177997":"#63d7f3"} strokeWidth="1"/>)}</g>)}
    <g className="eye-iris">{Array.from({length:240},(_,k)=><path key={k} d={`M 500 ${400-53-(k%3)*3} Q ${507+k%4} 327 ${500+k%5} ${302-k%7}`} transform={`rotate(${k*1.5} 500 400)`} fill="none" stroke={k%3?"#196c96":"#58bfec"} strokeWidth=".7" opacity=".8"/>)}</g>
    <circle cx="500" cy="400" r="51" fill="url(#eye-glass)" stroke="#62d5fc" strokeWidth=".8"/><ellipse cx="486" cy="378" rx="20" ry="6" fill="#65ccef" opacity=".1" transform="rotate(-30 486 378)"/>
    <path d="M 500 124 v-12 M 500 676 v12 M 224 400 h-12 M 776 400 h12" stroke="#a3ecff"/>
    </g>
    <g fill="#40839d" fontSize="8" fontFamily="monospace" letterSpacing="2"><text x="80" y="193">OPTICAL SYSTEM / EO</text><text x="768" y="628">SIGNAL ACQUIRED</text><text x="270" y="670">FULL STACK</text><text x="660" y="160">AEROSPACE</text></g>
  </svg>;
}
