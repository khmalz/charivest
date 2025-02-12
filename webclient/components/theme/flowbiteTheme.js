export const sidebarTheme = {
   root: {
      inner: "h-full overflow-y-auto overflow-x-hidden rounded shadow-lg dark:shadow-slate-900 px-3 py-4 bg-slate-200 dark:!bg-dashboardprimary",
   },
};

export const datepickerTheme = {
   popup: {
      footer: {
         button: {
            today: "bg-primary text-white hover:bg-blue-900 dark:bg-cyan-600 dark:hover:bg-primary",
         },
      },
   },
   views: {
      days: {
         items: {
            item: {
               disabled: "!text-gray-500",
            },
         },
      },
   },
};

export const progressTheme = {
   label: "mb-1 flex justify-between font-medium dark:text-slate-200 text-slate-900",
   bar: "space-x-2 rounded-full text-center font-medium leading-none text-cyan-200 dark:text-cyan-100",
};

const baseCellStyle = {
   body: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
   head: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg",
};

export const tableThemeClient = {
   body: {
      cell: {
         base: `${baseCellStyle.body} dark:bg-slate-700`,
      },
   },
   head: {
      cell: {
         base: `${baseCellStyle.head} dark:bg-gray-600`,
      },
   },
};

export const tableThemeDashboard = {
   body: {
      cell: {
         base: baseCellStyle.body,
      },
   },
   head: {
      cell: {
         base: `${baseCellStyle.head} dark:bg-transparent`,
      },
   },
};

const baseCardStyle = {
   base: "flex flex-row rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 w-full",
   children: "flex h-full flex-col justify-start gap-4 p-6",
};

export const cardThemeDashboard = {
   root: {
      base: `${baseCardStyle.base} md:max-w-md`,
      children: baseCardStyle.children,
   },
};

export const cardThemeClient = {
   root: {
      base: baseCardStyle.base,
      children: baseCardStyle.children,
   },
};
