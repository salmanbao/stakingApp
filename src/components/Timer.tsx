import useCountdown from "../hooks/useCountdown";

export default function Timer({ targetDate }: { targetDate: number }) {
  const { hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <>
      {hours}h {minutes}m {seconds}s
    </>
  );
}
