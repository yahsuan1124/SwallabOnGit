let getAllBlog = async () => {
    const url = 'http://localhost/MySwallab/public/api/getallnotes'
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let {id, title, main_photo, created_at} = data;
    
    created_at = new Date(created_at);
    let year = created_at.getFullYear();
    let month = created_at.getMonth() + 1;
    let day = created_at.getDate();
    created_at = `${year}/${month}/${day}`;
    console.log(created_at);
    
    $('#jump').attr('href', `http://localhost/swallab/Swallab/foodNotes/NewDemoHotpot.html?id=${id}`)
    
    $('#mainPhoto').attr('src', main_photo);
    $('#title').text(title);
    $('#createdAt').text(created_at)
}

getAllBlog()