(function(){
  'use strict';

  var canvas=document.getElementById('worldCanvas');
  var ctx=canvas.getContext('2d');
  var range=document.getElementById('dateRange');
  var playButton=document.getElementById('playButton');
  var pauseButton=document.getElementById('pauseButton');
  var tooltip=document.getElementById('tooltip');
  var state={data:null,world:null,index:0,metric:'cases',speed:1,timer:null,bubbles:[],dpr:1};

  var labels={cases:'Casos acumulados',deaths:'Fallecidos acumulados',new7:'Nuevos casos · media 7 días'};
  var aliases={'US':'Estados Unidos','United Kingdom':'Reino Unido','Korea, South':'Corea del Sur','Taiwan*':'Taiwán','Czechia':'Chequia','Burma':'Myanmar','West Bank and Gaza':'Palestina','Congo (Brazzaville)':'Congo','Congo (Kinshasa)':'R. D. del Congo'};
  function countryName(name){return aliases[name]||name;}
  function fmt(n){return new Intl.NumberFormat('es-ES').format(Math.round(Number(n)||0));}
  function formatDate(iso){
    var d=new Date(iso+'T00:00:00Z');
    var months=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    return String(d.getUTCDate()).padStart(2,'0')+' '+months[d.getUTCMonth()]+' '+d.getUTCFullYear();
  }
  function new7(country,i){
    var j=Math.max(0,i-7),days=Math.max(1,i-j);
    return Math.max(0,Math.round((country.cases[i]-country.cases[j])/days));
  }
  function globalNew7(i){
    var j=Math.max(0,i-7),days=Math.max(1,i-j);
    return Math.max(0,Math.round((state.data.globalCases[i]-state.data.globalCases[j])/days));
  }
  function metricValue(country,i){
    if(state.metric==='deaths') return country.deaths[i]||0;
    if(state.metric==='new7') return new7(country,i);
    return country.cases[i]||0;
  }
  function project(lon,lat,w,h){
    return {x:(lon+180)/360*w,y:(90-lat)/180*h};
  }
  function resize(){
    var rect=canvas.getBoundingClientRect();
    state.dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.max(1,Math.floor(rect.width*state.dpr));
    canvas.height=Math.max(1,Math.floor(rect.height*state.dpr));
    ctx.setTransform(state.dpr,0,0,state.dpr,0,0);
    draw();
  }
  function pathCoords(coords,w,h){
    if(!coords||!coords.length)return;
    coords.forEach(function(ring){
      ring.forEach(function(point,k){
        var p=project(point[0],point[1],w,h);
        if(k===0)ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
      });
      ctx.closePath();
    });
  }
  function drawWorld(w,h){
    ctx.save();
    ctx.beginPath();
    (state.world.features||[]).forEach(function(feature){
      var g=feature.geometry||{};
      if(g.type==='Polygon') pathCoords(g.coordinates,w,h);
      if(g.type==='MultiPolygon') g.coordinates.forEach(function(poly){pathCoords(poly,w,h);});
    });
    ctx.fillStyle='#132838';
    ctx.strokeStyle='#335065';
    ctx.lineWidth=.55;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  function metricColor(){
    if(state.metric==='deaths')return 'rgba(255,79,109,.72)';
    if(state.metric==='new7')return 'rgba(255,200,87,.72)';
    return 'rgba(47,156,255,.65)';
  }
  function draw(){
    if(!state.data||!state.world)return;
    var rect=canvas.getBoundingClientRect(),w=rect.width,h=rect.height;
    ctx.clearRect(0,0,w,h);
    drawWorld(w,h);

    var values=state.data.countries.map(function(c){return metricValue(c,state.index);});
    var max=Math.max.apply(null,values.concat([1]));
    state.bubbles=[];

    state.data.countries.map(function(c){return {c:c,v:metricValue(c,state.index)};})
      .filter(function(x){return x.v>0 && isFinite(x.c.lat) && isFinite(x.c.lon);})
      .sort(function(a,b){return b.v-a.v;})
      .forEach(function(item){
        var p=project(item.c.lon,item.c.lat,w,h);
        var ratio=Math.log10(item.v+1)/Math.log10(max+1);
        var r=2.2+ratio*25;
        ctx.beginPath();
        ctx.arc(p.x,p.y,r,0,Math.PI*2);
        ctx.fillStyle=metricColor();
        ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,.38)';
        ctx.lineWidth=.7;
        ctx.stroke();
        state.bubbles.push({x:p.x,y:p.y,r:r,c:item.c,v:item.v});
      });
  }
  function updateRanking(){
    var arr=state.data.countries.map(function(c){return {c:c,v:metricValue(c,state.index)};})
      .sort(function(a,b){return b.v-a.v;}).slice(0,8);
    var list=document.getElementById('rankingList');
    list.innerHTML='';
    arr.forEach(function(item,i){
      var li=document.createElement('li');
      li.innerHTML='<span class="rank-no">'+(i+1)+'</span><span class="rank-country"></span><span class="rank-value">'+fmt(item.v)+'</span>';
      li.querySelector('.rank-country').textContent=countryName(item.c.name);
      list.appendChild(li);
    });
  }
  function update(){
    if(!state.data)return;
    var i=state.index;
    range.value=String(i);
    document.getElementById('dateLabel').textContent=formatDate(state.data.dates[i]);
    document.getElementById('dayNumber').textContent=String(i+1);
    document.getElementById('dayTotal').textContent=String(state.data.dates.length);
    document.getElementById('globalCases').textContent=fmt(state.data.globalCases[i]);
    document.getElementById('globalDeaths').textContent=fmt(state.data.globalDeaths[i]);
    document.getElementById('globalNew').textContent=fmt(globalNew7(i));
    document.getElementById('legendMetric').textContent=labels[state.metric];
    document.getElementById('rankingMetric').textContent=labels[state.metric];
    updateRanking();
    draw();
  }
  function stop(){if(state.timer){clearInterval(state.timer);state.timer=null;}}
  function play(){
    stop();
    if(state.index>=state.data.dates.length-1)state.index=0;
    var delay=Math.max(28,120/state.speed);
    state.timer=setInterval(function(){
      if(state.index>=state.data.dates.length-1){stop();return;}
      state.index+=1;update();
    },delay);
  }
  range.addEventListener('input',function(){stop();state.index=Number(range.value)||0;update();});
  playButton.addEventListener('click',play);
  pauseButton.addEventListener('click',stop);
  document.querySelectorAll('[data-speed]').forEach(function(btn){
    btn.addEventListener('click',function(){
      state.speed=Number(btn.getAttribute('data-speed'))||1;
      document.querySelectorAll('[data-speed]').forEach(function(b){b.classList.toggle('is-active',b===btn);});
      if(state.timer)play();
    });
  });
  document.querySelectorAll('[data-metric]').forEach(function(btn){
    btn.addEventListener('click',function(){
      state.metric=btn.getAttribute('data-metric');
      document.querySelectorAll('[data-metric]').forEach(function(b){b.classList.toggle('is-active',b===btn);});
      update();
    });
  });
  canvas.addEventListener('mousemove',function(ev){
    var rect=canvas.getBoundingClientRect();
    var x=ev.clientX-rect.left,y=ev.clientY-rect.top;
    var hit=null,best=Infinity;
    state.bubbles.forEach(function(b){
      var dx=x-b.x,dy=y-b.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<=Math.max(8,b.r) && dist<best){hit=b;best=dist;}
    });
    if(!hit){tooltip.hidden=true;return;}
    tooltip.hidden=false;
    tooltip.style.left=Math.min(rect.width-230,Math.max(8,x+14))+'px';
    tooltip.style.top=Math.max(8,y-26)+'px';
    tooltip.innerHTML='<strong></strong><span>Casos: '+fmt(hit.c.cases[state.index])+'</span><span>Fallecidos: '+fmt(hit.c.deaths[state.index])+'</span><span>Nuevos casos · media 7d: '+fmt(new7(hit.c,state.index))+'</span>';
    tooltip.querySelector('strong').textContent=countryName(hit.c.name);
  });
  canvas.addEventListener('mouseleave',function(){tooltip.hidden=true;});
  window.addEventListener('resize',resize);

  Promise.all([
    fetch('./data/covid-2020.json').then(function(r){return r.json();}),
    fetch('./data/world-110m.json').then(function(r){return r.json();})
  ]).then(function(parts){
    state.data=parts[0];state.world=parts[1];
    range.max=String(state.data.dates.length-1);
    resize();update();
  }).catch(function(){
    document.querySelector('.map-card').innerHTML='<p style="padding:30px;color:#fff">No se pudieron cargar los datos de la visualización.</p>';
  });
})();