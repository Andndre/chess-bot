export const lastElement = <T>(array: T[]) => {
	return array[array.length - 1];
};

/**
 * from <@xxxxxxxxxx> get the xxxxxxxxxx
 */
export const getUID = (tag: string) => {
	return tag.substring(2, tag.length - 1);
};
