import reset from '/reset.png'

type ResetProps = {
  setStatus: (v: number) => void;
};

export function Reset(props: ResetProps) {
  return (
    <div className="flex justify-center items-center py-[10px]">
      <button className="flex h-[40px] text-[20px]" onClick={() => {
        props.setStatus(0)
      }}>
        <img className='w-[30px]' src={reset} />
        <span>重试</span>
      </button>
    </div>
  );
}
