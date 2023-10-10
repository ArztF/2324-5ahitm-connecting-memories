import dayjs from "dayjs";
import de from "dayjs/locale/de";

export function formatDate(startdate, enddate) {
    if (enddate == startdate || enddate == null) {
      dayjs.locale(de);
      const date = dayjs(startdate);
      return date.format("dddd, DD. MMMM YYYY");
    } else {
      dayjs.locale(de);
      const start = dayjs(startdate);
      const end = dayjs(enddate);
      return start.format("DD.") + " - " + end.format("DD. MMMM YYYY");
    }
  }