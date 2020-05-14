let Peer = require('simple-peer');
let socket = io();
// const peerVideo = document.getElementById('peerVideo');
const video = document.querySelector('video');

let client = {};

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(stream => {
        socket.emit('NewClient');
        console.log(stream);
        video.srcObject = stream;
        video.play();

        function InitPeer(type){
            let peer = new Peer({initiator:(type=='init')? true : false, stream: stream, trickle: false});
            peer.on('stream', (stream)=>{
                CreateVideo(stream);
            })
            
            return peer;
        }

        DisconnectPeer = () =>{
            document.getElementById('peerVideo').remove();
            if(client.peer){
                client.peer.destroy();
            }
        }

        //Init type peer
        MakePeer = ()=>{
            client.gotAnswer = false;
            let peer = InitPeer('init');
            peer.on('signal',(data)=>{
                if(!client.gotAnswer){
                    socket.emit('offer', data)
                }
            })
            client.peer = peer;
        }

        frontAnswer = (offer)=>{
            let peer = InitPeer('notInit');
            peer.on('signal',(data)=>{
                socket.emit('Answer', data);
            })
            peer.signal(offer);
        }

        signalAnswer = (answer) =>{
            client.gotAnswer = true;
            let peer = client.peer;
            peer.signal(answer);
        }

        CreateVideo=(stream)=>{
            let video = document.createElement('video');
            video.id = 'peerVideo';
            video.srcObject = stream;
            //video.class = 'embed-responsive-item';
            document.querySelector('#peerDiv').appendChild(video);
            video.addEventListener('click',()=>{
                if(video.volume == 0){
                    video.volume = 1;
                } else {
                    video.volume = 0;
                }
            })
            video.play();
        }

        SessionActive = () =>{
            document.write('Session active please comeback later');
        }

        socket.on('BackOffer',frontAnswer);
        socket.on('BackAnswer',signalAnswer);
        socket.on('SessionActive',SessionActive);
        socket.on('CreatePeer',MakePeer);
        socket.on('Disconnect', DisconnectPeer);

    })
    .catch(error => {
        document.write(error);
    })