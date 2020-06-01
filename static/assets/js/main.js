/**
 * Main JS file for theme behaviours
 */

// Responsive video embeds
var videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));


(() => {
    if (navigator.share) {
        // Android uses a different icon for sharing buttons
        // from devices in Apples ecosystem
        // Thanks to: https://davidwalsh.name/detect-android
        const ua = navigator.userAgent.toLowerCase();
        const isAndroid = ua.indexOf("android") > -1;
        const sharingIconSelector = isAndroid
            ? "[data-js-sharing-icon-android]"
            : "[data-js-sharing-icon-ios]";
        const sharingIcon = document.querySelector(sharingIconSelector);
        sharingIcon.classList.remove("is-hidden");

        const sharingButton = document.querySelector(
            "[data-js-sharing-button]"
        );

        sharingButton.classList.remove("is-hidden");
        sharingButton.removeAttribute("aria-hidden");

        sharingButton.addEventListener("click", () => {
            let url = document.location.href;

            const canonicalElement = document.querySelector(
                "link[rel=canonical]",
            );

            if (canonicalElement !== null) {
                url = canonicalElement.href;
            }

            navigator
                .share({ url: url })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        });
    }
})();
