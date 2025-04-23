export type Tag<T extends string> = {
	id: T;
	displayName: string;
};

export type TagCollection = {
	[T in string]: Tag<T>;
};

export type TagOf<T = TagCollection> = T[keyof T];
