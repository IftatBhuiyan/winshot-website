import { getConfig, getReleases } from "./account-api.js";

const purchase = document.getElementById("purchase-button");
const status = document.getElementById("purchase-status");

if (purchase && status) {
  purchase.addEventListener("click", () => {
    if (!purchase.disabled) window.location.assign("manage-license.html");
  });
  getConfig().then(config => {
    if (config.checkoutEnabled !== true) return;
    purchase.textContent = "Get Stillmark · $30";
    purchase.disabled = false;
    status.textContent = "Sign in to purchase. Your license will appear in your account.";
  }).catch(() => {
    status.textContent = "We couldn’t check purchase availability. Please refresh or contact support.";
  });
}

const download = document.getElementById("download-button");
const downloadStatus = document.getElementById("download-status");
if (download && downloadStatus) {
  getConfig().then(async config => {
    if (config.checkoutEnabled !== true) return;
    const { releases } = await getReleases();
    const release = releases.filter(item => {
      const url = new URL(item.downloadUrl);
      return Array.isArray(config.allowedDownloadHosts) &&
        config.allowedDownloadHosts.includes(url.hostname) &&
        /^\d+\.\d+\.\d+$/.test(item.version) &&
        /^[a-f0-9]{64}$/i.test(item.sha256) &&
        Number.isFinite(Date.parse(item.releasedAt)) && Date.parse(item.releasedAt) <= Date.now();
    }).sort((a, b) => Date.parse(b.releasedAt) - Date.parse(a.releasedAt))[0];
    if (!release) throw new Error("No release available");
    const link = document.createElement("a");
    link.className = "button download-primary";
    link.href = release.downloadUrl;
    link.textContent = "Download for Windows";
    download.replaceWith(link);
    downloadStatus.textContent = `Version ${release.version} · Released ${new Date(release.releasedAt).toLocaleDateString()}`;

  }).catch(() => {
    downloadStatus.textContent = "We couldn’t check download availability. Please refresh or contact support.";
  });
}
