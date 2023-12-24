const typeofTranscription = {
  duration: 3.63,
  start: 7076.46,
  text: "de pensamento que tem absolutamente nada",
};

const typeofSearchResultItem = {
  _id: "3751cccf395f2979235dab4f1b71d156",
  transcriptions: [typeofTranscription],
  video: {
    _id: "prTpQU0ekb0",
    allowRatings: true,
    author: "Flow Podcast 1.0 - Episódios Completos",
    channelId: "UC4ncvgh5hFr5O83MH7-jRJg",
    isCrawlable: true,
    isLiveContent: true,
    isOwnerViewing: false,
    isPrivate: false,
    isUnpluggedCorpus: false,
    latencyClass: "MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL",
    lengthSeconds: "8527",
    publishDate: "ISOStringDate",
    thumbnail: {
      thumbnails: [
        {
          height: 180,
          url: "https://i.ytimg.com/vi/prTpQU0ekb0/mqdefault.jpg?v=618db9dc",
          width: 320,
        },
        {
          height: 224,
          url: "https://i.ytimg.com/vi/prTpQU0ekb0/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzxA50WNllNQ6xv1eVAwqhaQ_Z4Q",
          width: 400,
        },
        {
          height: 450,
          url: "https://i.ytimg.com/vi/prTpQU0ekb0/hq720.jpg?sqp=-oaymwEXCKAGEMIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCbHiHQmPEe3lOdMk_1J0K8OPwVqw",
          width: 800,
        },
        {
          height: 720,
          url: "https://i.ytimg.com/vi/prTpQU0ekb0/hq720.jpg?v=618db9dc",
          width: 1280,
        },
      ],
    },
    title: "FELIPE MOURA BRASIL - Flow Podcast #502",
    videoId: "prTpQU0ekb0",
    viewCount: "275130",
    watchUrl: "https://youtube.com/watch?v=prTpQU0ekb0",
  },
  videoId: "prTpQU0ekb0",
};

const typeofSearchResultData = {
  page: 1,
  count: 1,
  results: [typeofSearchResultItem],
};

export type TTranscription = typeof typeofTranscription;

export type TSearchResultItem = typeof typeofSearchResultItem;

export type TSearchResult = typeof typeofSearchResultData;
