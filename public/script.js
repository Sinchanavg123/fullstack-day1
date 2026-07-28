const form = document.getElementById("blogForm");

const title = document.getElementById("title");

const author = document.getElementById("author");

const content = document.getElementById("content");

const titleError = document.getElementById("titleError");

const authorError = document.getElementById("authorError");

const contentError = document.getElementById("contentError");

const blogContainer = document.getElementById("blogContainer");

form.addEventListener("submit", function(e){

e.preventDefault();

let valid = true;

titleError.textContent="";
authorError.textContent="";
contentError.textContent="";

title.classList.remove("error");
author.classList.remove("error");
content.classList.remove("error");

if(title.value.trim()==""){

titleError.textContent="Title is required";

title.classList.add("error");

valid=false;

}

if(author.value.trim()==""){

authorError.textContent="Author name is required";

author.classList.add("error");

valid=false;

}

if(content.value.trim().length<20){

contentError.textContent="Content should be at least 20 characters";

content.classList.add("error");

valid=false;

}

if(valid){

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${title.value}</h3>

<p><b>Author:</b> ${author.value}</p>

<p>${content.value}</p>

`;

blogContainer.prepend(card);

form.reset();

alert("Blog Published Successfully!");

}

});