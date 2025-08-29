// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const makePromise = (delay, state) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                return resolve(delay);
            } else {
                return reject(delay);
            }
        }, delay);
    });  
}

const createNotification = evt => {
    evt.preventDefault();
    
    const delay = evt.target.delay.value;    
    const state = evt.target.state.value;
    
    makePromise(delay, state)        
        .then(delay => {
            iziToast.success({
                position: "topRight",
                message: `✅ Fulfilled promise in ${delay}ms`,
                messageColor: "#ffffff",
                messageSize: "16",  
                messageLineHeight: '150%',
                backgroundColor: '#59a10d',
                progressBarColor: "#326101",
                icon: '',                
                close: false,
            })
        })
        .catch(delay => { 
            iziToast.error({
                position: "topRight",
                message: `❌ Rejected promise in ${delay}ms`,
                messageColor: "#ffffff",
                messageSize: "16",  
                messageLineHeight: '150%',
                backgroundColor: '#ef4040',
                progressBarColor: "#b51b1b",
                icon: '',                
                close: false,
            })
        })
}

form.addEventListener('submit', createNotification);
