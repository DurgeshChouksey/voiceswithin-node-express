const params = new URLSearchParams(window.location.search);
const id = params.get("id");


async function fetchData() {
    const res = await fetch(`https://voiceswithin-node-express.onrender.com/blogs/${id}`);
    const data = await res.json();

    console.log(data);

    const title = document.getElementById("title")
    title.value = data.title;

    const content = document.getElementById("content");
    content.textContent = data.content;
}

fetchData();

async function putData() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user?.token;

    const res = await fetch(`https://voiceswithin-node-express.onrender.com/edit-blog/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify({title, content})
    })

    const data = await res.json();

    console.log(data);
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
}

document.getElementById("blogForm").addEventListener("submit", function(e) {
    e.preventDefault();
    putData();
});
