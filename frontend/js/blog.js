
// initially the edit button will be hidden
const editBtn = document.getElementById("editPage");
editBtn.style.display = "none";


// now here we will get the id of the blog
// that we have attached in the title and readmore button as query
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// we will need this userId for editButton
const user = JSON.parse(sessionStorage.getItem("user"))
const usrId = user?.userId;



async function fetchBlog() {
    const res = await fetch(`https://voiceswithin-node-express.onrender.com/blogs/${id}`);
    const blog = await res.json();
    console.log(blog);

    // if the userId matches then only show the edit button
    if(usrId === blog.userId) {
        editBtn.style.display = "block";
    }

    if(blog.message) {
        const p = document.createElement('p');
        p.textContent = blog.title;
        p.style.fontSize = "3rem";
        p.style.color = "red";
        document.body.appendChild(p);
    } else {
        document.getElementById("title").textContent = blog.title;
        document.getElementById("content").textContent = blog.content;
    }

    // again we have to link this id in the frotned url as query
    // because we need it in the backend
    // to find the blog to update it
    document.getElementById("editPage").href = `edit.html?id=${blog._id}`
}

fetchBlog();
