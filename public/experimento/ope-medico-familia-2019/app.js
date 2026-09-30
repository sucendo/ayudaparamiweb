(function(){
  var input=document.getElementById('searchInput');
  var table=document.getElementById('resultsTable');
  var count=document.getElementById('visibleCount');
  var empty=document.getElementById('emptyState');
  if(!table||!input)return;
  var rows=Array.prototype.slice.call(table.tBodies[0].rows);

  function update(){
    var q=input.value.trim().toLowerCase();
    var visible=0;
    rows.forEach(function(row){
      var cells=row.cells;
      var reg=cells.length>1?String(cells[1].textContent||'').trim().toLowerCase():'';
      var show=!q||reg.indexOf(q)!==-1;
      row.hidden=!show;
      row.classList.toggle('is-match',Boolean(q&&show));
      if(show)visible+=1;
    });
    count.textContent=String(visible);
    empty.hidden=visible!==0;
  }

  input.addEventListener('input',update);
  update();
})();