// --- Create and Append the JioGames SDK Script ---
var script = document.createElement('script');
script.src = 'https://jiogames.akamaized.net/gameSDK/jiogames/stable/v2.0/jiogames_sdk.js';
script.async = true;
//script.setAttribute('data-jg-test-environment', 'on');
script.setAttribute('data-jg-packagename', 'com.7SeasEntertainmentLimited.BrickBlaststb');
script.setAttribute('data-jioads-interstitial', 'ihfnd48q');
script.setAttribute('data-jioads-rewarded', 'zy9suaxp');
// script.setAttribute('data-jioads-banner', 'l9mp2wfq');  // Uncomment when needed
document.head.appendChild(script);
console.log("JioGames SDK script added successfully!");

// --- Polling for SDK Readiness ---
function checkJioGamesSDK() {
    if (window.JioGames) {
        console.log('JioGames SDK is now ready!');
        initializeSDKFunctions();
    } else {
        console.log('Waiting for JioGames SDK to load...');
        setTimeout(checkJioGamesSDK, 100);
    }
}

// --- Initialize SDK ---
function initializeSDKFunctions() {
    console.log("JioGames SDK Initialized.");
    //cacheAds(); // Optional preload
}

// --- Cache Ads ---
function cacheAds() {
    console.log("index : Caching both Interstitial and Rewarded Ads...");
    cacheInterstitialAd();
    setTimeout(function () {
        cacheRewardedAd();
    }, 5000);
}

// --- Banner Event Hook ---
window.onBannerReady = function () {
    console.log('Banner is ready to use! Timestamp: ' + Date.now());
};

// --- Global Ad Functions Accessible from Construct 3 ---

// Post Score
function postScore(score) {
    if (window.JioGames?.postScore) {
        window.JioGames.postScore(score);
        console.log("index : Score posted successfully: " + score);
    } else {
        console.log("index : Failed to post score.");
    }
}

// Cache Interstitial Ad
function cacheInterstitialAd() {
    if (window.JioGames?.cacheAd) {
        window.JioGames.cacheAd(AdType.Interstitial, {
            onAdPrepared: function () {
                console.log("index : Interstitial Ad prepared successfully.");
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Interstitial Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames cacheAd method is not available.");
    }
}

// Show Interstitial Ad
function showInterstitialAd() {
    if (window.JioGames?.showAd) {
        window.JioGames.showAd(AdType.Interstitial, {
            onAdClosed: function () {
                console.log("index : Interstitial Ad closed.");
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Interstitial Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames showAd method is not available.");
    }
}

// Cache Rewarded Ad
function cacheRewardedAd() {
    if (window.JioGames?.cacheAd) {
        window.JioGames.cacheAd(AdType.Rewarded, {
            onAdPrepared: function () {
                console.log("index : Rewarded Ad prepared successfully.");
                c3_callFunction("rvReady");
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Rewarded Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames cacheAd method is not available.");
    }
}

// Show Rewarded Ad
function showRewardedAd() {
    if (window.JioGames?.showAd) {
        window.JioGames.showAd(AdType.Rewarded, {
            onAdClosed: function (isRewardUser) {
                console.log("index : Rewarded Ad closed.");
                c3_callFunction("rvNotReady");
                if (isRewardUser) {
                    console.log("index : Give reward to the user.");
                }
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Rewarded Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames showAd method is not available.");
    }
}

// Load Banner
function loadBanner() {
    if (window.JGBanner?.loadBanner) {
        window.JGBanner.loadBanner()
            .then(function () {
                console.log('Banner loaded successfully.');
                showBanner();
            })
            .catch(function (error) {
                console.log('Failed to load the banner: ' + error);
            });
    } else {
        console.log('JGBanner.loadBanner is not available.');
    }
}

// Show Banner
function showBanner() {
    if (window.JGBanner?.showBanner) {
        window.JGBanner.showBanner();
        console.log("index : Banner displayed.");
    } else {
        console.log("index : Failed to show banner.");
    }
}

// Set Banner Position
function setBannerPosition(position) {
    if (window.JGBanner?.setBannerPosition) {
        if (position === "TOP") {
            window.JGBanner.setBannerPosition(BannerPosition.TOP);
            console.log("index : Banner position set to top.");
        } else if (position === "BOTTOM") {
            window.JGBanner.setBannerPosition(BannerPosition.BOTTOM);
            console.log("index : Banner position set to bottom.");
        }
    } else {
        console.log("index : Failed to set banner position.");
    }
}

// Hide Banner
function hideBanner() {
    if (window.JGBanner?.hideBanner) {
        window.JGBanner.hideBanner();
        console.log("index : Banner hidden.");
    } else {
        console.log("index : Failed to hide banner.");
    }
}

// Get User Profile
function getUserProfile() {
    if (window.JioGames?.playerInfo) {
        const playerInfo = window.JioGames.playerInfo;
        console.log("index : Gamer ID: " + playerInfo.gamer_id);
        console.log("index : Gamer Name: " + playerInfo.gamer_name);
        console.log("index : Gamer Avatar URL: " + playerInfo.gamer_avatar_url);
        console.log("index : Device Type: " + playerInfo.device_type);
        console.log("index : Date of Birth: " + playerInfo.dob);
    } else {
        console.log("index : Failed to retrieve player info.");
    }
}

// --- Start SDK Polling ---
checkJioGamesSDK();


const scriptsInEvents = {

	async Gameevent_Event22_Act1(runtime, localVars)
	{
		cacheAds();
	},

	async Gameevent_Event26_Act5(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Gameevent_Event135_Act7(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Gameevent_Event136_Act6(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Generalevent_Event51_Act7(runtime, localVars)
	{
		showRewardedAd();
	},

	async Generalevent_Event52_Act6(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Generalevent_Event75_Act7(runtime, localVars)
	{
		showRewardedAd();
	},

	async Generalevent_Event76_Act7(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Generalevent_Event79_Act8(runtime, localVars)
	{
		postScore(runtime.globalVars.SCORE);
		showAd();
	},

	async Generalevent_Event88_Act8(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Generalevent_Event93_Act8(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
