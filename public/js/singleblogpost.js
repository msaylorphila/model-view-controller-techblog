const singleBlog = document.getElementById('singleBlogPost');
    
const renderBlogPost = function(event) {
    event.preventDefault();
    console.log('blogpost rendered')
}

singleBlog.addEventListener('click', renderBlogPost())