import { ServiceItem, Testimonial } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'cidesco-signature',
    name: 'CIDESCO Eksklusiivne Signatuurhoolitsus',
    duration: '75 min',
    price: 85,
    description: 'Carine Salongi signatuurne näohoolitsus, mis kohandatakse vastavalt kliendi naha morfoloogiale. Sisaldab sügavpuhastust, taimsete ensüümide koorimist, lümfiringet turgutavat massaaži ja luksuslikku toimeainekokteili.',
    benefits: [
      'Süvitsi niisutatud ja hapnikuga rikastatud nahk',
      'Taastunud sära ja siidine tekstuur',
      'Pinguldav ja peeneid jooni siluv efekt'
    ],
    recommendedFor: 'Kõikidele nahatüüpidele, mis vajavad kohest revitaliseerimist ja sügavat hoolitsust.',
    category: 'facials'
  },
  {
    id: 'deep-cleanup',
    name: 'Sügavpuhastav Bio-Aktiivne Hoolitsus',
    duration: '60 min',
    price: 65,
    description: 'Tõhus turgutus kombineeritud ja probleemsele nahale. Kasutatakse ultraheli ja bioloogilisi koorijaid, et eemaldada komedoonid, tasakaalustada rasueritust ja ahendada poore ilma mehaanilise ärrituseta.',
    benefits: [
      'Puhas, tasakaalustatud ja matt nahk',
      'Põletikuliste kollete ja punetuse leevendamine',
      'Pooride märgatav ahenemine'
    ],
    recommendedFor: 'Rasusele, aknele kalduvale või ummistunud nahale.',
    category: 'facials'
  },
  {
    id: 'hyaluronic-infusion',
    name: 'Mitmestastmeline Hüdro-Infusioon',
    duration: '60 min',
    price: 70,
    description: 'Intensiivne niisutusteraapia, mis viib naha sügavamatesse kihtidesse erineva molekulaarkaaluga hüaluroonhapet ja aminohappeid. Ideaalne kuiva ja stressis naha kiireks elustamiseks.',
    benefits: [
      'Naha mahlakuse ja elastsuse kiire taastumine',
      'Dehüdratsioonist tingitud kortsukeste kadumine',
      'Tugevdatud naha kaitsebarjäär'
    ],
    recommendedFor: 'Tuhmile, elutule ja tugevalt kuivale nahale.',
    category: 'facials'
  },
  {
    id: 'gold-retinol',
    name: 'Kolloidhõbeda ja Retinooli Kollageeniteraapia',
    duration: '90 min',
    price: 110,
    description: 'Premium-klassi vananemisvastane teraapia. Kombineerib retinooli, unikaalsed peptiidid ja kolloidkulla antioksüdantsed omadused. Stimuleerib tugevalt kollageeni tootmist ja taastab naha noorusliku täidluse.',
    benefits: [
      'Võimas tõstev ja näokontuuri modelleeriv toime',
      'Märgatav kortsude sügavuse vähenemine',
      'Naha struktuuri ja tooni ühtlustumine'
    ],
    recommendedFor: 'Küpsele nahale, mis vajab tugevamat noorendavat ja trimmivat lisatõuget.',
    category: 'body' // map to body category or keep category name clear in UI (trimmivad hoolitsused)
  },
  {
    id: 'myolifting',
    name: 'Mükolifting & Plastitseeriv Skulpturaal-massaaž',
    duration: '60 min',
    price: 75,
    description: 'Manuaalne skulptureeriv näomassaaž, mis treenib näolihaseid ning parandab mikrotsirkulatsiooni. Mõjub kui looduslik ja täiesti ohutu näolihaste tõstmine, mida kroonib naha modelleeriv mask.',
    benefits: [
      'Tõstetud ja selgemad põsesarnad ja lõuajoon',
      'Tursete ja tumedate silmaaluste kiire vähenemine',
      'Lihaspingete ja stressi vabanemine näo piirkonnas'
    ],
    recommendedFor: 'Väsinud ilmega näole, mille toonus on langenud.',
    category: 'body'
  },
  {
    id: 'festive-makeup',
    name: 'Pidulik Pidupäeva Jumestus',
    duration: '60 min',
    price: 55,
    description: 'Eksklusiivne jumestus erisündmusteks, pulmadeks või vastuvõttudeks. Lähtub kliendi näo anatoomiast ja proportsioonidest, sündmuse valgustingimustest ning isikupärast.',
    benefits: [
      'Kauakestev ja veatu jumestus terveks päevaks ja ööks',
      'Parimate profibrändide ohutu ja luksuslik kosmeetika',
      'Individuaalne värvinõustamine'
    ],
    recommendedFor: 'Kõigile, kes soovivad erilisel sündmusel särada.',
    category: 'makeup'
  },
  {
    id: 'photo-makeup',
    name: 'Foto- ja Grimmikunsti Jumestus',
    duration: '75 min',
    price: 70,
    description: 'Spetsiaalselt fototehnika ja kaamera jaoks viimistletud jumestus, sealhulgas vajadusel delikaatne grimm. Põhineb Tiiu Luhti Grimmikooli klassikalistel tehnikatel, et tagada täiuslik hajutatus ja valguse peegeldus.',
    benefits: [
      'Kaamerasilmale kohandatud sügavus ja viimistlus',
      'Kontuurimine, mis rõhutab väärikalt ilu joonistamiskunsti reeglite kohaselt',
      'Väga vastupidav ja matt lõpptulemus'
    ],
    recommendedFor: 'Portree- ja perepildistamisteks, videovõteteks või moeüritusteks.',
    category: 'makeup'
  },
  {
    id: 'skin-consultation',
    name: 'Professionaalne Nahaanalüüs & Tootesoovitus',
    duration: '40 min',
    price: 35,
    description: 'Põhjalik konsultatsioon, kus hinnatakse naha barjääri tugevust, hüdratatsiooni, tundlikkust ja pH suundumusi. Valmib individuaalne tegevuskava ja kodune hooldusrutiin. (Hoolitsuse broneerimisel tasuta!).',
    benefits: [
      'Selge ülevaade oma tegelikust nahatüübist ja vajadustest',
      'Väldi valede toodetega tekitatud kahjustusi ja säästa raha',
      'Personaalsed ja tõenduspõhised iluteenuste soovitused'
    ],
    recommendedFor: 'Kõigile, kes pole kindlad oma praeguses hooldusrutiinis või soovivad nahamuresid lahendada teadlikult.',
    category: 'consultation'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Mari-Liis Tamm',
    role: 'Püsiklient alates 2018',
    content: 'Karine juures käimine on nagu luksuslik teraapia kehale ja vaimule. Tema CIDESCO teaduslik ja väga põhjalik lähenemine on päästnud minu stressis naha. Tõeline professionaal, keda usaldan pimesi!',
    rating: 5,
    date: 'Mai 2026'
  },
  {
    id: 'test-2',
    author: 'Evelin Kask',
    role: 'Piduliku meigi tellija',
    content: 'Tema tehtud fotomeik on lihtsalt meistriklass. Karine joonistusalane taust paistab välja igas pintslitõmbes – ta tõepoolest voolib ja rõhutab näo loomulikku ilu. Tulemus säilis imelisena hommikuni.',
    rating: 5,
    date: 'Juuni 2026'
  },
  {
    id: 'test-3',
    author: 'Kristiina Pärn',
    role: 'Ennetava hoolitsuse klient',
    content: 'Uskumatu salongikogemus. Nii esteetiline, puhas ja peen atmosfäär. Karine pedagoogiline taust selgitab asju arusaadavas keeles – ta mitte ainult ei hoolda nahka, vaid õpetab meid seda hoidma.',
    rating: 5,
    date: 'Aprill 2026'
  }
];

