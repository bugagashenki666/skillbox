(async function() {
    if (window.location.href.includes('index.html')) {
        const pageN = new URLSearchParams(window.location.search).get('page');
        window.controllerBlog.dispatchCmd(window.controllerBlog.CMDS.CMD_INIT, pageN, window.viewBlog, window.modelBlog);
    } else if (window.location.href.includes('post.html')) {
        const postId = new URLSearchParams(window.location.search).get('id');
        const pageBack = new URLSearchParams(window.location.search).get('page');
        window.controllerBlog.dispatchCmd(window.controllerBlog.CMDS.CMD_INIT_POST, { postId, pageBack }, window.viewBlog, window.modelBlog);
    }


    console.log(window.controllerBlog.getArticlesPages(1));
    console.log(window.controllerBlog.getArticleDetailed(858));
    console.log(window.controllerBlog.getArticleComments(858));
    console.log(window.location);
})();