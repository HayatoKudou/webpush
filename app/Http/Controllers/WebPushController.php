<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;

class WebPushController extends Controller
{
    public function test() {
        return view('create');
    }

    public function create() {
        return view('web_push');
    }

    public function store(Request $request) {
        Log::debug('$request');
        Log::debug($request);
        // $this->validate($request, [
        //     'endpoint'    => 'required',
        //     'keys.auth'   => 'required',
        //     'keys.p256dh' => 'required'
        // ]);

        $endpoint = $request->endpoint;
        // $token = $request->keys['auth'];
        // $key = $request->keys['p256dh'];
        $token = 'token_test';
        $key = 'key_test';
        $user = $request->user();
        $user->updatePushSubscription($endpoint, $key, $token);

        return response()->json([
            'success' => true
        ], 200);
    }
}
