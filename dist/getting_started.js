const bgBtn=document.getElementById("background"),borderBtn=document.getElementById("border"),textBtn=document.getElementById("text");let bg=new ColorPicker(bgBtn,"#2e5776"),border=new ColorPicker(borderBtn,"#4e4376"),text=new ColorPicker(textBtn,"#fff");bgBtn.addEventListener("colorChange",(function(e){document.getElementById("listener").style.background=e.detail.color})),borderBtn.addEventListener("colorChange",(function(e){document.getElementById("listener").style["border-color"]=e.detail.color})),textBtn.addEventListener("colorChange",(function(e){document.getElementById("listener").style.color=e.detail.color}));