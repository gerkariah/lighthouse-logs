const USER = "gerkariah";
const PASS = "smiles";

let isAdmin = false;

/* ================= LOAD POSTS (with saving) ================= */
let posts = JSON.parse(localStorage.getItem("posts")) || [
    {
        title: "Site begins",
        desc: "A coastal archive of memory and light.",
        body: "<p>Welcome to Lighthouse Logs.</p>",
        date: new Date().toISOString()
    }
];

/* ================= SAVE POSTS ================= */
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

/* ================= RENDER ================= */
function renderPosts() {
    const container = document.getElementById("timeline");
    container.innerHTML = "";

    posts.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "log";

        const shortDesc = p.desc && p.desc.length > 100
            ? p.desc.slice(0, 100) + "..."
            : p.desc || "";

        const date = p.date
            ? new Date(p.date).toLocaleString()
            : "";

        div.innerHTML = `
            <b>${p.title}</b><br>
            <small style="opacity:0.6;">${date}</small><br>
            <small>${shortDesc}</small>
        `;

        div.onclick = () => openPost(p, index);

        container.appendChild(div);
    });
}

renderPosts();

/* ================= MODAL ================= */
function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
});

/* ================= LOGIN ================= */
function login() {
    const u = document.getElementById("user").value;
    const p = document.getElementById("pass").value;

    if (u === USER && p === PASS) {
        isAdmin = true;
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("postBox").style.display = "block";
        alert("Admin mode enabled");
    } else {
        alert("nope :)");
    }
}

/* ================= POST ================= */
function submitPost() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const body = document.getElementById("body").innerHTML;

    posts.unshift({
        title,
        desc,
        body,
        date: new Date().toISOString()
    });

    savePosts();       // ✅ SAVE HERE
    renderPosts();
    closeModal();
}

/* ================= SPOTLIGHT ================= */
function openPost(p, index) {
    document.body.classList.add("spotlight");

    const overlay = document.getElementById("spotlight");

    overlay.innerHTML = `
        <div class="spotlight-card" style="position:relative;">

            <button onclick="closePost()" style="
                position:absolute;
                top:10px;
                right:12px;
                border:none;
                background:white;
                font-size:20px;
                width:32px;
                height:32px;
                border-radius:6px;
                cursor:pointer;
                font-weight:bold;
            ">✕</button>

            <h2>${p.title}</h2>

            <small style="opacity:0.6;">
                ${new Date(p.date).toLocaleString()}
            </small>

            <p>${p.desc}</p>

<<<<<<< HEAD
            <div class="post-body">${p.body}</div>
=======
            <div>${p.body}</div>
>>>>>>> 695aa264ac51616a6105d852a5c9f18a720b34c9

            ${isAdmin ? `
                <hr>
                <button onclick="editPost(${index})">Edit Post</button>
                <button onclick="deletePost(${index})" style="color:red;">Delete Post</button>
            ` : ""}

            <br><br>
            <button onclick="closePost()">Back</button>

        </div>
    `;
}

/* ================= CLOSE ================= */
function closePost() {
    document.body.classList.remove("spotlight");
    document.getElementById("spotlight").innerHTML = "";
}

/* ================= DELETE ================= */
function deletePost(index) {
    if (!isAdmin) return;

    if (!confirm("Delete this lighthouse log?")) return;

    posts.splice(index, 1);

    savePosts();   // ✅ SAVE HERE
    renderPosts();
    closePost();
}

/* ================= EDIT ================= */
function editPost(index) {
    if (!isAdmin) return;

    const p = posts[index];

    const newTitle = prompt("Edit title:", p.title);
    const newDesc = prompt("Edit description:", p.desc);
    const newBody = prompt("Edit body:", p.body);

    if (newTitle !== null) p.title = newTitle;
    if (newDesc !== null) p.desc = newDesc;
    if (newBody !== null) p.body = newBody;

    savePosts();   // ✅ SAVE HERE
    renderPosts();
    closePost();
}