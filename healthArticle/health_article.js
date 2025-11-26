var xhr = new XMLHttpRequest();
xhr.open("GET", "health_article.json", true);
xhr.responseType = "json";

xhr.onload = function () {
    console.log("STATUS =", xhr.status);

    if (xhr.status === 200) {
        var articles = xhr.response.articles;
        console.log("Loaded articles:", articles);

        var articlesDiv = document.getElementById("articles");

        articles.forEach(function (article) {
            var articleDiv = document.createElement("div");
            articleDiv.classList.add("article");

            var title = document.createElement("h2");
            title.textContent = article.title;

            var description = document.createElement("p");
            description.textContent = article.description;

            articleDiv.appendChild(title);
            articleDiv.appendChild(description);

            articlesDiv.appendChild(articleDiv);
        });
    }
};

xhr.onerror = function () {
    console.error("XHR ERROR (network or blocked request)");
};

xhr.send();
