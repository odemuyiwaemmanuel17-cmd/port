import test from 'node:test';
import assert from 'node:assert/strict';
import { eyePose } from '../lib/eye-timeline.ts';
test('chapter endpoints clamp and scene remains finite through the full journey',()=>{
 assert.equal(eyePose(-10).chapter,0);assert.equal(eyePose(100).chapter,7);
 for(let q=0;q<=8;q+=.01){const p=eyePose(q);assert.ok(Object.values(p).every(Number.isFinite));assert.ok(p.zoom>=1&&p.zoom<=1.71);assert.ok(p.chapter>=0&&p.chapter<=7);}
});
test('ring rotation and depth remain continuous at chapter boundaries',()=>{
 for(let q=1;q<7;q++){const before=eyePose(q-0.00001),after=eyePose(q+0.00001);for(const key of ['rotation','spread','zoom','tilt'])assert.ok(Math.abs(before[key]-after[key])<.001,key);}
});
test('reduced motion disables camera travel and rotation across every chapter',()=>{
 for(let q=0;q<8;q+=.1){const p=eyePose(q,true);assert.equal(p.zoom,1);assert.equal(p.rotation,0);assert.equal(p.tilt,0);assert.equal(p.spread,.15);}
});