export const BRANDS = [
  { name: 'Mary Cohr', description: 'Prantsusmaa tipptasemel aroomiteraapiline kosmeetika, mis ühendab loodusjõud teadusega.' },
  { name: 'Guinot', description: 'Rahvusvaheliselt tunnustatud nahahooldusrubriik, rakulise uuenemise pioneer.' },
  { name: 'Biologique Recherche', description: 'Kohandatud, kliinilised ja tugevalt aktiivsed hooldused absoluutse tulemuse suunal.' },
  { name: 'Jane Iredale', description: 'Premium puhtad mineraalmeigitooted, mis hooldavad nahka ka jumestuse ajal.' }
];

export const EXPERIENCE_TIMELINE = [
  {
    year: '1997',
    title: 'Carine Salongi asutamine',
    description: 'Karine asutas Carine Salongi, pakkudes personaalset iluteenust, mis põhineb kliendikesksel lähenemisel.'
  },
  {
    year: '2001',
    title: 'CIDESCO Rahvusvaheline Diplom',
    description: 'Lõpetas Eesti Esimese Erakosmeetikakooli CIDESCO rahvusvahelise lennu. Diplom väljastatud Zürichis, Šveitsis.'
  },
  {
    year: '2005–2015',
    title: 'Kutsepedagoogika & Kunstid',
    description: 'Omandas Tallinna Ülikoolis kutsepedagoogika kraadi ja läbis Eesti Kunstiakadeemia joonistamise akadeemilised õpingud.'
  },
  {
    year: '2018',
    title: 'ERKÜ Juhatus ja Kutseeksamid',
    description: 'Kuulunud ERKÜ juhatusse ning Eesti Esimese Erakosmeetikakooli riikliku kutseeksami komisjoni.'
  },
  {
    year: 'Täna',
    title: 'Pidev areng ja Kongressid',
    description: 'Võtab osa rahvusvahelistest juhtivatest ilukongressidest nagu London FACE, tuues maailmatasemel tehnikad kodumaale.'
  }
];
