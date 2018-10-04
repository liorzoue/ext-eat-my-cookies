chrome.browserAction.onClicked.addListener(function(tab) {
    
    var currentDomain = GetCurrentDomain(tab);
    var options = GetStorage('EatMyCookiesApp.options');
    
    if (currentDomain != null) {
        var details = {};
        if (options.DeleteByDomain) {
            console.log('[EatMyCookies] DeleteByDomain');
            details.domain = GetCurrentDomain(tab);
        } else {
            details.url = tab.url;
        }
        
        if (options.DeleteLocalStorage) {
            LocalStorageDelete(tab);
        }
        
        chrome.cookies.getAll(details, function (cookies) {
            CookiesDelete(cookies);
            ReloadIfAuth(options);        
        });
    }
});

function GetCurrentDomain(tab) {
    var matches = tab.url.match(/^https?\:\/\/([^\/?#:]+)(?:[\/?#:]|$)/i);
    var d = matches && matches[1].replace('www.','');
    
    console.log('[EatMyCookies] Domain: ', d);
    
    return d;
}

function CookiesDelete (cookies) {
    console.log('[EatMyCookies] Cookies: ', cookies);
    
    var len = cookies.length;
    for (var i=0; i<len; i++) {
        var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
        var cname = cookies[i].name;
        chrome.cookies.remove({"url": url,"name": cname});
    }
}

function LocalStorageDelete(tab) {
    var code = 'window.localStorage.clear()';
    chrome.tabs.executeScript({ code: code });
}

function GetStorage (key) {
    return JSON.parse(localStorage.getItem(key));
}

function ReloadIfAuth(o) {
    if (o.AutoRefresh) {
        console.log('[EatMyCookies] Refreshing...');
        chrome.tabs.reload();
    }
}

function LoadCookiesForIcon (tab) {
    var details = {};
    var options = GetStorage('EatMyCookiesApp.options');
    if (options.DeleteByDomain) {
        details.domain = GetCurrentDomain(tab);
    } else {
        details.url = tab.url;
    }
        
    if (details.domain == null && details.url == undefined) {
        chrome.browserAction.setBadgeText({text: ''});
    } else {
        
        chrome.cookies.getAll(details, function (cookies) {
            if (cookies == undefined) {
                chrome.browserAction.setBadgeText({text: ''});
            } else if (cookies.length == 0) {
                chrome.browserAction.setBadgeText({text: ''});
            } else {
                chrome.browserAction.setBadgeText({text: cookies.length + ''});
                chrome.browserAction.setBadgeBackgroundColor({ color: '#0D47A1'});
            }
        });
    }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {  
        LoadCookiesForIcon(tab);
    });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        LoadCookiesForIcon(tab);
    }
});