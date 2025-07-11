// why we need token in create blog?
// we need userId in blog db model
// because using this userId, we can distinguish whether the user can edit the blog or not
// and we can also filter blogs in user.html

// and in backend, how we will get the user id, because we are not sending it
// we have two options either we can send the userId in the create blog url or we can extract it in the backend from req.user
// because in the auth handler we do req.user = decoded.user
// but for auth handler we will need token that's why we are sending it here

const user = JSON.parse(sessionStorage.getItem("user"))
const token = user?.token;

document.getElementById("blogForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const res = await fetch(`http://localhost:3000/create-blog/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({title, content})
    })

    const data = await res.json();

    // why data.message, because if there is error, we send a message: err.message
    // otherwise we just send a title, "successfully saved!"
    if(data.message) {
        document.getElementById("reqRes").textContent = data.message;
        document.getElementById("reqRes").style.color = "red";
    } else {
        document.getElementById("reqRes").textContent = data.title;
        document.getElementById("reqRes").style.color = "green";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    }


})
