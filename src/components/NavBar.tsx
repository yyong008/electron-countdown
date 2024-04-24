export function NavBar() {
  return (
    <div id="timer-title" className="flex items-center h-[14px]">
      <span>
        <span id="close">×</span>
        <span id="small">-</span>
      </span>
      <span className="text-[14px] text-slate-900">倒计时</span>
    </div>
  );
}
