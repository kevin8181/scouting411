export type UrlShaped = `${"http" | "https"}://${string}`;

/** a predicate function that takes an item and returns a boolean */
export type Predicate<T> = (item: T) => boolean;
