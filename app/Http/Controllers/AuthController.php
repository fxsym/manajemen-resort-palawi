<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'userInput' => ['required'],
            'password' => ['required'],
        ]);

        $loginField = filter_var($credentials['userInput'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $loginData = [
            $loginField => $credentials['userInput'],
            'password' => $credentials['password'],
        ];

        if (Auth::attempt($loginData, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'message' => $loginField . ' atau password yang anda masukan salah.',
        ])->onlyInput('message');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        // invalidate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
