import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
export function since(date: Date)
{
    return dayjs(date).from(dayjs());
}