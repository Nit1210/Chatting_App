import { db, collection, Timestamp, addDoc, orderBy, doc, query, where, onSnapshot, updateDoc, getDocs, storage, ref, uploadBytes, getDownloadURL } from './firestore.js';

class chatting_room {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.charts = collection(db, "chatting");
        this.getChat;

    }
    //adding chat to the database
    async addChat(message) {
        const time = new Date();
        const chat =
        {
            message,
            username: this.username,
            room: this.room,
            created_at: Timestamp.now(time).toDate(),
        }
        //console.log(chat);
        const Chatresponse = await addDoc(this.charts, chat)
    }
    //add filedata to the chat database
    async addFile(file) {
        const time = new Date();
        const FileData = {
            username: this.username,
            room: this.room,
            filename: file.name,
            path: file.path,
            type: file.type,
            size: file.size,
            created_at: Timestamp.now(time).toDate(),
        }
        //adding file to chat
        const Fileresponse = await addDoc(this.charts, FileData);
        console.log(Fileresponse);
    }
    //getting chats form database
    getChats(callback) {
        console.log("started data collection");
        const q = query((this.charts), where("room", "==", this.room), orderBy("created_at"));
        this.getChat = onSnapshot(q, (doc) => {
            doc.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data());
                    console.log("collected chat data");
                }

            });

        });
    }
    //updating Username
    async updateUsername(username) {
        const docref = await getDocs(this.charts);
        docref.docs
            .filter((document) => {
                return (document.data().username !== username);
            })
            .forEach(async (document) => {
                //  if (document.data().username !== username) 
                //  {
                if (document.data().username === this.username) //changing the names of only the current user
                {
                    const q = await updateDoc(doc(db, "chatting", document.id), { username: username });
                    this.username = username;
                    localStorage.setItem('username', username);
                    console.log("username Updated");
                    console.log(`${q}`);
                }
                //  }
                else {
                    console.log("This name is taken. enter another name");
                }
                // add snapshot for name field change
            });




    }
    updateRoom(Newroom) {
        this.room = Newroom;
        if (this.getChat) {
            this.getChat();
            console.log("room Updated :" + Newroom);
        }
    }
    //upload files from local
    async uploadfile(file) {
        const path = 'gs://eastern-hawk-400404.appspot.com/chating_APP/files/' + this.room + '/' + file.name;
        const storageRef = ref(storage, path);
        // 'file' comes from the  File API
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded ' + file.name);
            
        });
        getDownloadURL(storageRef)
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            // const xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = (event) => {
            //     const blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();

            // Or inserted into an <img> element
            file.path = url.toString();
            
            this.addFile(file);
        })
        .catch((error) => {  
            // Handle any errors
            console.log(error);
        });
    }
    //uploading the file to chat
    async downloadfile(file) {
        // const path = 'gs://eastern-hawk-400404.appspot.com/chating_APP/files/' + this.room + '/' + file;
        // const storageRef = ref(storage, path);
        // getDownloadURL(storageRef)
        // .then((url) => {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // This can be downloaded directly:
        //     // const xhr = new XMLHttpRequest();
        //     // xhr.responseType = 'blob';
        //     // xhr.onload = (event) => {
        //     //     const blob = xhr.response;
        //     // };
        //     // xhr.open('GET', url);
        //     // xhr.send();

        //     // Or inserted into an <img> element
        //     file.path = url.toString();
        //     this.addFile(file);
        // })
        // .catch((error) => {
        //     // Handle any errors
        //     console.log(error);
        // });

    }
    //    await getDownloadURL(storageRef)
    //         .then((url) => {
    //             // `url` is the download URL for 'file'

    //             // This can be downloaded directly:

    //             console.log(url.toString());
    //             let fileurl=url.toString();
    //             //  inserting into chatting li
    //             this.addChat(fileurl);
    //         })
    //         .catch((error) => {
    //             // Handle any errors
    //             console.log(error);
    //         });
}


export { chatting_room }
//chartroom.updateUsername('nit');