//handles messaging and discord communication

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateSong") {
        updateDiscordPresence(message.data);
    }
});

function updateDiscordPresence(song) {
    fetch("http://localhost:6463/rpc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cmd: "SET_ACTIVITY",
            args: {
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
        })
    }).catch(err => console.error("Failed to update Discord presence", err));
}