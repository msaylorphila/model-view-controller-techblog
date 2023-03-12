const blogSubmit = document.getElementById('submitBlog');

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

 blogSubmit.addEventListener('click', blogPostSubmit)
