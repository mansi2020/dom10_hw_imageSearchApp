let button = document.querySelector("button");
let inputText = document.querySelector("input");
let form = document.querySelector("form");
let imageWrapper = document.querySelector(".imageWrapper");
let showMore = document.querySelector("#showMore");
let loader = document.querySelector(".loader")
// console.log(button);
// loader.style.display = "block";
// todoad click on search button and we can find image
const accessKey = "z9g1GpUy0Qf6w2sCf4yWGijIhN_-jP3sTQorTz4I3Us";
let page = 1;
async function fetchImage() {
    loader.style.display = "none";
  let searchBarText = inputText.value;
  // console.log(searchBarText);
  let data = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${searchBarText}&client_id=${accessKey}`
  );
  let formatData = await data.json();
  const result = formatData.results;
  console.log(result);
  showMore.style.display = "block";
  if (page === 1) {
    imageWrapper.innerHTML = "";
  }

  page++;
  result.map((item) => {
    //create new div image and anchor tag
      let newDiv = document.createElement("div");
      let image = document.createElement("img");
      image.src = item.urls.small;
      image.alt = item.alt_description;
      newDiv.classList.add("newDivStyle");
      let imageLink = document.createElement("a");
      imageLink.classList.add("imageLink");
      imageLink.href = item.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = item.alt_description;

      // append image and anchor tag into new div and newdiv image wrapper div
      newDiv.appendChild(image);
      newDiv.appendChild(imageLink);
      imageWrapper.appendChild(newDiv); 
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  loader.style.display = "block";
  setTimeout(fetchImage,4000);
  
});

showMore.addEventListener("click", () => {
    loader.style.display = "block";
    setTimeout(fetchImage,4000);
});



  

