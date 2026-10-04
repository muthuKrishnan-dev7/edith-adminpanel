import { useMemo, useState } from "react";
import {
  IconPackages,
  IconAlertCircle,
  IconBox,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconClock,
  IconCreditCard,
  IconFilter,
  IconPackage,
  IconRefresh,
  IconSearch,
  IconTruck,
  IconX,
} from "@tabler/icons-react";

/* ============================================================
   MOCK DATA
   Replace this with API data later.
   ============================================================ */

const ORDERS = [
  {
    id: "ORD-2026-SZ72LB",
    customerName: "Sakthi Manikandan",
    total: 65,
    orderStatus: "confirmed",
    paymentStatus: "pending",
    whatsappStatus: "not-sent",
  },
  {
    id: "ORD-2026-PMUVNQ",
    customerName: "Balaji R",
    total: 38,
    orderStatus: "delivered",
    paymentStatus: "paid",
    whatsappStatus: "not-sent",
  },
  {
    id: "ORD-2026-UPGGLL",
    customerName: "Balaji R",
    total: 69,
    orderStatus: "placed",
    paymentStatus: "pending",
    whatsappStatus: "not-sent",
  },
  {
    id: "ORD-2026-KL82PQ",
    customerName: "Arun Kumar",
    total: 120,
    orderStatus: "packed",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
  {
    id: "ORD-2026-TR91MX",
    customerName: "Priya S",
    total: 89,
    orderStatus: "shipped",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
  {
    id: "ORD-2026-HJ72KL",
    customerName: "Vignesh M",
    total: 245,
    orderStatus: "confirmed",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
  {
    id: "ORD-2026-BN62QA",
    customerName: "Divya R",
    total: 54,
    orderStatus: "placed",
    paymentStatus: "pending",
    whatsappStatus: "not-sent",
  },
  {
    id: "ORD-2026-WE83TR",
    customerName: "Karthik S",
    total: 150,
    orderStatus: "delivered",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
  {
    id: "ORD-2026-QP42YU",
    customerName: "Hari Prasad",
    total: 75,
    orderStatus: "failed",
    paymentStatus: "failed",
    whatsappStatus: "not-sent",
  },
  {
    id: "ORD-2026-ZX81CV",
    customerName: "Meena K",
    total: 92,
    orderStatus: "packed",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
  {
    id: "ORD-2026-RT52NM",
    customerName: "Suresh B",
    total: 48,
    orderStatus: "confirmed",
    paymentStatus: "pending",
    whatsappStatus: "not-sent",
  },
  {
    id: "ORD-2026-YU73PL",
    customerName: "Naveen Kumar",
    total: 180,
    orderStatus: "shipped",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
  {
    id: "ORD-2026-AS64DF",
    customerName: "Keerthana S",
    total: 66,
    orderStatus: "delivered",
    paymentStatus: "paid",
    whatsappStatus: "sent",
  },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function Orders() {
  const [orders] = useState(ORDERS);

  const [searchOrder, setSearchOrder] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [showFilters, setShowFilters] = useState(true);
  const [visibleOrders, setVisibleOrders] = useState(7);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesOrder = order.id
        .toLowerCase()
        .includes(searchOrder.toLowerCase());

      const matchesCustomer = order.customerName
        .toLowerCase()
        .includes(searchCustomer.toLowerCase());

      const matchesOrderStatus =
        !orderStatus || order.orderStatus === orderStatus;

      const matchesPaymentStatus =
        !paymentStatus || order.paymentStatus === paymentStatus;

      return (
        matchesOrder &&
        matchesCustomer &&
        matchesOrderStatus &&
        matchesPaymentStatus
      );
    });
  }, [orders, searchOrder, searchCustomer, orderStatus, paymentStatus]);

  const displayedOrders = filteredOrders.slice(0, visibleOrders);

  const hasMoreOrders = visibleOrders < filteredOrders.length;

  const handleShowMore = () => {
    setVisibleOrders((current) => current + 7);
  };

  const handleRefresh = () => {
    // Connect your API refetch logic here.
    setVisibleOrders(7);
  };

  const handleClearFilters = () => {
    setSearchOrder("");
    setSearchCustomer("");
    setOrderStatus("");
    setPaymentStatus("");
    setVisibleOrders(7);
  };

  const hasActiveFilters =
    searchOrder || searchCustomer || orderStatus || paymentStatus;

  return (
    <div className="w-full">
      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Orders Management
          </h1>

          <p className="mt-1 text-xs text-white sm:text-sm">
            Track and manage all customer orders
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:self-auto"
        >
          <IconRefresh size={16} stroke={1.8} />
          Refresh
        </button>
      </div>

      {/* ======================================================
          ORDER STATISTICS
          ====================================================== */}

      <OrderStatistics orders={orders} />

      {/* ======================================================
          FILTERS
          ====================================================== */}

      <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setShowFilters((current) => !current)}
          className="flex w-full items-center justify-between bg-gradient-to-r from-amber-50 via-lime-50 to-emerald-50 px-4 py-3.5 text-left transition hover:brightness-[0.99] sm:px-5"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-slate-700">
              <IconFilter size={17} stroke={1.8} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">Filters</p>

              {hasActiveFilters && (
                <p className="text-[10px] text-slate-500">
                  Active filters applied
                </p>
              )}
            </div>
          </div>

          {showFilters ? (
            <IconChevronUp size={18} className="text-slate-500" />
          ) : (
            <IconChevronDown size={18} className="text-slate-500" />
          )}
        </button>

        {showFilters && (
          <div className="border-t border-slate-100 p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SearchField
                label="Order Number"
                placeholder="Search order"
                value={searchOrder}
                onChange={setSearchOrder}
              />

              <SearchField
                label="Customer Name"
                placeholder="Search customer"
                value={searchCustomer}
                onChange={setSearchCustomer}
              />

              <SelectField
                label="Order Status"
                value={orderStatus}
                onChange={setOrderStatus}
                options={[
                  {
                    value: "",
                    label: "All Statuses",
                  },
                  {
                    value: "placed",
                    label: "Placed",
                  },
                  {
                    value: "confirmed",
                    label: "Confirmed",
                  },
                  {
                    value: "packed",
                    label: "Packed",
                  },
                  {
                    value: "shipped",
                    label: "Shipped",
                  },
                  {
                    value: "delivered",
                    label: "Delivered",
                  },
                  {
                    value: "failed",
                    label: "Failed",
                  },
                ]}
              />

              <SelectField
                label="Payment Status"
                value={paymentStatus}
                onChange={setPaymentStatus}
                options={[
                  {
                    value: "",
                    label: "All Payments",
                  },
                  {
                    value: "paid",
                    label: "Paid",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },
                  {
                    value: "failed",
                    label: "Failed",
                  },
                ]}
              />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-800"
                >
                  <IconX size={14} />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ======================================================
          ORDERS TABLE
          ====================================================== */}

      <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Orders</h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Showing {displayedOrders.length} of {filteredOrders.length} orders
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <TableHeading>Order No</TableHeading>
                <TableHeading>Customer</TableHeading>
                <TableHeading>Total</TableHeading>
                <TableHeading>Order Status</TableHeading>
                <TableHeading>Payment</TableHeading>
                <TableHeading>WhatsApp</TableHeading>
                <TableHeading align="right">Actions</TableHeading>
              </tr>
            </thead>

            <tbody>
              {displayedOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Orders */}
        <div className="divide-y divide-slate-100 md:hidden">
          {displayedOrders.map((order) => (
            <MobileOrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Empty State */}
        {displayedOrders.length === 0 && <EmptyOrders />}

        {/* Show More */}
        {hasMoreOrders && (
          <div className="border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={handleShowMore}
              className="mx-auto flex h-10 w-full max-w-xs items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Show More
              <IconChevronDown size={16} />
            </button>
          </div>
        )}

        {/* All Orders Loaded */}
        {!hasMoreOrders && filteredOrders.length > 7 && (
          <div className="border-t border-slate-100 px-4 py-4 text-center text-xs text-slate-400">
            All orders are displayed
          </div>
        )}
      </section>
    </div>
  );
}

/* ============================================================
   ORDER STATISTICS
   ============================================================ */

function OrderStatistics({ orders }) {
  const statistics = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: IconPackage,
      iconClass: "text-emerald-600",
      valueClass: "text-slate-900",
    },
    {
      label: "Placed",
      value: countOrders(orders, "orderStatus", "placed"),
      icon: IconClock,
      iconClass: "text-blue-600",
      valueClass: "text-blue-600",
    },
    {
      label: "Confirmed",
      value: countOrders(orders, "orderStatus", "confirmed"),
      icon: IconCircleCheck,
      iconClass: "text-violet-600",
      valueClass: "text-violet-600",
    },
    {
      label: "Packed",
      value: countOrders(orders, "orderStatus", "packed"),
      icon: IconBox,
      iconClass: "text-indigo-600",
      valueClass: "text-indigo-600",
    },
    {
      label: "Shipped",
      value: countOrders(orders, "orderStatus", "shipped"),
      icon: IconTruck,
      iconClass: "text-cyan-600",
      valueClass: "text-cyan-600",
    },
    {
      label: "Delivered",
      value: countOrders(orders, "orderStatus", "delivered"),
      icon: IconCheck,
      iconClass: "text-emerald-600",
      valueClass: "text-emerald-600",
    },
    {
      label: "Paid",
      value: countOrders(orders, "paymentStatus", "paid"),
      icon: IconCreditCard,
      iconClass: "text-green-600",
      valueClass: "text-green-600",
    },
    {
      label: "Pending",
      value: countOrders(orders, "paymentStatus", "pending"),
      icon: IconClock,
      iconClass: "text-amber-600",
      valueClass: "text-amber-600",
    },
    {
      label: "Failed",
      value:
        countOrders(orders, "orderStatus", "failed") +
        countOrders(orders, "paymentStatus", "failed"),
      icon: IconAlertCircle,
      iconClass: "text-red-600",
      valueClass: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
      {statistics.map((statistic) => {
        const Icon = statistic.icon;

        return (
          <div
            key={statistic.label}
            className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Icon size={17} stroke={1.8} className={statistic.iconClass} />

              <span className="truncate text-xs font-medium text-slate-500">
                {statistic.label}
              </span>
            </div>

            <p className={`mt-2 text-xl font-bold ${statistic.valueClass}`}>
              {statistic.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   DESKTOP ORDER ROW
   ============================================================ */

function OrderRow({ order }) {
  return (
    <tr className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/60">
      <td className="px-5 py-4">
        <span className="text-xs font-semibold text-slate-800">{order.id}</span>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs font-medium text-slate-700">
          {order.customerName}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs font-semibold text-slate-800">
          ₹{order.total}
        </span>
      </td>

      <td className="px-5 py-4">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      <td className="px-5 py-4">
        <PaymentStatusBadge status={order.paymentStatus} />
      </td>

      <td className="px-5 py-4">
        <WhatsAppStatus status={order.whatsappStatus} />
      </td>

      <td className="px-5 py-4 text-right">
        <button
          type="button"
          className="h-9 rounded-lg border border-orange-200 bg-orange-50 px-4 text-xs font-medium text-orange-600 transition hover:border-orange-300 hover:bg-orange-100"
        >
          View
        </button>
      </td>
    </tr>
  );
}

/* ============================================================
   MOBILE ORDER CARD
   ============================================================ */

function MobileOrderCard({ order }) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-800">{order.id}</p>

          <p className="mt-1 text-xs text-slate-500">{order.customerName}</p>
        </div>

        <p className="text-sm font-bold text-slate-900">₹{order.total}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <OrderStatusBadge status={order.orderStatus} />

        <PaymentStatusBadge status={order.paymentStatus} />

        <WhatsAppStatus status={order.whatsappStatus} />
      </div>

      <button
        type="button"
        className="mt-4 h-9 w-full rounded-lg border border-orange-200 bg-orange-50 text-xs font-medium text-orange-600 transition hover:bg-orange-100"
      >
        View Order
      </button>
    </div>
  );
}

/* ============================================================
   STATUS BADGES
   ============================================================ */

function OrderStatusBadge({ status }) {
  const statusStyles = {
    placed: "bg-amber-50 text-amber-700",
    confirmed: "bg-violet-50 text-violet-700",
    packed: "bg-indigo-50 text-indigo-700",
    shipped: "bg-cyan-50 text-cyan-700",
    delivered: "bg-emerald-50 text-emerald-700",
    failed: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
        statusStyles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function PaymentStatusBadge({ status }) {
  const statusStyles = {
    paid: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    failed: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
        statusStyles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function WhatsAppStatus({ status }) {
  const isSent = status === "sent";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isSent
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {isSent ? "Sent" : "Not Sent"}
    </span>
  );
}

/* ============================================================
   SEARCH FIELD
   ============================================================ */

function SearchField({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <IconSearch
          size={16}
          stroke={1.8}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>
    </div>
  );
}

/* ============================================================
   SELECT FIELD
   ============================================================ */

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <IconChevronDown
          size={16}
          stroke={1.8}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

/* ============================================================
   TABLE HEADING
   ============================================================ */

function TableHeading({ children, align = "left" }) {
  return (
    <th
      className={`px-5 py-3 text-${align} text-[10px] font-semibold uppercase tracking-wider text-slate-500`}
    >
      {children}
    </th>
  );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <IconSearch size={21} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-800">
        No orders found
      </h3>

      <p className="mt-1 max-w-sm text-xs text-slate-400">
        Try changing your search or filter criteria.
      </p>
    </div>
  );
}

/* ============================================================
   HELPERS
   ============================================================ */

function countOrders(orders, field, value) {
  return orders.filter((order) => order[field] === value).length;
}
