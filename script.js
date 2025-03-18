

let input = document.getElementById('input');
let butn = document.getElementById('button');
let load = document.getElementById('load');
let container = document.getElementById('container');

let api = "-0FLuKTyN8aH4Tgirm3fTlGwglWbC_dB-HOXuByR3Js";
let page = 1;
let currentQuery = "";  // ✅ Stores the current search term

butn.addEventListener('click', () => {
    if (input.value.trim() === "") {  // ✅ Prevent empty search
        alert("Please enter a search term");
        return;
    }

    page = 1;  
    currentQuery = input.value.trim();  // ✅ Store search term for later use
    container.innerHTML = "";  // ✅ Clear previous results
    ImageGenerator();
});

load.addEventListener('click', () => {
    if (currentQuery === "") {  // ✅ Prevent "Show More" before searching
        alert("Please perform a search first!");
        return;
    }

    page++;  // ✅ Increase page number to fetch new results
    ImageGenerator();
});

async function ImageGenerator() {
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${currentQuery}&per_page=12&client_id=${api}`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);

        if (data.results.length === 0 && page > 1) {  // ✅ Prevents unnecessary API calls
            alert("No more images found!");
            return;
        }

        data.results.forEach(element => {
            let photo = document.createElement("div");
            let image = document.createElement("img");
            image.classList.add("photo");
            image.src = element.urls.small;
            let des = document.createElement("p");
            des.innerText = element.alt_description || "No description available.";
            photo.appendChild(image);
            photo.appendChild(des);
            container.appendChild(photo);
        });

        load.style.display ="block";

    } catch (error) {
        console.error("Error fetching images:", error);
        alert("Failed to load images. Please try again later.");
    }
}


// let input = document.getElementById('input');
// let butn = document.getElementById('button');
// let load = document.getElementById('load');
// let container = document.getElementById('container');

// let api = "-0FLuKTyN8aH4Tgirm3fTlGwglWbC_dB-HOXuByR3Js";
// let page = 1; 

// butn.addEventListener('click', () => {
//     page = 1; 
//     container.innerHTML = ""; 
//     ImageGenerator();
// });

// load.addEventListener('click', () => {
//     page++; // Increment pages
//     ImageGenerator();
// });

// async function ImageGenerator() {
//     let url = `https://api.unsplash.com/search/photos?page=${page}&query=${input.value}&per_page=12&client_id=${api}`;
    
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);

//     data.results.forEach(element => {
//         let photo = document.createElement("div");
//         let image = document.createElement("img");
//         image.classList.add("photo");
//         image.src = element.urls.small;
//         let des = document.createElement("p");
//         des.innerText = element.alt_description || "No description available.";
//         photo.appendChild(image);
//         photo.appendChild(des);
//         container.appendChild(photo);
//     });
// }


