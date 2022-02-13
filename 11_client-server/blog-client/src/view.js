window.viewBlog = {

    showListOfArticles: function(data, nav) {
        let container = document.querySelector('.container');
        container.innerHTML = this.renderListOfArticles(data, nav);
        this.setHandlersArticleLinks(data);
    },

    setHandlersArticleLinks: function(data) {},

    showNavigator: function(nav) {
        let container = document.querySelector('.container');
        container.innerHTML += this.renderNavigator(nav);
    },

    renderNavigator: function(nav) {
        let navigator = `<nav class="d-flex mb-3 flex-wrap justify-content-center"><a class=" ${nav.page===1?'text-decoration-none text-dark':''}" href="index.html">1</a>  |`;
        for (let i = 1; i < nav.pages; i++) {
            navigator += `<a class=" ${nav.page===i+1?'text-decoration-none text-dark':''}" href="index.html?page=${i + 1}">${i + 1}</a>${i + 1 !== nav.pages?'  |':''}`;
        }
        navigator += '</nav>';
        return navigator;
    },

    showPost: function(data, comments) {
        let container = document.querySelector('.container');
        container.innerHTML = this.renderPost(data, comments);
    },

    renderPost: function(data, comments) {
        let post = `<h1>${data.title}</h1><p>${data.body}</p>`;
        let strComments = this.renderComments(comments);
        return post + strComments;
    },

    renderComments: function(comments) {
        let result = '<ul>';
        for (const comment of comments) {
            result += `<li>${comment.name}(${comment.email}): ${comment.body}</li>`;
        }
        result += `</ul>`;
        return result;
    },

    renderListOfArticles: function(data, nav) {
        let listOfArticles = `<h4 class="mb-3 pt-3">Статьи</h4><ol start="${(nav.page - 1) * nav.limit + 1}" class="mb-5 d-flex flex-column">`;
        for (const article of data) {
            listOfArticles += this.renderArticle(article);
        }
        listOfArticles += `</ol>`;
        return listOfArticles;
    },

    renderArticle: function(article) {
        let result = `<li class="col">`;
        let url = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        console.log(url);
        result += `<a class="text-decoration-none article" id="${article.id}" href="${url}/post.html?id=${article.id}">${article.title}
                   </a>`;
        result += `</li>`;
        return result;
    },
};