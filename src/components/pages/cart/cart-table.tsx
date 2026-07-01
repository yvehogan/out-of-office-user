import { CartItem } from "@/lib/types";
import CartItemComponent from "./cart-item";

interface Props {
  cart: CartItem[];
  increase: (id: string, quantity: number) => void;
  decrease: (id: string, quantity: number) => void;
  remove: (id: string) => void;
}

export default function CartTable({ cart, increase, decrease, remove }: Props) {
  return (
    <div className="overflow-x-auto w-full ">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr className="bg-[#EDF1F6]  text-left">
            <th className="rounded-tl-[40px] rounded-bl-[40px] p-4 text-brand-purple2 text-sm font-medium font-unageo">
              SN
            </th>
            <th className="p-4 text-brand-purple2 text-sm font-medium font-unageo">
              Product
            </th>
            <th className="p-4 text-brand-purple2 text-sm font-medium font-unageo">
              Price
            </th>
            <th className="p-4 text-brand-purple2 text-sm font-medium font-unageo">
              Options
            </th>
            <th className="p-4 text-brand-purple2 text-sm font-medium font-unageo">
              Quantity
            </th>
            <th className="p-4 text-brand-purple2 text-sm font-medium font-unageo">
              Subtotal
            </th>
            <th className="rounded-tr-[40px] text-center rounded-br-[40px] p-4 text-brand-purple2 text-sm font-medium font-unageo">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-8 font-cormorant py-20  text-center text-brand-purple2 text-3xl"
              >
                Your cart is empty
              </td>
            </tr>
          ) : (
            cart.map((item, index) => (
              <CartItemComponent
                key={item.id}
                index={index}
                item={item}
                increase={() => increase(item.id, item.quantity)}
                decrease={() => decrease(item.id, item.quantity)}
                remove={() => remove(item.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
