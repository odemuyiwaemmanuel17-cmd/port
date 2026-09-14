"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { eyePose } from "../lib/eye-timeline";

/** A single persistent lens; scroll changes the depth and rotation of its layers. */
export default function EyeScene({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const pause = useRef(paused);
  useEffect(() => { pause.current = paused; }, [paused]);
  useEffect(() => {
    const el = host.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: THREE.WebGLRenderer | undefined;
    let raf = 0;
    let observer: ResizeObserver | undefined;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.z = 10;
    const eye = new THREE.Group(); scene.add(eye);
    const rings: THREE.Group[] = [];
    const resources: (THREE.BufferGeometry | THREE.Material)[] = [];
    const cyan = new THREE.MeshBasicMaterial({color: 0x60ddff, transparent:true, opacity:0.78});
    const blue = new THREE.MeshBasicMaterial({color: 0x0779bd, transparent:true, opacity:0.65});
    const dark = new THREE.MeshStandardMaterial({color:0x071925, metalness:0.86, roughness:0.28});
    resources.push(cyan, blue, dark);
    function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D) {
      resources.push(geometry); const m = new THREE.Mesh(geometry,material); parent.add(m); return m;
    }
    for(let j=0;j<8;j++) {
      const group = new THREE.Group(); rings.push(group); eye.add(group);
      const r = 1.03+j*0.205;
      mesh(new THREE.TorusGeometry(r, j%3===0?0.035:0.012, 6, 128), j%2?blue:cyan,group);
      const arc = mesh(new THREE.TorusGeometry(r+0.065,0.045,4,80,Math.PI*(0.55+j%3*0.19)), j%2?dark:blue,group);
      arc.rotation.z=j*0.86;
      const geometry = new THREE.BoxGeometry(j%2?0.012:0.02, j%2?0.065:0.13,0.03); resources.push(geometry);
      const ticks = new THREE.InstancedMesh(geometry,j%3?blue:cyan,120);group.add(ticks);
      const dummy = new THREE.Object3D();
      for(let k=0;k<120;k++) { const a=k/120*Math.PI*2; dummy.position.set(Math.sin(a)*r,Math.cos(a)*r,0.012);dummy.rotation.z=-a;dummy.updateMatrix();ticks.setMatrixAt(k,dummy.matrix); }
    }
    const iris = new THREE.Group();eye.add(iris);
    const irisGeo = new THREE.BufferGeometry();const irisLines:number[]=[];
    for(let k=0;k<320;k++) {const a=k/320*Math.PI*2;const r=0.46+(Math.sin(k*17.3)+1)*0.055;const end=0.86+(Math.sin(k*6.7)+1)*0.09;irisLines.push(Math.cos(a)*r,Math.sin(a)*r,0.28,Math.cos(a+.09)*end,Math.sin(a+.09)*end,0.04);}
    irisGeo.setAttribute("position",new THREE.Float32BufferAttribute(irisLines,3));resources.push(irisGeo);
    const lineMat = new THREE.LineBasicMaterial({color:0x299dcd,transparent:true,opacity:0.8});resources.push(lineMat);iris.add(new THREE.LineSegments(irisGeo,lineMat));
    const pupil=mesh(new THREE.SphereGeometry(0.49,40,24),new THREE.MeshPhysicalMaterial({color:0x01060c,metalness:0.9,roughness:0.15,clearcoat:1}),eye);resources.push(pupil.material as THREE.Material);pupil.scale.z=0.35;pupil.position.z=0.16;
    mesh(new THREE.TorusGeometry(0.52,0.012,8,120),cyan,eye).position.z=0.22;
    const circuitry=new THREE.Group();eye.add(circuitry);
    const traces:number[]=[];
    for(let side=-1;side<=1;side+=2)for(let k=0;k<28;k++){const y=(k-13.5)*0.19;const x=2.05+Math.sin(k)*0.2; const out=3+(k%5)*0.43; traces.push(side*x,y,0,side*(x+.4),y,0,side*(x+.4),y,0,side*(x+.7),y+.22,0,side*(x+.7),y+.22,0,side*out,y+.22,0); const node=mesh(new THREE.RingGeometry(.035,.048,12),k%4?blue:cyan,circuitry);node.position.set(side*out,y+.22,0);}
    const traceGeo=new THREE.BufferGeometry();traceGeo.setAttribute("position",new THREE.Float32BufferAttribute(traces,3));resources.push(traceGeo);circuitry.add(new THREE.LineSegments(traceGeo,lineMat));
    const dustGeo=new THREE.BufferGeometry(); const dust:number[]=[];
    for(let k=0;k<300;k++){dust.push(Math.sin(k*12.98)*8,Math.cos(k*3.7)*5,-(k%20)*.3);}
    dustGeo.setAttribute("position",new THREE.Float32BufferAttribute(dust,3));const dustMat=new THREE.PointsMaterial({color:0x429dc2,size:0.013,transparent:true,opacity:.6});resources.push(dustGeo,dustMat);scene.add(new THREE.Points(dustGeo,dustMat));
    scene.add(new THREE.AmbientLight(0x4ea5dc,2)); const light = new THREE.PointLight(0xc2f5ff,40);light.position.set(2,3,4);scene.add(light);
    let targetX=0,targetY=0,visible=true,time=0,last=0;
    const pointer=(e:PointerEvent)=>{targetX=(e.clientX/innerWidth-.5)*.14;targetY=(e.clientY/innerHeight-.5)*.1;};
    const visibility=()=>{visible=!document.hidden;};
    const contextLost=(e:Event)=>{e.preventDefault();el.dataset.ready="false";cancelAnimationFrame(raf);};
    try {
      renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});
      renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.3:1.75));el.appendChild(renderer.domElement);
      renderer.domElement.addEventListener("webglcontextlost",contextLost);
      const resize=()=>{const w=el.clientWidth,h=el.clientHeight;renderer!.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
      observer=new ResizeObserver(resize);observer.observe(el);resize();
      window.addEventListener("pointermove",pointer,{passive:true});document.addEventListener("visibilitychange",visibility);
      const draw=(now:number)=>{
        raf=requestAnimationFrame(draw);
        const dt=Math.min((now-last)/1000,.05);last=now;
        if(!visible)return;
        if(!pause.current&&!motion.matches)time+=dt;
        const story=document.querySelector<HTMLElement>(".eye-experience");
        const q=Number(story?.dataset.chapterProgress||0);
        const p=eyePose(q,motion.matches||pause.current);
        rings.forEach((r,i)=>{r.rotation.z=p.rotation*(i%2?1:-1)+time*.025*(i%2?1:-1);r.position.z=(i-4)*p.spread;});
        iris.rotation.z=-p.rotation*.4+time*.025;
        iris.scale.setScalar(0.92+p.aperture*.12); pupil.scale.x=pupil.scale.y=0.8+p.aperture*.3;
        eye.rotation.y=p.tilt+(motion.matches||pause.current?0:targetX);eye.rotation.x=motion.matches||pause.current?0:targetY;
        eye.scale.setScalar(p.zoom);camera.position.z=innerWidth<700?11.7:10;
        renderer!.render(scene,camera);el.dataset.ready="true";
      };raf=requestAnimationFrame(draw);
    } catch {el.dataset.ready="false";}
    return()=>{cancelAnimationFrame(raf);observer?.disconnect();window.removeEventListener("pointermove",pointer);document.removeEventListener("visibilitychange",visibility);renderer?.domElement.removeEventListener("webglcontextlost",contextLost);resources.forEach(r=>r.dispose());renderer?.dispose();renderer?.domElement.remove();};
  },[]);
  return <div ref={host} className="eye-render" aria-hidden="true"><EyeFallback /></div>;
}
function EyeFallback(){
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
