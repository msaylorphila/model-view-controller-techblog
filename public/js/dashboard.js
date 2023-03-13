const blogSubmit = document.getElementById('submitBlog');
const createNewBlogBtn = document.getElementById('createNewBlog');
const newBlogForm = document.getElementById('newBlogForm');
const blogList = document.querySelector('.blog-list');
const updateBlogBtns = document.querySelectorAll('[id=update-id]');
// const updateBlogForm = document.getElementById('update-blog-form');
const submitUpdatedBlogBtns = document.querySelectorAll('[id=submit-updated-blog]')

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
newBlogForm.classList.remove('d-none');

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

// const handleUpdateBlogBtn = (event) => {
//     updateBlogBtn.classList.add('d-none');
//     // blogList.classList.add('d-none');
//     updateBlogForm.classList.remove('d-none');
    
// }

const getUpdateBlogForm = (id) => {
    return document.getElementById(`update-blog-form-${id}`);
}
const updateFormHandler = async (event) => {
    event.preventDefault()
    const updateId = event.currentTarget.getAttribute("updateId")
    console.log(event.currentTarget.getAttribute("updateId"))

    console.log('form id?')
    const updateForm = getUpdateBlogForm(updateId)

    console.log(event.currentTarget.parentNode)
   if (event.currentTarget.hasAttribute('updateId')){
    event.currentTarget.classList.add('d-none');
    // blogList.classList.add('d-none');
    updateForm.classList.remove('d-none');
   }
    // if (event.target.hasAttribute('update')) {
    //     const id = event.target.getAttribute('update-id-submit');
    //     // console.log(id);
    //     const title = document.getElementById('blogTitleUpdate').value.trim()
    //     const contents = document.getElementById('blogContentUpdate').value.trim()
    //     if (title && contents && id) {
    //     const response = await fetch(`/api/blogpost/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ id, title, contents }),
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    //     console.log(response)
    //     if (response.ok) {
    //         document.location.replace('/dashboard');
    //       } else {
    //         alert('Failed to Update blog');
    //       }
    // }}
}

const submitFormHandler = async (event) => {
    event.preventDefault()
 
    
    const id = event.currentTarget.getAttribute('updateId');
        // console.log(id);
        const title = document.getElementById(`blogTitleUpdate-${id}`).value.trim()
        const contents = document.getElementById(`blogContentUpdate-${id}`).value.trim()
        if (title && contents && id) {
        const response = await fetch(`/api/blogpost/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, contents }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to Update blog');
          }
    }}


  
blogList.addEventListener('click', delButtonHandler);
// blogList.addEventListener('click', updateFormHandler)
createNewBlogBtn.addEventListener('click', handleBlogForm);
// updateBlogBtn.addEventListener('click', handleUpdateBlogBtn);
// submitUpdatedBlogBtn.addEventListener('click', submitFormHandler)
blogSubmit.addEventListener('click', blogPostSubmit);
updateBlogBtns.forEach(el => el.addEventListener('click',
    updateFormHandler //(el.getAttribute("updateId"))
))

submitUpdatedBlogBtns.forEach(el => el.addEventListener('click',
    submitFormHandler
))
