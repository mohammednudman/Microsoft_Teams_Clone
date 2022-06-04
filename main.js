const APP_ID='019d3ffc61184149a23afd37f8a35aa0'
const TOKEN='006019d3ffc61184149a23afd37f8a35aa0IAA+QhZksZpOgpjPzNxaSTlZyJ/NLSMZLt/chCglKf++vmTNKL8AAAAAEABdi2YtFeScYgEAAQAU5Jxi'
const CHANNEL='main'
const client =AgoraRTC.createClient({mode:'rtc',codec:'vp8'})

let localTracks=[]
let remoteUsers={}
let joinAndDisplayLocalStream=async()=>{
    let UID=await client.join(APP_ID,CHANNEL,TOKEN,null)
    localTracks =await 
}