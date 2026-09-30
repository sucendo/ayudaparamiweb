(function(){
  var block=document.querySelector('.dates');
  var target=document.getElementById('daysBetween');
  if(!block||!target)return;
  var start=new Date(block.dataset.published+'T00:00:00Z');
  var end=new Date(block.dataset.updated+'T00:00:00Z');
  var days=Math.round((end-start)/86400000);
  target.textContent='· '+days+' días después';
})();