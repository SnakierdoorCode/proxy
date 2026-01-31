function FindProxyForURL(url, host) {

    // 🔹 1. Local / private traffic = DIRECT
    if (
        isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0")
    ) {
        return "DIRECT";
    }

    // 🎮 2. Gaming services = DIRECT (no proxy, low latency)
    var gamingBypass = [
        "roblox.com",
        "roblox.net",
        "robloxcdn.com",
        "robloxlabs.com",
        "geforcenow.com",
        "nvidia.com"
    ];

    for (var i = 0; i < gamingBypass.length; i++) {
        if (dnsDomainIs(host, gamingBypass[i])) {
            return "DIRECT";
        }
    }

    // 🧪 3. VISIBLE TEST — force a special domain to DIRECT
    // Visit http://pac-test.local in your browser
    if (dnsDomainIs(host, "pac-test.local")) {
        return "DIRECT";
    }

    // 🌍 4. Everything else = proxy
    return "PROXY YOUR_PROXY_IP:PORT; DIRECT";
}
