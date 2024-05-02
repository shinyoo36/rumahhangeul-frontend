import { 
  youtube, instagram, linkedin, twitter, 
} from "../assets";

export const navLinks = [
  {
    id: "",
    title: "Beranda",
  },
  {
    id: "materi",
    title: "Materi",
  },
  {
    id: "peringkat",
    title: "Peringkat",
  },
  {
    id: "toko",
    title: "Toko",
  },
  {
    id: "profile",
    title: "",
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/stivenang",
  },
  {
    id: "social-media-2",
    icon: youtube,
    link: "https://www.youtube.com/channel/UCoKYPbx6jVOqc-cGsp7DTCQ/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/shinyooch",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/in/stiven-065047261/",
  },
];

export const courseListDefault = [
  {
    id: "1",
    namaCourse: "Vokal",
    completed: "no",
    gambarUrl: '/course/vowels1.png',
  },
  {
    id: "2",
    namaCourse: "Vokal 2",
    completed: "no",
    gambarUrl: '/course/vowels2.png',
  },
  {
    id: "3",
    namaCourse: "Konsonan",
    completed: "no",
    gambarUrl: '/course/consonants.png',
  }
];

export const courseList = [
  {
    id: "1",
    namaCourse: "Vokal",
    completed: "no",
    gambarUrl: '/course/vowels1.png',
  },
  {
    id: "2",
    namaCourse: "Vokal 2",
    completed: "no",
    gambarUrl: '/course/vowels2.png',
  },
  {
    id: "3",
    namaCourse: "Konsonan",
    completed: "no",
    gambarUrl: '/course/consonants.png',
  }
];

export const challengeListDefault = [
  {
    id: "1",
    namaChallenge: "Vokal",
    firstClear: "no",
    perfectClear: "no",
    gambarUrl: '/challenge/vowels1.png',
  },
  {
    id: "2",
    namaChallenge: "Vokal 2",
    firstClear: "no",
    perfectClear: "no",
    gambarUrl: '/challenge/vowels2.png',
  },
  {
    id: "3",
    namaChallenge: "Konsonan",
    firstClear: "no",
    perfectClear: "no",
    gambarUrl: '/challenge/consonants.png',
  }
];


export const challengeList = [
  {
    id: "1",
    namaChallenge: "Vokal",
    firstClear: "no",
    perfectClear: "no",
    gambarUrl: '/challenge/vowels1.png',
  },
  {
    id: "2",
    namaChallenge: "Vokal 2",
    firstClear: "no",
    perfectClear: "no",
    gambarUrl: '/challenge/vowels2.png',
  },
  {
    id: "3",
    namaChallenge: "Konsonan",
    firstClear: "no",
    perfectClear: "no",
    gambarUrl: '/challenge/consonants.png',
  }
];

export const vowels1 = {
  koreanCharacters: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'],
  indonesianCharacters: ['a', 'ya', 'eo', 'yeo', 'o', 'yo', 'u', 'yu', 'eu', 'i']
};

