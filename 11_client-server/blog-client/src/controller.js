window.controllerBlog = {

    view: null,
    model: null,

    CMDS: {
        CMD_INIT: 0,
        CMD_INIT_POST: 1,
    },

    dispatchCmd: function(cmd, data = null, view = null, model = null) {
        switch (cmd) {
            case this.CMDS.CMD_INIT:
                this.initArticles(view, model);
                return;
            case this.CMDS.CMD_INIT_POST:
                this.initPost(data, view, model);
                return;
        }
    },

    initArticles: async function(view, model) {
        this.view = view;
        this.model = model;
        const data = await window.controllerBlog.getArticlesPages(1);
        const articles = data.data;
        const nav = data.meta.pagination;
        view.showListOfArticles(articles, nav);
        view.showNavigator(nav);
        model.articles = data.data;
        model.nav = nav;
    },

    initPost: async function(id, view, model) {
        this.view = view;
        this.model = model;
        const post = await this.getArticleDetailed(id);
        const comments = await this.getArticleComments(id);
        this.view.showPost(post.data, comments.data);
    },

    getArticlesPages: async function(pageN) {
        let url = `https://gorest.co.in/public-api/posts?page=${pageN}`;
        options = {
            method: 'GET',
        };
        return await this.request(url, options);
    },

    getArticleDetailed: async function(id) {
        let url = `https://gorest.co.in/public-api/posts/${id}`;
        options = {
            method: 'GET',
        };
        return await this.request(url, options);
    },

    getArticleComments: async function(id) {
        let url = `https://gorest.co.in/public-api/comments?post_id=${id}`;
        options = {
            method: 'GET',
        };
        return await this.request(url, options);
    },

    request: async function(url, options) {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    },
}