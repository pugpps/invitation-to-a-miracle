// data/tracks.ts

export type Track = {
  id: string;
  title: string;
  duration?: string;
  url: string;
};

export type PartLink = {
  label: string;
  url: string;
};

export type PartTrack = {
  id: string;
  title: string;
  links: PartLink[];
};

export type CategoryKey = "demo" | "accompaniment" | "parts" | "pdf";

export const demoTracks: Track[] = [
  { id: "d1", title: "01 Overture", url: "/audio/demo/01 Overture.mp3" },
  { id: "d2", title: "02 A Processional Of Hope", url: "/audio/demo/02 A Processional Of Hope.mp3" },
  { id: "d3", title: "03 Joy Arising", url: "/audio/demo/03 Joy Arising.mp3" },
  { id: "d4", title: "04 Your Light Has Come", url: "/audio/demo/04 Your Light Has Come.mp3" },
  { id: "d5", title: "05 My Soul Rejoices In The Lord", url: "/audio/demo/05 My Soul Rejoices In The Lord.mp3" },
  { id: "d6", title: "06 A Celtic Cradle Carol", url: "/audio/demo/06 A Celtic Cradle Carol.mp3" },
  { id: "d7", title: "07 Alleluia Christ Is Born", url: "/audio/demo/07 Alleluia Christ Is Born.mp3" },
  { id: "d8", title: "08 Would I Miss The Miracle", url: "/audio/demo/08 Would I Miss The Miracle.mp3" },
  { id: "d9", title: "09 A Gloria Gathering", url: "/audio/demo/09 A Gloria Gathering.mp3" },
];

export const accompanimentTracks: Track[] = [
  { id: "a2", title: "02 A Processional Of Hope (Backing Track)", url: "/audio/accompaniment/02 A Processional Of Hope (Backing Track).mp3" },
  { id: "a3", title: "03 Joy Arising (Backing Track)", url: "/audio/accompaniment/03 Joy Arising (Backing Track).mp3" },
  { id: "a4", title: "04 Your Light Has Come (Backing Track)", url: "/audio/accompaniment/04 Your Light Has Come (Backing Track).mp3" },
  { id: "a5", title: "05 My Soul Rejoices In The Lord (Backing Track)", url: "/audio/accompaniment/05 My Soul Rejoices In The Lord (Backing Track).mp3" },
  { id: "a6", title: "06 A Celtic Cradle Carol (Backing Track)", url: "/audio/accompaniment/06 A Celtic Cradle Carol (Backing Track).mp3" },
  { id: "a7", title: "07 Alleluia Christ Is Born (Backing Track)", url: "/audio/accompaniment/07 Alleluia Christ Is Born (Backing Track).mp3" },
  { id: "a8", title: "08 Would I Miss The Miracle (Backing Track)", url: "/audio/accompaniment/08 Would I Miss The Miracle (Backing Track).mp3" },
  { id: "a9", title: "09 A Gloria Gathering (Backing Track)", url: "/audio/accompaniment/09 A Gloria Gathering (Backing Track).mp3" },
];

export const partsTracks: PartTrack[] = [
  {
    id: "pt2",
    title: "02 A Processional Of Hope",
    links: [
      { label: "Soprano", url: "/audio/parts/02 A Processional Of Hope/02 A Processional Of Hope (Soprano).mp3" },
      { label: "Alto", url: "/audio/parts/02 A Processional Of Hope/02 A Processional Of Hope (Alto).mp3" },
      { label: "Tenor", url: "/audio/parts/02 A Processional Of Hope/02 A Processional Of Hope (Tenor).mp3" },
      { label: "Bass", url: "/audio/parts/02 A Processional Of Hope/02 A Processional Of Hope (Bass).mp3" },
      { label: "Piano Accomp.", url: "/audio/parts/02 A Processional Of Hope/02 A Processional Of Hope (Piano Accompaniment).mp3" },
    ],
  },
  {
    id: "pt3",
    title: "03 Joy Arising",
    links: [
      { label: "Soprano 1", url: "/audio/parts/03 Joy Arising/03 Joy Arising (Soprano 1).mp3" },
      { label: "Soprano 2", url: "/audio/parts/03 Joy Arising/03 Joy Arising (Soprano 2).mp3" },
      { label: "Alto", url: "/audio/parts/03 Joy Arising/03 Joy Arising (Alto).mp3" },
      { label: "Tenor", url: "/audio/parts/03 Joy Arising/03 Joy Arising (Tenor).mp3" },
      { label: "Bass", url: "/audio/parts/03 Joy Arising/03 Joy Arising (Bass).mp3" },
      { label: "Piano Accomp.", url: "/audio/parts/03 Joy Arising/03 Joy Arising (Piano Accompaniment).mp3" },
    ],
  },
  {
    id: "pt4",
    title: "04 Your Light Has Come",
    links: [
      { label: "Soprano 1", url: "/audio/parts/04 Your Light Has Come/04 Your Light Has Come (Soprano 1).mp3" },
      { label: "Soprano 2", url: "/audio/parts/04 Your Light Has Come/04 Your Light Has Come (Soprano 2).mp3" },
      { label: "Alto", url: "/audio/parts/04 Your Light Has Come/04 Your Light Has Come (Alto).mp3" },
      { label: "Tenor", url: "/audio/parts/04 Your Light Has Come/04 Your Light Has Come (Tenor).mp3" },
      { label: "Bass", url: "/audio/parts/04 Your Light Has Come/04 Your Light Has Come (Bass).mp3" },
      { label: "Piano Accomp.", url: "/audio/parts/04 Your Light Has Come/04 Your Light Has Come (Piano Accompaniment).mp3" },
    ],
  },
  {
    id: "pt5",
    title: "05 My Soul Rejoices In The Lord",
    links: [], // Empty array triggers the "unavailable" UI message
  },
  {
    id: "pt6",
    title: "06 A Celtic Cradle Carol",
    links: [], // Empty array triggers the "unavailable" UI message
  },
  {
    id: "pt7",
    title: "07 Alleluia Christ Is Born",
    links: [], // Empty array triggers the "unavailable" UI message
  },
  {
    id: "pt8",
    title: "08 Would I Miss The Miracle?",
    links: [
      { label: "Soprano", url: "/audio/parts/08 Would I Miss The Miracle/08 Would I Miss The Miracle (Soprano).mp3" },
      { label: "Alto", url: "/audio/parts/08 Would I Miss The Miracle/08 Would I Miss The Miracle (Alto).mp3" },
      { label: "Tenor", url: "/audio/parts/08 Would I Miss The Miracle/08 Would I Miss The Miracle (Tenor).mp3" },
      { label: "Bass", url: "/audio/parts/08 Would I Miss The Miracle/08 Would I Miss The Miracle (Bass).mp3" },
      { label: "Piano Accomp.", url: "/audio/parts/08 Would I Miss The Miracle/08 Would I Miss The Miracle (Piano Accompaniment).mp3" },
    ],
  },
  {
    id: "pt9",
    title: "09 A Gloria Gathering",
    links: [
      { label: "Soprano 1", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Soprano 1).mp3" },
      { label: "Soprano 2", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Soprano 2).mp3" },
      { label: "Alto", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Alto).mp3" },
      { label: "Tenor 1", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Tenor 1).mp3" },
      { label: "Tenor 2", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Tenor 2).mp3" },
      { label: "Bass", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Bass).mp3" },
      { label: "Descant", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Descant).mp3" },
      { label: "Piano Accomp.", url: "/audio/parts/09 A Gloria Gathering/09 A Gloria Gathering (Piano Accompaniment).mp3" },
    ],
  },
];