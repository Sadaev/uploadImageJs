import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from'./upload'

const firebaseConfig = {
    apiKey: "AIzaSyD3UXa1b9jRKmwHM44wwQdIBb5wPPPRUFQ",
    authDomain: "uploadpicture-88934.firebaseapp.com",
    projectId: "uploadpicture-88934",
    storageBucket: "uploadpicture-88934.appspot.com",
    messagingSenderId: "477584161369",
    appId: "1:477584161369:web:84cef228f5d1630d42cf48"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', 'gif'],
    onUpload(files, blocks){
        files.forEach( (file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percent  = ((snapshot.bytesTransferred / snapshot.totalBytes) *100).toFixed(0)+'%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percent
                block.style.width = percent
            }, error => {
                console.log(error);
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('downloadUrl: ', url);
                })
            })
        })
    }
})

/**
 * Переписать с помощю класса
 * Переписать с потключение Фреймворка VUE REACT
 * Дополнить Функционал
 * Галерея 
 */