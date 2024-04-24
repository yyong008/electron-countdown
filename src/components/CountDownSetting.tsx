import { useState } from "react";

const hour = Array(24)
  .fill(0)
  .map((_, i) => i);
const min = Array(60)
  .fill(0)
  .map((_, i) => i);
const sec = Array(60)
  .fill(0)
  .map((_, i) => i);

type CountDownSettingProps = {
  setTime: ({
    hour,
    minute,
    second,
  }: {
    hour: number;
    minute: number;
    second: number;
  }) => void;
  status: number,
  setStatus: (v: number) => void;
};

export function CountDownSetting(props: CountDownSettingProps) {
  const [data, setDate] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const padZero = (h: number) => {
    if (typeof h !== "number") {
      return h;
    }

    return String(h).length == 1 ? `0${h}` : h.toString();
  };

  const start = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!data.hour && !data.minute && !data.second) {
      return alert("请输入倒计时起始时间");
    }

    props.setStatus(1);

    props.setTime({
      hour: data.hour,
      minute: data.minute,
      second: data.second,
    });
  };

  return (
    <form>
      <div id="timer-container" className="p-[20px]">
        <div className="flex">
          <select
            name="hour"
            className="text-[16px] bg-red-500 rounded-lg text-white"
            onChange={(v) => {
              setDate({
                ...data,
                hour: Number(v.target.value),
              });
            }}
          >
            {hour.map((h) => {
              return (
                <option className="text-[16px]" value={h}>
                  {padZero(h)}
                </option>
              );
            })}
          </select>
          <span className="text-[14px] mx-[6px]">时</span>
        </div>

        <select
          name="minute"
          className="text-[16px] bg-yellow-500 rounded-lg text-white"
          onChange={(v) => {
            setDate({
              ...data,
              minute: Number(v.target.value),
            });
          }}
        >
          {min.map((h) => {
            return (
              <option className="text-[16px]" value={h}>
                {padZero(h)}
              </option>
            );
          })}
        </select>
        <span className="text-[14px] mx-[6px]">分</span>
        <select
          name="second"
          className="text-[16px] bg-green-500 rounded-lg text-white"
          onChange={(v) => {
            setDate({
              ...data,
              second: Number(v.target.value),
            });
          }}
        >
          {sec.map((h) => {
            return (
              <option className="text-[16px]" value={h}>
                {padZero(h)}
              </option>
            );
          })}
        </select>
        <span className="text-[14px] mx-[6px]">秒</span>
        <div className="flex">
          <button
            type="submit"
            onClick={start}
            className="text-[14px] bg-sky-500 px-[8px] rounded-lg text-white hover:bg-yellow-500"
          >
            开始
          </button>
        </div>
      </div>
    </form>
  );
}
