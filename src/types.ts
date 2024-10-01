import { Session, User as SupabaseUser } from "@supabase/supabase-js";

const typeofTranscription = {
  duration: 3.63,
  start: 7076.46,
  text: "de pensamento que tem absolutamente nada",
};

const typeofSearchResultItem = {
  _id: "No02Ze6rqYk",
  transcriptions: [
    {
      duration: 4.32,
      start: 2796.24,
      text: "com mudança climática mais acontecimento de mudar \na geografia das cidades tipo vamos tirar a cidade  ",
    },
    {
      duration: 6.44,
      start: 2259.64,
      text: "10 anos atrás você via negacionista dizendo \nque não mudança climática não acontece hoje  ",
    },
    {
      duration: 5.2,
      start: 4230.36,
      text: "problema é que a gente tá amplificando essas ondas \nné Então isso que é mudança climática mudança  ",
    },
    {
      duration: 5.8,
      start: 1509.28,
      text: "equilibrar então mudança climática aquecimento \nglobal não é só que ah vai ter todo dia mais  ",
    },
    {
      duration: 5.84,
      start: 3480.4,
      text: "essa quantidade de mudanças climáticas que você tá \ntendo parece que cada vez mais esse intervalo fica  ",
    },
    {
      duration: 6.64,
      start: 1957.68,
      text: "os primeiros estudos eh que começaram ali sobre \nmudança climática na década de 60 os lugares que  ",
    },
  ],
  video: {
    _id: "No02Ze6rqYk",
    allowRatings: true,
    author: "ACHISMOS",
    channelId: "UCxcDCeShqZWIUQuEo2iJSVA",
    isCrawlable: true,
    isLiveContent: false,
    isLowLatencyLiveStream: false,
    isOwnerViewing: false,
    isPrivate: false,
    isUnpluggedCorpus: false,
    latencyClass: "MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL",
    lengthSeconds: "4737",
    musicVideoType: "MUSIC_VIDEO_TYPE_PODCAST_EPISODE",
    publishDate: "Mon, 20 May 2024 00:00:00 GMT",
    thumbnail: {
      thumbnails: [
        {
          height: 180,
          url: "https://i.ytimg.com/vi/No02Ze6rqYk/mqdefault.jpg?v=6647b5ff",
          width: 320,
        },
        {
          height: 224,
          url: "https://i.ytimg.com/vi/No02Ze6rqYk/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLARgoWLG0xh7Q4NCwL7ziyMal2a6Q",
          width: 400,
        },
        {
          height: 450,
          url: "https://i.ytimg.com/vi/No02Ze6rqYk/hq720.jpg?sqp=-oaymwEXCKAGEMIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCSgDI5Z_hXLEm9s4FxMZk0kSqq6g",
          width: 800,
        },
        {
          height: 720,
          url: "https://i.ytimg.com/vi/No02Ze6rqYk/hq720.jpg?v=6647b5ff",
          width: 1280,
        },
      ],
    },
    title:
      "TUDO QUE VOCÊ NUNCA QUIS SABER SOBRE METEOROLOGIA FT. JOÃO HACKEROTT | #ACHISMOS PODCAST #311",
    videoId: "No02Ze6rqYk",
    viewCount: "19044",
    watchUrl: "https://youtube.com/watch?v=No02Ze6rqYk",
  },
};

const typeofSearchResultData = {
  page: 1,
  count: 1,
  results: [typeofSearchResultItem],
};

const typeofSuggestions = {
  _type: "Suggestions",
  queryContext: {
    originalQuery: "po",
  },
  suggestionGroups: [
    {
      name: "Web",
      searchSuggestions: [
        {
          url: "https://www.bing.com/search?q=poki&FORM=USBAPI",
          displayText: "poki",
          query: "poki",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=portuguese+to+english&FORM=USBAPI",
          displayText: "portuguese to english",
          query: "portuguese to english",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=poupatempo&FORM=USBAPI",
          displayText: "poupatempo",
          query: "poupatempo",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=powerpoint&FORM=USBAPI",
          displayText: "powerpoint",
          query: "powerpoint",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=postman&FORM=USBAPI",
          displayText: "postman",
          query: "postman",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=portal+ecac&FORM=USBAPI",
          displayText: "portal ecac",
          query: "portal ecac",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=poki+games&FORM=USBAPI",
          displayText: "poki games",
          query: "poki games",
          searchKind: "WebSearch",
        },
        {
          url: "https://www.bing.com/search?q=power+bi&FORM=USBAPI",
          displayText: "power bi",
          query: "power bi",
          searchKind: "WebSearch",
        },
      ],
    },
  ],
};

export type OrderByValue =
  `${"video"}.${"viewCount" | "publishDate"}.${"asc" | "desc"}`;

export interface FilterOptions<T = string> {
  label: string;
  value: T;
}

export type User = SupabaseUser & {
  user_metadata: {
    display_name: string;
    allow_unpaid_access: boolean;
    subscription: boolean;
  };
};

export interface DecodedCredentials {
  name: string;
  picture: string;
  family_name: string;
  given_name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  session: Session;
}

export type TTranscription = typeof typeofTranscription;

export type TSearchResultItem = typeof typeofSearchResultItem;

export type TSearchResult = typeof typeofSearchResultData;

export type TSuggestions = typeof typeofSuggestions;
