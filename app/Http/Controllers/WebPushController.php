<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use App\Notifications\EventAdded;

class WebPushController extends Controller
{
    public function __construct() {
        $this->middleware('auth');  // 要ログイン
    }

    public function subscription(Request $request)
    {
        $user = \Auth::user();
        $endpoint = $request->endpoint;
        $key = $request->key;
        $token = $request->token;
        $user->updatePushSubscription($endpoint, $key, $token);

        return ['result' => true];
    }

    public function push_test(){
        $users = \App\User::all();
        foreach ($users as $user) {
            $user->notify(new EventAdded);
        }
    }
}