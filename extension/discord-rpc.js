//handles connection to discord rich presence

class DiscordRPC {
    constructor(clientID) {
        this.clientID = clientID;
        this.connect();
    }

    connect() {
        this.socket = new WebSocket("ws://127.0.0.1:6463/");
        this.socket.onopen = () => console.log("Connected to Discord RPC");
        this.socket.onerror = (error) => console.log("Discord RPC error:", error);
    }

    setActivity(song) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.warn("Discord RPC is not connected.");
            return;
        }

        const payload = {
            cmd: "SET_ACTIVITY",
            args: {
                pid: process.pid,
                activity: {
                    details: song.title,
                    state: `by ${song.artist}`,
                    assets: {
                        large_image: "youtube_music",
                        large_text: "YouTube Music"
                    }
                }
            },
            nonce: Math.random().toString(36).substring(7)
        };
        this.socket.send(JSON.stringify(payload));
    }
}
const rpc = new DiscordRPC("DISCORDCLIENTID") //TODO: discord client id