const commentSubmitButton = document.getElementById('commentSubmit');

const commentSubmit = async (event) => {
    event.preventDefault();
  
    const contents = document.querySelector('#commentText').value.trim();
    // const user_id = userData.id;
    // console.log()
    if (contents) {
      const response = await fetch(window.location.pathname, {
        method: 'POST',
        body: JSON.stringify({ contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(window.location.pathname);
      } else {
        alert('Please check that you have filled all required fields');
      }
    }
  };

 commentSubmitButton.addEventListener('click', commentSubmit)