import * as moment from 'moment';

const FORMAT_STRING = 'YYYY-MM-DD HH:mm';

export const format = (value: moment.MomentInput) => moment(value).format(FORMAT_STRING);
export const current = () => format(new Date());