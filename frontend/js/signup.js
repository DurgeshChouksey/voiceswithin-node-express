async function signUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        document.getElementById("reqRes").textContent = "All fields are required.";
        document.getElementById("reqRes").style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("reqRes").textContent = "Please enter a valid email address.";
        document.getElementById("reqRes").style.color = "red";
        return;
    }

    try {
        const res = await fetch("https://voiceswithin-node-express.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password})
        });

        const data = await res.json();

        if (res.ok) {
            document.getElementById("reqRes").textContent = data.msg;

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        } else {
            document.getElementById("reqRes").textContent = data.message || "Something went wrong!";
            document.getElementById("reqRes").style.color = "red";
        }
    } catch (error) {
        console.log(error);
        document.getElementById("reqRes").textContent = "Network error. Please try again.";
    }
}


document.getElementById("signUpForm").addEventListener("submit", (e) => {
    e.preventDefault();
})


document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
})
