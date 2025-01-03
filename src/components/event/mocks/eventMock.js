const eventMockSimple = {
  name: "San Diego Gulls vs. Tucson Roadrunners",
  type: "event",
  id: "Z7r9jZ1A7ut3k",
  test: false,
  url: "https://www.ticketmaster.com/event/Z7r9jZ1A7ut3k",
  locale: "en-us",
  images: [
    {
      ratio: "3_2",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_RETINA_PORTRAIT_3_2.jpg",
      width: 640,
      height: 427,
      fallback: true,
    },
    {
      ratio: "16_9",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_EVENT_DETAIL_PAGE_16_9.jpg",
      width: 205,
      height: 115,
      fallback: true,
    },
    {
      ratio: "4_3",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_CUSTOM.jpg",
      width: 305,
      height: 225,
      fallback: true,
    },
    {
      ratio: "16_9",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_TABLET_LANDSCAPE_LARGE_16_9.jpg",
      width: 2048,
      height: 1152,
      fallback: true,
    },
    {
      ratio: "3_2",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_ARTIST_PAGE_3_2.jpg",
      width: 305,
      height: 203,
      fallback: true,
    },
    {
      ratio: "3_2",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_TABLET_LANDSCAPE_3_2.jpg",
      width: 1024,
      height: 683,
      fallback: true,
    },
    {
      ratio: "16_9",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_RECOMENDATION_16_9.jpg",
      width: 100,
      height: 56,
      fallback: true,
    },
    {
      ratio: "16_9",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_RETINA_PORTRAIT_16_9.jpg",
      width: 640,
      height: 360,
      fallback: true,
    },
    {
      ratio: "16_9",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_TABLET_LANDSCAPE_16_9.jpg",
      width: 1024,
      height: 576,
      fallback: true,
    },
    {
      ratio: "16_9",
      url: "https://s1.ticketm.net/dam/c/61c/37e6dc36-b80c-45a5-9bc5-960c7a98161c_106321_RETINA_LANDSCAPE_16_9.jpg",
      width: 1136,
      height: 639,
      fallback: true,
    },
  ],
  dates: {
    start: {
      localDate: "2025-01-28",
      localTime: "19:00:00",
      dateTime: "2025-01-29T00:00:00Z",
      dateTBD: false,
      dateTBA: false,
      timeTBA: false,
      noSpecificTime: false,
    },
    end: {
      localDate: "2025-01-29",
      localTime: "23:00:00",
      dateTime: "2025-01-29T00:00:00Z",
    },
    timezone: "America/New_York",
    status: {
      code: "onsale",
    },
    spanMultipleDays: false,
  },
  classifications: [
    {
      primary: true,
      segment: {
        id: "KZFzniwnSyZfZ7v7nE",
        name: "Sports",
      },
      genre: {
        id: "KnvZfZ7vAdI",
        name: "Hockey",
      },
      subGenre: {
        id: "KZazBEonSMnZfZ7vFEt",
        name: "Minor League",
      },
      type: {
        id: "KZ2323EonSMnZfZ7vFEt",
        name: "Mayor Type",
      },
      subType: {
        id: "KZ45654onSMnZfZ7vFEt",
        name: "Sub Type",
      },
      family: false,
    },
  ],
  _embedded: {
    venues: [
      {
        name: "Pechanga Arena San Diego",
        type: "venue",
        id: "ZFr9jZ7ae7",
        test: false,
        locale: "en-us",
        postalCode: "92110",
        timezone: "America/Los_Angeles",
        city: {
          name: "San Diego",
        },
        state: {
          name: "California",
          stateCode: "CA",
        },
        country: {
          name: "United States Of America",
          countryCode: "US",
        },
        address: {
          line1: "3500 Sports Arena Blvd",
        },
        location: {
          longitude: "-117.195999000",
          latitude: "32.777599000",
        },
        dmas: [
          {
            id: 381,
          },
        ],
        upcomingEvents: {
          tmr: 48,
          _total: 48,
          _filtered: 0,
        },
        _links: {
          self: {
            href: "/discovery/v2/venues/ZFr9jZ7ae7?locale=en-us",
          },
        },
        images: [
          {
            ratio: "16_9",
            url: "https://s1.ticketm.net/dbimages/16603v.jpg",
            width: 205,
            height: 115,
            fallback: false,
          },
        ],
      },
    ],
  },
  info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

const eventDatesSimple = eventMockSimple.dates;

const eventMockAddress = eventMockSimple._embedded.venues[0];

const eventMockClassifications = eventMockSimple.classifications;

export {
  eventMockSimple,
  eventDatesSimple,
  eventMockAddress,
  eventMockClassifications,
};
