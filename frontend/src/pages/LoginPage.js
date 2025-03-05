import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { publicKey, connect, disconnect } = useWallet();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
    };

    const handleWalletConnect = async () => {
        if (!publicKey) {
            await connect();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl mb-4">SolSniper Bot - Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Login
                </button>
            </form>
            <div className="mt-8">
                <WalletModalProvider>
                    <WalletMultiButton className="p-2 bg-green-500 text-white rounded" />
                    <WalletDisconnectButton className="p-2 bg-red-500 text-white rounded mt-2" />
                </WalletModalProvider>
            </div>
        </div>
    );
};

export default LoginPage;
