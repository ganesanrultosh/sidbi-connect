interface Image {
  index: number | undefined;
  image: any | undefined;
  url?: string;
  coords: {
    latitude: number;
    longitude: number;
  } | undefined;
}
