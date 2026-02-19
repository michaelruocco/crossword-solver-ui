interface ShortDateTimeProps {
  date: Date;
  showTime?: boolean; // optional toggle
}

const formatShortDateTimeParts = (
  date: Date,
): { date: string; time: string } => {
  return {
    date: date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
  };
};

export const ShortDateTime: React.FC<ShortDateTimeProps> = ({
  date,
  showTime = true,
}) => {
  const { date: d, time: t } = formatShortDateTimeParts(date);
  return <>{showTime ? `${d} ${t}` : d}</>;
};
