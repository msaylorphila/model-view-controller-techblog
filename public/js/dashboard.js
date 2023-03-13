const blogSubmit = document.getElementById('submitBlog');
const createNewBlogBtn = document.getElementById('createNewBlog');
const newBlogForm = document.getElementById('newBlogForm');

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

createNewBlogBtn.addEventListener('click', handleBlogForm)
blogSubmit.addEventListener('click', blogPostSubmit)
