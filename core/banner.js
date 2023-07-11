const inputs = document.querySelectorAll('.banner input');

let count = 0;

setInterval(()=>{
  if(count <= 2){
    inputs[count].checked = true;
    count++;
    if(count > 2) count=0;
  }
}, 5000)

