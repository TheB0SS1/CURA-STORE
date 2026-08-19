/* ═══════════════════════════════════════════
   CURA STORE — 3D Parallax Particle Field
   Zero dependencies · Canvas 2D with depth
   projection + mouse parallax. Store view only.
   ═══════════════════════════════════════════ */
(function(){
'use strict';
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cv=document.createElement('canvas');cv.id='bgFx';document.body.appendChild(cv);
var ctx=cv.getContext('2d');if(!ctx)return;
var W,H,DPR=Math.min(window.devicePixelRatio||1,2);
function resize(){W=window.innerWidth;H=window.innerHeight;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);}
resize();window.addEventListener('resize',resize);
var COLORS=['rgba(8,145,178,','rgba(217,119,6,','rgba(16,185,129,'];
var P=[];var N=window.innerWidth<640?60:110;
for(var i=0;i<N;i++){P.push({x:Math.random()*2-1,y:Math.random()*2-1,z:Math.random()*0.9+0.1,c:COLORS[i%3],sp:Math.random()*0.0006+0.0002,ph:Math.random()*Math.PI*2});}
var mx=0,my=0,tx=0,ty=0;
window.addEventListener('pointermove',function(e){tx=e.clientX/W-0.5;ty=e.clientY/H-0.5;},{passive:true});
var last=0;
function frame(t){
requestAnimationFrame(frame);
if(document.hidden)return;
if(document.body.classList.contains('invoice-mode')){ctx.clearRect(0,0,W,H);return;}
var dt=Math.min(t-last,50);last=t;
mx+=(tx-mx)*0.04;my+=(ty-my)*0.04;
ctx.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){
var p=P[i];
p.z-=p.sp*dt;if(p.z<=0.05){p.z=1;p.x=Math.random()*2-1;p.y=Math.random()*2-1;}
var f=1/p.z;
var px=W/2+(p.x+mx*0.35*p.z)*W*0.25*f;
var py=H/2+(p.y+my*0.35*p.z)*H*0.25*f;
if(px<-20||px>W+20||py<-20||py>H+20)continue;
var r=Math.min(5,Math.max(0.4,0.8*f));
var a=Math.min(0.5,(1-p.z)*0.55);
var tw=0.7+0.3*Math.sin(t*0.002+p.ph);
ctx.beginPath();ctx.arc(px,py,r,0,6.2832);ctx.fillStyle=p.c+(a*tw).toFixed(3)+')';ctx.fill();
}
}
requestAnimationFrame(frame);
})();
