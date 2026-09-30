(function(){
  var body=document.getElementById('guideBody');
  var target=document.getElementById('readingTime');
  if(!body||!target)return;
  var words=String(body.textContent||'').trim().split(/\s+/).filter(Boolean).length;
  target.textContent=Math.max(1,Math.round(words/220))+' min de lectura';
})();