export const vowels2 = {
  koreanCharacters : ['ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ	', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'],
  indonesianCharacters : ['ae', 'yae', 'e', 'ye', 'wa', 'wae', 'oe', 'wo', 'we', 'wi', 'ui']
};

export const consonants = {
  koreanCharacters : ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ	', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
  indonesianCharacters : ['g/k', 'n', 'd/t', 'r/l', 'm', 'b/p', 's', 'ng', 'j/ch', 'ch(/t)', 'k', 't', 'p' ,'h']
};


export const shopProfileAnimalList = [];
for (let i = 1; i <= 7; i++) {
  shopProfileAnimalList.push({
    id: i.toString(),
    tipeItem: "Profil Picture",
    namaItem: `Animal ${i}`,
    valueItem: `/profile/animal${i}.jpg`,
    price : 300,
  });
}


export const shopProfileBasicList = [];
for (let i = 1; i <= 34; i++) {
  shopProfileBasicList.push({
    id: i.toString(),
    tipeItem: "Profil Picture",
    namaItem: `Basic ${i}`,
    valueItem: `/profile/basic${i}.png`,
    price : 300,
  });
}

export const shopProfileBoyList = [];
for (let i = 1; i <= 5; i++) {
  shopProfileBoyList.push({
    id: i.toString(),
    tipeItem: "Profil Picture",
    namaItem: `Boy ${i}`,
    valueItem: `/profile/boy${i}.jpg`,
    price : 300,
  });
}

export const shopProfileGirlList = [];
for (let i = 1; i <= 22; i++) {
  shopProfileGirlList.push({
    id: i.toString(),
    tipeItem: "Profil Picture",
    namaItem: `Girl ${i}`,
    valueItem: `/profile/girl${i}.jpg`,
    price : 300,
  });
}


export const shopBorderList = [
  {
    id: "1",
    tipeItem: "Profil Border",
    namaItem: "Gold",
    valueItem: 'Gold',
    price : 100,
  },
  {
    id: "2",
    tipeItem: "Profil Border",
    namaItem: "Blue",
    valueItem: 'Blue',
    price : 100,
  },
  {
    id: "3",
    tipeItem: "Profil Border",
    namaItem: "Red",
    valueItem: 'Red',
    price : 100,
  },
  {
    id: "4",
    tipeItem: "Profil Border",
    namaItem: "Green",
    valueItem: 'Green',
    price : 100,
  },
  {
    id: "5",
    tipeItem: "Profil Border",
    namaItem: "Pink",
    valueItem: 'Pink',
    price : 100,
  },
  {
    id: "6",
    tipeItem: "Profil Border",
    namaItem: "Aqua",
    valueItem: 'Aqua',
    price : 100,
  },
  {
    id: "7",
    tipeItem: "Profil Border",
    namaItem: "Brown",
    valueItem: 'Brown',
    price : 100,
  },
  {
    id: "8",
    tipeItem: "Profil Border",
    namaItem: "Aquamarine",
    valueItem: 'Aquamarine',
    price : 100,
  },
  {
    id: "9",
    tipeItem: "Profil Border",
    namaItem: "Yellow",
    valueItem: 'Yellow',
    price : 100,
  },
  {
    id: "10",
    tipeItem: "Profil Border",
    namaItem: "Indigo",
    valueItem: 'Indigo',
    price : 100,
  },
  {
    id: "11",
    tipeItem: "Profil Border",
    namaItem: "Black",
    valueItem: 'Black',
    price : 100,
  },
  {
    id: "12",
    tipeItem: "Profil Border",
    namaItem: "Silver",
    valueItem: 'Silver',
    price : 100,
  },
  {
    id: "13",
    tipeItem: "Profil Border",
    namaItem: "Royal Blue",
    valueItem: 'RoyalBlue',
    price : 100,
  },
  {
    id: "14",
    tipeItem: "Profil Border",
    namaItem: "Salmon",
    valueItem: 'Salmon',
    price : 100,
  },
  {
    id: "15",
    tipeItem: "Profil Border",
    namaItem: "Dark Blue",
    valueItem: 'DarkBlue',
    price : 100,
  },
  {
    id: "16",
    tipeItem: "Profil Border",
    namaItem: "Maroon",
    valueItem: 'Maroon',
    price : 100,
  },
  {
    id: "17",
    tipeItem: "Profil Border",
    namaItem: "Gray",
    valueItem: 'Gray',
    price : 100,
  },
  {
    id: "18",
    tipeItem: "Profil Border",
    namaItem: "Purple",
    valueItem: 'Purple',
    price : 100,
  },
  {
    id: "19",
    tipeItem: "Profil Border",
    namaItem: "Fuchsia",
    valueItem: 'Fuchsia',
    price : 100,
  },
  {
    id: "20",
    tipeItem: "Profil Border",
    namaItem: "Lime",
    valueItem: 'Lime',
    price : 100,
  },
  {
    id: "21",
    tipeItem: "Profil Border",
    namaItem: "Olive",
    valueItem: 'Olive',
    price : 100,
  },
  {
    id: "22",
    tipeItem: "Profil Border",
    namaItem: "Orange",
    valueItem: 'Orange',
    price : 100,
  },
  {
    id: "23",
    tipeItem: "Profil Border",
    namaItem: "Cyan",
    valueItem: 'Cyan',
    price : 100,
  },
  {
    id: "24",
    tipeItem: "Profil Border",
    namaItem: "Magenta",
    valueItem: 'Magenta',
    price : 100,
  },
  {
    id: "25",
    tipeItem: "Profil Border",
    namaItem: "Dark Violet",
    valueItem: 'DarkViolet',
    price : 100,
  },
  {
    id: "26",
    tipeItem: "Profil Border",
    namaItem: "Dodger Blue",
    valueItem: 'DodgerBlue',
    price : 100,
  },
  {
    id: "27",
    tipeItem: "Profil Border",
    namaItem: "Orchid",
    valueItem: 'Orchid',
    price : 100,
  },
  {
    id: "28",
    tipeItem: "Profil Border",
    namaItem: "Midnight Blue",
    valueItem: 'MidnightBlue',
    price : 100,
  },
  {
    id: "29",
    tipeItem: "Profil Border",
    namaItem: "Plum",
    valueItem: 'Plum',
    price : 100,
  },
  {
    id: "30",
    tipeItem: "Profil Border",
    namaItem: "Snow",
    valueItem: 'Snow',
    price : 100,
  },
  {
    id: "31",
    tipeItem: "Profil Border",
    namaItem: "Orchid",
    valueItem: 'Orchid',
    price : 100,
  },
  {
    id: "32",
    tipeItem: "Profil Border",
    namaItem: "Wheat",
    valueItem: 'Wheat',
    price : 100,
  },
  {
    id: "33",
    tipeItem: "Profil Border",
    namaItem: "Sienna",
    valueItem: 'Sienna',
    price : 100,
  },
];