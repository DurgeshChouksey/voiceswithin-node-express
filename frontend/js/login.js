async function logIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("https://voiceswithin-node-express.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({username, password})
        })

        const data = await res.json();

        console.log(data);

        if(data.message) {
            document.getElementById("reqRes").textContent = data.message;
            return;
        } else {
            sessionStorage.setItem("user", JSON.stringify({username: data.username, userId: data.userId , token: data.token}));
            window.location.href = "index.html"
        }

    } catch (error) {
        console.log(error);
    }
}


document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
})


document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
})
