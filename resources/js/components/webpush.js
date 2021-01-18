import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function Webpush() {

    function setPush(){

        const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        const vapidPublicKey = document.head.querySelector('meta[name="vapidPublicKey"]').content;

        const options = {
            // applicationServerKey: base64ToUint8(vapidPublicKey),
            applicationServerKey: vapidPublicKey,
        };        
        console.log(vapidPublicKey);
        console.log(csrf_token);

        fetch('/web_push', {
            method: 'POST',
            body: JSON.stringify(options),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf_token,
            }
        })
        .then(response => {
            alert('プッシュ通知が登録されました');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <div>
            <button onClick={() => setPush()}>set psuh</button>
        </div>
    )
}

console.log('test');
if (document.getElementById('root')) {
    ReactDOM.render(<Webpush />, document.getElementById('root'));
}