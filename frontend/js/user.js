// LOGOUT BUTTON LOGIC

const logoutBtn = document.getElementById("logoutBtn");
const user = JSON.parse(sessionStorage.getItem("user")) || undefined;

if (user) {
  logoutBtn.style.display = "inline";
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("user");
    window.location.href = "index.html";
  });
}


// fetching all the blogs of the current user
// for that we have to veiry user on the route and we need token

const token = user?.token;

// id was stored in the session storage
const id = user?.userId;


async function fetchBlogs() {
    try {
        const res = await fetch(`https://voiceswithin-node-express.onrender.com/user/blogs/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const blogs = await res.json();

        // if the response is correct i.e. there is no error
        // then we will recieve an array
        if(Array.isArray(blogs)) {
            blogs.forEach(blog => {
                const ul = document.getElementById('blogList');

                // we will add each blog into a li element
                const li = document.createElement('li');

               // title div
                const titleDiv = document.createElement('div');
                titleDiv.id = "titleDiv";
                titleDiv.style.display = "flex";
                titleDiv.style.justifyContent = "space-between";
                titleDiv.style.alignItems = "center";
                titleDiv.style.width = "100%";

                const title = document.createElement('a');
                title.textContent = blog.title;
                title.href = `blog.html?id=${blog._id}`;

                // append title first
                titleDiv.appendChild(title);

                if (user?.username === blog.username) {
                  const deleteIcon = document.createElement("span");
                  deleteIcon.textContent = "🗑️";
                  deleteIcon.style.cursor = "pointer";
                  deleteIcon.style.marginLeft = "10px";
                  deleteIcon.style.fontSize = "3rem";
                  deleteIcon.style.color = "red";
                  deleteIcon.addEventListener("click", async () => {
                    try {
                      const res = await fetch(`https://voiceswithin-node-express.onrender.com/delete/${blog._id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${user?.token}`
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


                // content of blog in li
                const contentDiv = document.createElement('div');
                contentDiv.id = "contentDiv";
                const content = document.createElement('div');
                content.textContent = blog.content;

                // readmore button for moving to blog.html
                const readMore = document.createElement('a')
                readMore.id = "readMore";

                //attaching the id here, because when we move to blog.html
                // we will make a fetch req for the particular blog
                // where we need id

                readMore.href = `blog.html?id=${blog._id}`;
                readMore.textContent = "Read more...."

                contentDiv.appendChild(content);
                li.appendChild(titleDiv);
                li.appendChild(contentDiv);
                li.appendChild(readMore);
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
