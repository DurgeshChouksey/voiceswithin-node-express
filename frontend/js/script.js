window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const createBtn = document.getElementById("createBtn");
  const userDisplay = document.getElementById("userinfoBtn");

  if (user) {
    // Hide login/signup
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";

    // Show user name
    userDisplay.textContent = `Welcome, ${user.username}`;
    userDisplay.style.display = "block";
  } else {
    createBtn.style.display = "none";
    userDisplay.style.display = "none";
  }
});

async function fetchBlogs() {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    try {
        const res = await fetch("http://localhost:3000/blogs");
        const blogs = await res.json();

        // blogs -> title, content, _id, user=username


        console.log(blogs);

        // if the response is correct i.e. there is no error
        if(Array.isArray(blogs)) {
            blogs.forEach(blog => {
                const ul = document.getElementById('blogList');
                const li = document.createElement('li');

                // title div
                const titleDiv = document.createElement('div');
                titleDiv.id = "titleDiv";
                titleDiv.style.display = "flex";
                titleDiv.style.justifyContent = "space-between";
                titleDiv.style.alignItems = "center";

                const title = document.createElement('a');
                title.textContent = blog.title;
                title.href = `blog.html?id=${blog._id}`;
                titleDiv.appendChild(title);

                if (currentUser?.username === blog.username) {
                  const deleteIcon = document.createElement("span");
                  deleteIcon.textContent = "🗑️";
                  deleteIcon.style.cursor = "pointer";
                  deleteIcon.style.marginLeft = "10px";
                  deleteIcon.style.fontSize = "3rem";
                  deleteIcon.style.color = "red"
                  deleteIcon.addEventListener("click", async () => {
                    try {
                      const res = await fetch(`http://localhost:3000/delete/${blog._id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${currentUser?.token}`
                        }
                      });
                      const result = await res.json();
                      alert(result.message || "Deleted!");
                      window.location.reload();
                    } catch (err) {
                      console.error("Delete failed", err);
                    }
                  });
                  titleDiv.appendChild(deleteIcon);
                }

                // content div
                const contentDiv = document.createElement('div');
                contentDiv.id = "contentDiv";
                const content = document.createElement('div');
                content.textContent = blog.content;

                // we need to reaet one readMoreWrapper for author and readmore combining
                const readMoreWrapper = document.createElement("div");
                readMoreWrapper.id = "readMoreWrapper"

                // readmore button
                const readMore = document.createElement('a')
                readMore.id = "readMore";
                //attaching the id here, because when we move to blog.html
                // we will make a fetch req for the particular blog
                // where we need id
                readMore.href = `blog.html?id=${blog._id}`
                readMore.textContent = "Read more...."

                // creating author span
                const authorSpan = document.createElement('span');
                authorSpan.id = "authorSpan";
                authorSpan.textContent = `- ${blog.username || "- Unknown"}`;


                contentDiv.appendChild(content);
                li.appendChild(titleDiv);
                li.appendChild(contentDiv);
                readMoreWrapper.appendChild(readMore);
                readMoreWrapper.appendChild(authorSpan);
                li.appendChild(readMoreWrapper);
                ul.appendChild(li);
            });
        } else {
            const ul = document.getElementById('blogList');
            ul.textContent = blogs.title;
            ul.style.fontSize = "3rem"
            ul.style.color = "red"
        }

    } catch (err) {
        console.log(err);
    }
}

fetchBlogs();
