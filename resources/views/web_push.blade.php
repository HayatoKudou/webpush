<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="vapidPublicKey" content="{{ config('webpush.vapid.public_key') }}">

<body>
    <p>webpush</p>
    <div id="root">
    </div>
</body>

<script src="{{ url('js/app.js') }}"></script> 