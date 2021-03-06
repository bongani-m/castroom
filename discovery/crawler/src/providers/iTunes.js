import axios from "axios";

export default class iTunesProvider {
  static getCrawlableUrls(data, currentUrl) {
    let clickableUrls = data.match(/https:\/\/podcasts.apple.com\/\w{2}\/((genre\/[^/]+?-[^/]+?\/id\d{4}(\?letter=.(&amp;page=\d\d?#page)?)?)|podcast\/(([^/]+?-){0,100}([^/]+?)\/id\d{0,12})(?="))/g);

    if (clickableUrls && clickableUrls.length >= 0) {
      // prevent the link back to this page from being processed again
      clickableUrls = clickableUrls.filter((item) => item !== currentUrl);

      return Array.from(new Set(clickableUrls));
    }

    return [];
  }

  static getPodcastId(url) {
    let id = url.match(/\/id\d*/g);

    if (id && id[0].length > 8) {
      id = id[0].replace("/id", "");
      return id;
    }
    return null;
  }

  static getMetadata(podcastId) {
    console.log("Looking up", podcastId);
    const lookupUrl = `https://itunes.apple.com/lookup?id=${podcastId}`;

    return axios.get(lookupUrl);
  }
}
