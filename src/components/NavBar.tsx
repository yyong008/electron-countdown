export function NavBar() {
  const handleClose = async () => {
    await window.ipcRenderer.invoke('system-window-close');
  }
  const handleMinimize = async () => {
    await window.ipcRenderer.invoke('system-window-small');
  }
  return (
    <div id="timer-title" className="flex items-center h-[14px">
      <span>
        <span id="close" onClick={handleClose}>×</span>
        <span id="small" onClick={handleMinimize}>-</span>
      </span>
      <span className="text-[14px] text-slate-900">CountDown</span>
    </div>
  );
}
