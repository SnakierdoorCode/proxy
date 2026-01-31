function FindProxyForURL(url, host) {
    if (isPlainHostName(host) || shExpMatch(host, "*.local")) {
        return "DIRECT";
    }
    return "PROXY YOUR_PROXY_IP:PORT; DIRECT";
}
