const Socket = new io("ws://localhost:3500");

const activity = document.querySelector(".activity");

const msgInput = document.querySelector("input");

function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value) {
    Socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// listen for messages

Socket.on("message", (data) => {
  activity.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

msgInput.addEventListener("keypress", () => {
  Socket.emit("activity", Socket.id.substring(0, 5));
});

let activityTimer;
Socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  //clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
});
