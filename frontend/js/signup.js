const yup = window.yup;
async function signUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const schema = yup.object().shape({
        username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
    });

    const userData = { username, email, password };
    try {
        await schema.validate(userData);
    } catch (err) {
        document.getElementById("reqRes").textContent = err.message;
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
