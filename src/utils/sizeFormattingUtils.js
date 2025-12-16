export function getUINameFromSize(size) {
    let UISizeName;
    switch(size) {
        case "home-large":
            UISizeName = "Home Page - Large";
            break;
        case "search-result":
            UISizeName = "Search Results";
            break;
        case "channel-large":
            UISizeName = "Channel Page - Large";
            break;
        case "channel-small":
            UISizeName = "Channel Page - Large";
            break;
        case "sidebar":
            UISizeName = "Sidebar";
            break;
        case "home-full-width":
            UISizeName = "Home Page - Full Width";
            break;
        default:
            UISizeName = "Unknown";
            break;
    }
    return UISizeName;
}