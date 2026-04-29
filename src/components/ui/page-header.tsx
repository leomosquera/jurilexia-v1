import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";

type Props = {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
};

export function PageHeader({ title, breadcrumb, actions }: Props) {
  return (
    <div className="w-full space-y-1.5">
      {breadcrumb && <Breadcrumb items={breadcrumb} />}

      <div className="flex w-full items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}