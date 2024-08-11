// Variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Advanced Search Inputs
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const language = document.getElementById("language");
const sortBy = document.getElementById("sortBy");
const sources = document.getElementById("sources");
const domains = document.getElementById("domains");

// Array to store news data
let newsDataArr = [];

// API Information
const API_KEY = "8dd0c6ef7e7d497c90158dae8e6df7f0"; // Add your API key here
const COUNTRY = "ng";
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=technology&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

// On window load, fetch headlines
window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchNews(HEADLINES_NEWS);
};

// Event listeners for category buttons
generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General News</h4>";
    fetchNews(GENERAL_NEWS);
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchNews(BUSINESS_NEWS);
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchNews(SPORTS_NEWS);
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchNews(ENTERTAINMENT_NEWS);
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchNews(TECHNOLOGY_NEWS);
});

// Event listener for search button
searchBtn.addEventListener("click", function() {
    newsType.innerHTML = `<h4>Search: ${newsQuery.value}</h4>`;

    // Construct the query URL with only the non-empty parameters
    let queryUrl = `${SEARCH_NEWS}${encodeURIComponent(newsQuery.value)}&apiKey=${API_KEY}`;

    if (fromDate.value) {
        queryUrl += `&from=${fromDate.value}`;
    }
    if (toDate.value) {
        queryUrl += `&to=${toDate.value}`;
    }
    if (language.value) {
        queryUrl += `&language=${language.value}`;
    }
    if (sortBy.value) {
        queryUrl += `&sortBy=${sortBy.value}`;
    }
    if (sources.value) {
        queryUrl += `&sources=${sources.value}`;
    }
    if (domains.value) {
        queryUrl += `&domains=${domains.value}`;
    }

    fetchNews(queryUrl);
});

// Function to fetch and display news data
async function fetchNews(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "ok") {
            newsDataArr = data.articles;
            displayNews();
        } else {
            console.error("Error fetching news:", data.message);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Function to display news on the page
function displayNews() {
    newsdetails.innerHTML = "";
    newsDataArr.forEach(news => {
        const col = document.createElement('div');
        col.className = "col-sm-6 col-md-4 col-lg-3 mt-3";
        const card = document.createElement('div');
        card.className = "card";

        const image = document.createElement('img');
        image.className = "card-img-top";
        image.src = news.urlToImage || 'default-image.jpg'; // Use a default image if none is available
        image.alt = "News Image";

        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        
        const newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const sourceName = document.createElement('p');
        sourceName.className = "text-primary";
        sourceName.innerHTML = news.source.name;

        const dateHeading = document.createElement('p');
        dateHeading.className = "text-muted";
        dateHeading.innerHTML = new Date(news.publishedAt).toLocaleString();

        const description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        const link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(sourceName);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}
