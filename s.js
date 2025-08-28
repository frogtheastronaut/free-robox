const stuff = document.getElementById("stuff");

const memes = [];
const push = (tit, con, add) => memes.push(`${tit}: ${con !== undefined ? con : "N/A"}${add || ""}`);

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

(async () => {
  let my_ip = null;
  let ip_data = null;
  try {
    my_ip = await fetch("https://wtfismyip.com/json").then(res => res.json());
  } catch (e) {}
  try {
    if (my_ip && my_ip.YourFuckingIPAddress) {
      ip_data = await fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${my_ip.YourFuckingIPAddress}`).then(res => res.json());
    }
  } catch (e) {}

  if (my_ip && ip_data) {
    push("IP Address", ip_data.query);
    push("Hostname", my_ip.YourFuckingHostname);
    push("Country", `${ip_data.country} (${ip_data.countryCode})`);
    push("Region", `${ip_data.regionName} (${ip_data.region})`);
    push("City", ip_data.city);
    push("Latitude", ip_data.lat);
    push("Longitude", ip_data.lon);
    push("ISP", my_ip.YourFuckingISP);
    push("Autonomous System", ip_data.as);
  } else {
    push("IP Address", "::ffff:172.70.126.134");
  }
  push("User Agent", navigator.userAgent);
  push("Connection Method", "GET");
  push("Request URL", "/");
  push("Request Path", "/");
  push("Request Protocol", "HTTP/1.1");
  push("Secure Connection", location.protocol === "https:" ? "Yes" : "No");
  push("Proxy IPs", "[]");
  push("Window Properties", Object.keys(window).length);
  push("Window Width", window.innerWidth, "px");
  push("Window Height", window.innerHeight, "px");
  push("Window Ratio", `${window.innerWidth / window.innerHeight}/1`);
  push("Screen Width", window.screen.availWidth, "px");
  push("Screen Height", window.screen.availHeight, "px");
  push("Screen Ratio", `${window.screen.availWidth / window.screen.availHeight}/1`);
  push("Screen Pixel Ratio", window.devicePixelRatio, "/1");
  push("Screen DPI", window.devicePixelRatio);
  push("Screen Color Depth", window.screen.colorDepth);
  push("Screen Orientation", window.screen.orientation ? `${window.screen.orientation.type} (${window.screen.orientation.angle}°)` : "N/A");
  push("Screen Rotation", window.screen.orientation ? window.screen.orientation.angle : "N/A");
  push("OS", `${navigator.platform}`);
  push("Available Browser Memory", typeof window.performance.memory != "undefined" ? Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024) : null, "MB");
  push("CPU Threads", `${navigator.hardwareConcurrency}`);
  const canvas = document.createElement("canvas");
  let gl;
  let debugInfo;
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    debugInfo = gl && gl.getExtension("WEBGL_debug_renderer_info");
  } catch (e) {}
  if (gl && debugInfo) {
    push("GPU Vendor", gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
    push("GPU Info", gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
  }
  push("Device Memory", navigator.deviceMemory !== undefined ? `${navigator.deviceMemory}` : "N/A");
  push("System Languages", navigator.languages ? navigator.languages.join(", ") : "N/A");
  push("Language", navigator.language || "N/A");
  let date = new Date();
  push("Current Time", `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
  if (ip_data && ip_data.timezone) push("Timezone", ip_data.timezone);
  push("Timezone Offset", date.getTimezoneOffset() / 60, " hours");

  // push each element of memes into stuff
  memes.forEach(meme => {
    const p = document.createElement("p");
    p.textContent = meme;
    stuff.appendChild(p);
  });
})();
