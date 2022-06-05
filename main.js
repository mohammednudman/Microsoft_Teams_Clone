const APP_ID = "019d3ffc61184149a23afd37f8a35aa0";
const TOKEN =
  "006019d3ffc61184149a23afd37f8a35aa0IAA+QhZksZpOgpjPzNxaSTlZyJ/NLSMZLt/chCglKf++vmTNKL8AAAAAEABdi2YtFeScYgEAAQAU5Jxi";
const CHANNEL = "main";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTrack = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published',handleUserJoined)
    client.on('user-left',handleUserLeft)

  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
  localTrack = await AgoraRTC.createMicrophoneAndCameraTracks();
  let player = `<div class="video-container" id="user-container-${UID}">
                  <div class="video-player" id="user-${UID}"></div>
                </div>`

  document.getElementById("video-streams").insertAdjacentHTML("beforeend", player);
  localTrack[1].play(`user-${UID}`)
  await client.publish([localTrack[0], localTrack[1]]);
  
};
let joinStream = async () => {
  await joinAndDisplayLocalStream();
  document.getElementById("join-btn").style.display = "none";
  document.getElementById("stream-controls").style.display = "flex";
};

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    let player = document.getElementById(`user-container-${user.uid}`);
    if (player != null) {
      player.remove();
    }

    player = `<div class="video-container" id="user-container-${user.uid}">
                <div class="video-player" id="user-${user.uid}"></div>
              </div>`;

    document.getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);

    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

let handleUserLeft = async (user) => {
  delete remoteUsers[user.uid]
  document.getElementById(`user.container-${user.uid}`).remove();
};

let leaveAndRemoveLocalStream = async () => {
  for (let i = 0; localTrack.length > i; i++) {
    localTrack[i].stop();
    localTrack[i].close();
  }
  await client.leave();
  document.getElementById("join-btn").style.display = "block";
  document.getElementById("stream-controls").style.display = "none";
  document.getElementById("video-streams").innerHTML = "";
};

let toggleMic = async (e) => {
  if (localTrack[0].muted) {
    await localTrack[0].setMuted(false);
    e.target.innerHTML = "Mic on";
    e.target.style.backgroundColor = "cadetblue";
  } else {
    await localTrack[0].setMuted(true);
    e.target.innerHTML = "Mic off";
    e.target.style.backgroundColor = "#EE4B2B";
  }
};

let toggleCamera = async (e) => {
  if (localTrack[1].muted) {
    await localTrack[1].setMuted(false);
    e.target.innerHTML = "Camera on";
    e.target.style.backgroundColor = "cadetblue";
  } else {
    await localTrack[1].setMuted(true);
    e.target.innerHTML = "Camera off";
    e.target.style.backgroundColor = "#EE4B2B";
  }
};

 

document.getElementById("join-btn").addEventListener("click", joinStream);
document.getElementById("leave-btn").addEventListener("click", leaveAndRemoveLocalStream);
document.getElementById("mic-btn").addEventListener("click", toggleMic);
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
