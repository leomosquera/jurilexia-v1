import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";

type Props = {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
};

export function PageHeader({ title, breadcrumb, actions }: Props) {
  return (
    <div className="w-full space-y-4">
      {breadcrumb && <Breadcrumb items={breadcrumb} />}

      <div className="flex w-full items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            {title}
          </h1>
        </div>

        {actions && (
          <div className="shrink-0 flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

    </div>
  );
}