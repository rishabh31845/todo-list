import moment from 'moment';
import { Constants } from './constants'
export const getDateTime = (timeStamp, format) => moment(timeStamp).format(format);

export const groupItemsByKey = (items, key) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);

export const sortItemsByNumbers = (items, key, order) => items.sort(
    (a, b) => order === 'DESCENDING' ? b[key] - a[key] : a[key] - b[key]
)

export const sortItemsByString = (items, key, order) => items.sort(
    (a, b) => {
        let fa = a[key].toLowerCase(),
            fb = b[key].toLowerCase();

        if (fa < fb) {
            return order === Constants.DESCENDING ? -1 : 1;
        }
        if (fa > fb) {
            return order === Constants.DESCENDING ? 1 : -1;
        }
        return 0;
    }
)

export const sortItemsByDate = (items, key, order) => items.sort(
    (a, b) => {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return order === Constants.DESCENDING ? dateB - dateA : dateA - dateB;
    }
)