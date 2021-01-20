import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PushButton from './pushbutton';

export default function Webpush() {

    // サービスワーカーが使えない系では何もしない
    if ('serviceWorker' in navigator) {
        console.log('service worker サポート対象');

        // サービスワーカーとして、public/sw.js を登録する
        navigator.serviceWorker.register('sw.js')
        .then(function (swReg) {
        console.log('Service Worker is registered', swReg)
        initialiseServiceWorker()
        })
        .catch(function(error) {
        console.error('Service Worker Error', error)
        })
    } else {
        console.log('service worker サポート対象外');
    }
    /** 
     * サービスワーカーを初期化する
     * 初期化では、プッシュ通知用の情報をサーバに送ることになる
     */
    function initialiseServiceWorker() {
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.log('cant use notification')
            return
        }
        if (Notification.permission === 'denied') {
            console.log('user block notification')
            return
        }
        if (!('PushManager' in window)) {
            consoleo.log('push messaging not supported')
            return
        }
        // プッシュ通知使えるので
        navigator.serviceWorker.ready.then(registration => {
            console.log(registration)
            registration.pushManager.getSubscription()
            .then(subscription => {
                if (! subscription) {
                    subscribe(registration)
                }
            })
        })
    }
    /** 
     * サーバに自身の情報を送付し、プッシュ通知を送れるようにする
     */
    function subscribe(registration) {
        var options = { userVisibleOnly: true }
        var vapidPublicKey = document.head.querySelector('meta[name="vapidPublicKey"]').content;
        if (vapidPublicKey) {
            options.applicationServerKey = urlBase64ToUint8Array(vapidPublicKey)
        }
        registration.pushManager.subscribe(options)
        .then(subscription => {
            updateSubscription(subscription)
        })
    }
    /** 
     * 購読情報を更新する
     *
     */
    function updateSubscription(subscription) {
        var key = subscription.getKey('p256dh')
        var token = subscription.getKey('auth')
        var data = new FormData()
        data.append('endpoint', subscription.endpoint)
        data.append('key', key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null),
        data.append('token', token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null)
        var csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        // サーバに通信し、endpointを渡す
        fetch('/push_user_register', {
            method: 'POST',
            body: data,
            headers: {
                'X-CSRF-Token': csrf_token,
            }
          }).then(() => console.log('Subscription ended'))
    }

    function urlBase64ToUint8Array (base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
        console.log(base64);
        var rawData = window.atob(base64)
        var outputArray = new Uint8Array(rawData.length)
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
    }

    return(
        <PushButton />
    )
}

if (document.getElementById('webpush')) {
    ReactDOM.render(<Webpush />, document.getElementById('webpush'));
}