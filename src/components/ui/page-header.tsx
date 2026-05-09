import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";
import { BackButton } from "@/components/ui/back-button";

type Props = {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
  back?: boolean;
};

export function PageHeader({
  title,
  breadcrumb,
  actions,
  back = false,
}: Props) {
  return (
    <div className="w-full space-y-1.5">

      {(breadcrumb || back) && (
        <div className="flex items-center gap-1.5">
          {back && <BackButton />}

          {breadcrumb && (
            <Breadcrumb items={breadcrumb} />
          )}
        </div>
      )}

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