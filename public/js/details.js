async function details() {
    var row = event.target.parentNode.parentNode;
    var rowId = row.id;
    var meme = document.getElementById(rowId).querySelectorAll(".data");
  
    var id = meme[0].innerHTML.trim();
    var name = meme[1].innerHTML.trim();
    var url = meme[2].innerHTML.trim();
    var width = meme[3].innerHTML.trim();
    var height = meme[4].innerHTML.trim();
  
    data = JSON.stringify({
      id: id,
      name: name,
      url: url,
      width: width,
      height: height,
    });
  
    try {
      const resp = await fetch("/meme", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  

row.style.backgroundColor = "#d3d3d3"; 
var viewedMemes = JSON.parse(localStorage.getItem("viewedMemes")) || [];
viewedMemes.push(id);
localStorage.setItem("viewedMemes", JSON.stringify(viewedMemes));


    open_new_window("/meme/" + id);
  }
  