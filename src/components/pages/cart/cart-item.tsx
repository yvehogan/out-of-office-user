"use client";

import type { CartItem as CartItemType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import QuantityControl from "./quantity";

interface Props {
  index: number;
  item: CartItemType;
  increase: () => void;
  decrease: () => void;
  remove: () => void;
}

export default function CartItem({
  index,
  item,
  increase,
  decrease,
  remove,
}: Props) {
  // Converts "Sizes:Medium, Colours:Green" → [{ label: "Sizes", value: "Medium" }, { label: "Colours", value: "Green" }]
  function parseSelectedOptions(selectedOptions: string) {
    if (!selectedOptions) return [];
    return selectedOptions.split(",").map((opt) => {
      const [label, value] = opt.trim().split(":");
      return { label, value };
    });
  }

  return (
    <tr className="bg-[#EDF1F680] rounded-xl whitespace-nowrap">
      <td className="rounded-tl-[40px] rounded-bl-[40px] p-4 text-brand-purple2 text-sm  font-unageo">
        {String(index + 1).padStart(2, "0")}
      </td>

      <td className=" p-4 text-brand-purple2 text-sm  font-unageo">
        {item.productName}
      </td>

      <td className=" p-4 text-brand-purple2 text-sm  font-unageo">
        {formatCurrency(item.unitPrice)}
      </td>

      <td className="p-4 text-brand-purple2 text-sm  font-unageo">
        <div className="flex gap-2 flex-wrap">
          {item.selectedOptions
            ? parseSelectedOptions(item.selectedOptions).map(
                ({ label, value }) => (
                  <span
                    key={label}
                    className="px-2 font-light py-1 bg-[#0000000A] rounded-full text-sm"
                  >
                    {value}
                  </span>
                ),
              )
            : "-"}
        </div>
      </td>

      <td className=" p-4 text-brand-purple2 text-sm  font-unageo">
        <QuantityControl
          quantity={item.quantity}
          onIncrease={increase}
          onDecrease={decrease}
        />
      </td>

      <td className=" p-4 text-brand-purple2 text-sm  font-unageo">
        {formatCurrency(item.quantity * item.unitPrice)}
      </td>

      <td className="rounded-tr-[40px] rounded-br-[40px] p-4 text-brand-purple2 text-sm  font-unageo">
        <div className="flex gap-3">
          {/* <button className="bg-[#0000000D] cursor-pointer flex justify-center items-center rounded-[40px]  h-8  p-4">
            Edit
          </button> */}

          <button
            onClick={remove}
            className="bg-[#0000000D] cursor-pointer flex justify-center items-center rounded-[40px]  h-8  p-4"
          >
            <Trash2 size={18} color="#DA0000" />
          </button>
        </div>
      </td>
    </tr>
  );
}
