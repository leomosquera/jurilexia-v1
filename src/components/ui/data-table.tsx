import type { ReactNode } from "react";

export type TableAlign = "left" | "right" | "center";

export type TableColumn<T> = {
  key: string;
  header: string;
  render: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  className?: string;
};

export type DataTableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  caption?: string;
  emptyState?: ReactNode;
};

const alignClass: Record<TableAlign, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function DataTable<T,>({
  columns,
  rows,
  getRowKey,
  caption,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption != null && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500 ${alignClass[col.align ?? "left"]} ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-sm text-gray-500"
              >
                {emptyState ?? "No data"}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-gray-200 transition-colors duration-100 last:border-0 hover:bg-gray-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-2 text-sm text-gray-900 ${alignClass[col.align ?? "left"]} ${col.className ?? ""}`}
                  >
                    {col.render(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
