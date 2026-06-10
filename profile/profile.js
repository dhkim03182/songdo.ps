const params = new URLSearchParams(location.search);
let userId = params.get("id") || "kdh";

console.log("userId =", userId);

// JSON 로드
fetch(`../data/${userId}.json`)
    .then(res => {
        console.log("fetch status:", res.status);

        if (!res.ok) {
            throw new Error("JSON not found: " + userId);
        }

        return res.json();
    })
    .then(data => {
        console.log("DATA LOADED:", data);
        render(data);
    })
    .catch(err => {
        console.error("FETCH ERROR:", err);
    });

// 테스트 API (선택)
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(r => r.json())
    .then(d => {
        console.log("TEST OK:", d);
    });

// render 함수
function render(data){

    console.log("RENDER START:", data);

    document.getElementById("username").innerText = data.username || "Unknown";
    document.getElementById("ingame").innerText = data.ingame || "-";
    document.getElementById("main").innerText = data.main || "-";
    document.getElementById("sub").innerText = data.sub || "-";

    document.getElementById("wr-total").innerText = (data.winrate?.total ?? 0) + "%";
    document.getElementById("wr-5q").innerText = (data.winrate?.duo ?? 0) + "%";
    document.getElementById("wr-trio").innerText = (data.winrate?.trio ?? 0) + "%";
    document.getElementById("wr-solo").innerText = (data.winrate?.solo ?? 0) + "%";

    document.getElementById("top").innerText = (data.position?.top ?? 0) + "%";
    document.getElementById("jungle").innerText = (data.position?.jungle ?? 0) + "%";
    document.getElementById("mid").innerText = (data.position?.mid ?? 0) + "%";
    document.getElementById("adc").innerText = (data.position?.adc ?? 0) + "%";
    document.getElementById("sup").innerText = (data.position?.sup ?? 0) + "%";

    // matches
    const matchBox = document.getElementById("matches");
    matchBox.innerHTML = "";

    (data.matches || []).forEach(m => {
        const div = document.createElement("div");
        div.className = "match " + (m.result === "WIN" ? "win" : "lose");

        div.innerHTML = `
            <b>${m.result}</b><br>
            ${m.champ}<br>
            ${m.kda}
        `;

        matchBox.appendChild(div);
    });

    // most3
    const mostBox = document.getElementById("most3");
    mostBox.innerHTML = "";

    (data.most3 || []).forEach(c => {
        const div = document.createElement("div");
        div.className = "champ";

        div.innerHTML = `
            <b>${c.name}</b><br>
            ${c.mastery}
        `;

        mostBox.appendChild(div);
    });
}