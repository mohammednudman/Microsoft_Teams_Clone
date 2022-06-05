const APP_ID = "019d3ffc61184149a23afd37f8a35aa0";
const TOKEN =
  "006019d3ffc61184149a23afd37f8a35aa0IAA+QhZksZpOgpjPzNxaSTlZyJ/NLSMZLt/chCglKf++vmTNKL8AAAAAEABdi2YtFeScYgEAAQAU5Jxi";
const CHANNEL = "main";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTrack = [];
let remoteTrack = {};

let joinAndDisplayLocalStream = async () => {
  let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
  localTrack = await AgoraRTC.createMicrophoneAndCameraTracks();
  let player = `<div class="constainer" id="user-container-${UID}">
                  <div class="video-player" id="user-${UID}"></div>
                </div>`;
  document
    .getElementById("video-streams")
    .insertAdjacentElement("beforeend", player);
  localTrack[1].play(`user-${UID}`);
  await client.publish([localTrack[0], localTrack[1]]);
};

let joinStream = async () => {
  await joinAndDisplayLocalStream();
  document.getElementById("join-btn").style.display = "none";
};

document.getElementById("join-btn").addEventListener("click", joinStream);
