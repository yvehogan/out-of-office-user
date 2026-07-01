function CartRowSkeleton() {
  return (
    <tr className="bg-[#EDF1F680] animate-pulse">
      <td className="rounded-tl-[40px] rounded-bl-[40px] p-4">
        <div className="h-4 w-6 bg-black/10 rounded-full" />
      </td>

      <td className="p-4">
        <div className="h-4 w-32 bg-black/10 rounded-full" />
      </td>

      <td className="p-4">
        <div className="h-4 w-16 bg-black/10 rounded-full" />
      </td>

      <td className="p-4">
        <div className="flex gap-2">
          <div className="h-6 w-14 bg-black/10 rounded-full" />
          <div className="h-6 w-14 bg-black/10 rounded-full" />
        </div>
      </td>

      <td className="p-4">
        <div className="h-8 w-24 bg-black/10 rounded-full" />
      </td>

      <td className="p-4">
        <div className="h-4 w-16 bg-black/10 rounded-full" />
      </td>

      <td className="rounded-tr-[40px] rounded-br-[40px] p-4">
        <div className="h-8 w-8 bg-black/10 rounded-[40px]" />
      </td>
    </tr>
  );
}

interface CartTableSkeletonProps {
  rows?: number;
}

export function CartTableSkeleton({ rows = 3 }: CartTableSkeletonProps) {
  return (
    <div className="overflow-x-auto w-full">
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
          {Array.from({ length: rows }).map((_, i) => (
            <CartRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
