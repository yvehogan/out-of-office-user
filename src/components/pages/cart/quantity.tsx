import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="flex gap-2  items-center w-fit rounded-[40px] py-1 px-2 border border-[#21015F6B] overflow-hidden">
      <button
        onClick={onDecrease}
        className="p-1 rounded-[40px] cursor-pointer bg-[#0000000D] h-5.5 w-5.5 flex items-center justify-center"
      >
        <ChevronLeft size={15} />
      </button>

      <span className="text-center text-brand-purple2 text-sm font-semibold">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="p-1 rounded-[40px] cursor-pointer bg-[#0000000D] h-5.5 w-5.5 flex items-center justify-center"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
