import useTimer from "easytimer-react-hook";
import { useEffect } from "react";

type CountDownProps = {
  time: {
    hour: number,
    minute: number,
    second: number
  };
  setStatus: (v: number) => void
}

export function CountDown(props: CountDownProps) {
  const { time } = props;
  const [timer, isTargetAchieved] = useTimer({
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    timer.start({
      countdown: true,
      startValues: {
        hours: time.hour,
        minutes: time.minute,
        seconds: time.second,
      },
      target: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    });
  }, [time.hour, time.minute, time.second, timer]);

  useEffect(() => {
    if (isTargetAchieved) {
      timer.stop();
      props.setStatus(2);
      window.ipcRenderer.invoke('notification-countdown-completed')
    }
  }, [isTargetAchieved, props, timer]);
  return (
    <div className="flex justify-center items-center h-[60px] text-[24px] py-[20px] bg-green-300">
      {timer.getTimeValues().toString()}
    </div>
  );
}
