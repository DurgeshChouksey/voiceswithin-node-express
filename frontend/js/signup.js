async function signUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password})
        })

        const data = await res.json();

        document.getElementById("reqRes").textContent = data.msg;

        window.location.href = "login.html"
    } catch (error) {
        console.log(error);
    }
}


document.getElementById("signUpForm").addEventListener("submit", (e) => {
    e.preventDefault();
})


document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
})
