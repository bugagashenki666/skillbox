window.viewBlog = {

    showListOfArticles: function(data, nav) {
        let container = document.querySelector('.container');
        container.innerHTML = this.renderListOfArticles(data, nav);

    },

    showNavigator: function(nav) {
        let container = document.querySelector('.container');
        container.innerHTML += this.renderNavigatorOptimized(nav) + this.renderNavigator(nav);
    },

    renderNavigatorOptimized: function(nav, n = 5) {
        let navigator = `<nav class="d-flex mb-3 flex-wrap justify-content-center">`;
        let lLimit = nav.page - n;
        let hLimit = nav.page + n;
        if (lLimit < 0) lLimit = 0;
        if (hLimit > nav.pages) hLimit = nav.pages;
        let linkMinus10 = (nav.page - n * 2) <= 0 ? '' : `?page=${(nav.page - n * 2)}`;
        let classLink = ` class="${nav.page === 1?'btn btn-info disabled':''}"`;
        navigator += `<a href="index.html" ${classLink}><<</a>|
				<a href="index.html${linkMinus10}"  ${classLink}><</a>|`;
        for (let i = lLimit; i < hLimit; i++) {
            let link = (i === 0) ? `">1` : `?page=${i + 1}">${i + 1}`;
            navigator += `<a class="${nav.page===i+1?'btn btn-info disabled':''}"
						 href="index.html${link}</a>  |`;
        }
        classLink = ` class="${nav.page === nav.pages?'btn btn-info disabled':''}"`;
        navigator += `<a href="index.html?page=${(nav.page + n * 2) >= nav.pages?nav.pages:(nav.page + n * 2)}" ${classLink}>>
				</a>|<a href="index.html?page=${nav.pages}"  ${classLink}>>></a>|`;
        navigator += `</nav>`;
        return navigator;
    },

    renderNavigator: function(nav) {
        let navigator = `<nav class="d-flex mb-3 flex-wrap justify-content-center"><a class=" ${nav.page===1?'text-decoration-none text-dark':''}" href="index.html">1</a>  |`;
        for (let i = 1; i < nav.pages; i++) {
            navigator += `<a class=" ${nav.page===i+1?'text-decoration-none text-dark':''}" href="index.html?page=${i + 1}">${i + 1}</a>${i + 1 !== nav.pages?'  |':''}`;
        }
        navigator += '</nav>';
        return navigator;
    },

    showPost: function(data, comments, pageBack) {
        let container = document.querySelector('.container');
        container.innerHTML = this.renderPost(data, comments, pageBack);
    },

    renderPost: function(data, comments, pageBack) {
        let post = `<h1>${data.title}</h1><p class="border border-light">${data.body}</p>`;
        let strComments = this.renderComments(comments);
        return post + strComments + this.renderBack(pageBack);
    },

    renderComments: function(comments) {
        let result = '<ul class="p-5 list-group">';
        for (const comment of comments) {
            result += `<li class="list-group-item"><h3 class="h3">${comment.name}(${comment.email}):</h3> 
            <div>${comment.body}</div></li>`;
        }
        result += `</ul>`;
        return result;
    },

    renderBack: function(pageBack) {
        return `<a class="h2 d-inline-block mb-10" href="${window.location.href.substring(0, window.location.href.lastIndexOf('/'))}/index.html?page=${pageBack}">Back</a>`;
    },

    renderListOfArticles: function(data, nav) {
        let listOfArticles = `<h2 class="mb-3 pt-3 h2">Articles</h2><ol start="${(nav.page - 1) * nav.limit + 1}" class="mb-5 d-flex flex-column">`;
        for (const article of data) {
            listOfArticles += this.renderArticle(article, nav.page);
        }
        listOfArticles += `</ol>`;
        return listOfArticles;
    },

    renderArticle: function(article, pageN) {
        let result = `<li class="col">`;
        let url = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        console.log(url);
        result += `<a class="text-decoration-none article" id="${article.id}" href="${url}/post.html?id=${article.id}&page=${pageN}">${article.title}
                   </a><div class="text-truncate">${article.body}</div>`;
        result += `</li>`;
        return result;
    },
};