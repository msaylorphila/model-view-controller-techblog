const blogSubmit = document.getElementById('submitBlog');
const createNewBlogBtn = document.getElementById('createNewBlog');
const newBlogForm = document.getElementById('newBlogForm');
const blogList = document.querySelector('.blog-list');

const blogPostSubmit = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitleInput').value.trim();
    const contents = document.querySelector('#blogContentInput').value.trim();
    // const user_id = userData.id;
    // console.log()
    if (title && contents) {
      const response = await fetch('/api/blogpost', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Please check that you have filled all required fields');
      }
    }
  };

const handleBlogForm = (event) => {
createNewBlogBtn.classList.add('d-none');
newBlogForm.classList.remove('d-none')
}

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('delete-id')) {
      const id = event.target.getAttribute('delete-id');
      console.log(id)
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  
blogList.addEventListener('click', delButtonHandler);
createNewBlogBtn.addEventListener('click', handleBlogForm)
blogSubmit.addEventListener('click', blogPostSubmit)
