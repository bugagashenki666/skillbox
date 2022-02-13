(async function() {
    if (window.location.href.includes('index.html')) {
        window.controllerBlog.dispatchCmd(window.controllerBlog.CMDS.CMD_INIT, null, window.viewBlog, window.modelBlog);
    } else if (window.location.href.includes('post.html')) {
        const postId = new URLSearchParams(window.location.search).get('id');
        window.controllerBlog.dispatchCmd(window.controllerBlog.CMDS.CMD_INIT_POST, postId, window.viewBlog, window.modelBlog);
    }


    console.log(window.controllerBlog.getArticlesPages(1));
    console.log(window.controllerBlog.getArticleDetailed(858));
    console.log(window.controllerBlog.getArticleComments(858));
    console.log(window.location);
})();