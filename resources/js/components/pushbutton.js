import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function PushButton() {

    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const vapidPublicKey = document.head.querySelector('meta[name="vapidPublicKey"]').content;

    const options = {
        applicationServerKey: vapidPublicKey,
        csrfToken: csrf_token,
    };

    function push_test(){
        fetch('/push_test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf_token,
            }
        })
        .then(response => {
            // alert('プッシュ通知しました');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <div>
            <button onClick={() => push_test()}>push_test</button>
        </div>
    )
}