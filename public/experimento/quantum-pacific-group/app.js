(function(){
  var article=document.getElementById('articleBody');
  var target=document.getElementById('readingTime');
  if(!article||!target)return;
  var words=String(article.textContent||'').trim().split(/\s+/).filter(Boolean).length;
  var minutes=Math.max(1,Math.round(words/220));
  target.textContent='Lectura: '+minutes+' min';
})();