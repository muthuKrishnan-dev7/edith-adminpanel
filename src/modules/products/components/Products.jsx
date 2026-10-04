import { useMemo, useState } from "react";
import {
  IconAlertCircle,
  IconArchive,
  IconBox,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconFilter,
  IconPackage,
  IconRefresh,
  IconSearch,
  IconShoppingBag,
  IconTag,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

import EditProductForm from "./EditProductForm";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    description: "Comfortable premium cotton t-shirt for everyday wear.",
    category: "Men",
    subcategory: "T-Shirts",
    gender: "Men",
    material: "Cotton",
    price: 799,
    offerPrice: 719,
    discount: 10,
    status: "Active",
    badge: "Bestseller",
    stock: 120,
    attributeType: "Size",
    attributeValue: "M",
    imageOne:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    description: "Modern slim fit denim jeans with comfortable stretch.",
    category: "Men",
    subcategory: "Jeans",
    gender: "Men",
    material: "Denim",
    price: 1899,
    offerPrice: 1614,
    discount: 15,
    status: "Active",
    badge: "New",
    stock: 75,
    attributeType: "Size",
    attributeValue: "L",
    imageOne:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=200&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    description: "Lightweight floral dress designed for summer occasions.",
    category: "Women",
    subcategory: "Dresses",
    gender: "Women",
    material: "Rayon",
    price: 1599,
    offerPrice: 1279,
    discount: 20,
    status: "Active",
    badge: "Trending",
    stock: 45,
    attributeType: "Size",
    attributeValue: "M",
    imageOne:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=200&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    name: "Leather Casual Shoes",
    description: "Classic casual leather shoes suitable for everyday use.",
    category: "Men",
    subcategory: "Shoes",
    gender: "Men",
    material: "Leather",
    price: 2499,
    offerPrice: 2499,
    discount: 0,
    status: "Inactive",
    badge: "None",
    stock: 18,
    attributeType: "Number Size",
    attributeValue: "9",
    imageOne:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 5,
    name: "Oversized Hoodie",
    description: "Soft oversized hoodie with a relaxed everyday fit.",
    category: "Unisex",
    subcategory: "Hoodies",
    gender: "Unisex",
    material: "Fleece",
    price: 1399,
    offerPrice: 1259,
    discount: 10,
    status: "Active",
    badge: "Bestseller",
    stock: 60,
    attributeType: "Size",
    attributeValue: "XL",
    imageOne:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 6,
    name: "Classic Leather Wallet",
    description: "Compact leather wallet with multiple card compartments.",
    category: "Accessories",
    subcategory: "Wallets",
    gender: "Unisex",
    material: "Leather",
    price: 999,
    offerPrice: 949,
    discount: 5,
    status: "Inactive",
    badge: "None",
    stock: 25,
    attributeType: "Number Size",
    attributeValue: "1",
    imageOne:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80",
  },
];

const FILTER_OPTIONS = {
  category: ["All Categories", "Men", "Women", "Unisex", "Accessories"],
  subcategory: [
    "All Subcategories",
    "T-Shirts",
    "Jeans",
    "Dresses",
    "Shoes",
    "Hoodies",
    "Wallets",
  ],
  status: ["All Status", "Active", "Inactive"],
  badge: ["All Badges", "Bestseller", "New", "Trending", "None"],
};

export default function Products() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    category: "All Categories",
    subcategory: "All Subcategories",
    status: "All Status",
    badge: "All Badges",
  });

  const [showFilters, setShowFilters] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [page, setPage] = useState(1);

  const productsPerPage = 5;

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  const inactiveProducts = products.filter(
    (product) => product.status === "Inactive",
  ).length;

  const totalProductVariants = products.length * 3;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.subcategory.toLowerCase().includes(search);

      const matchesCategory =
        filters.category === "All Categories" ||
        product.category === filters.category;

      const matchesSubcategory =
        filters.subcategory === "All Subcategories" ||
        product.subcategory === filters.subcategory;

      const matchesStatus =
        filters.status === "All Status" || product.status === filters.status;

      const matchesBadge =
        filters.badge === "All Badges" || product.badge === filters.badge;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesStatus &&
        matchesBadge
      );
    });
  }, [products, searchTerm, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );

  const visibleProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage,
  );

  const activeFilterCount = Object.values(filters).filter(
    (value) => !value.startsWith("All"),
  ).length;

  const handleFilterChange = (filterName, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value,
    }));

    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      category: "All Categories",
      subcategory: "All Subcategories",
      status: "All Status",
      badge: "All Badges",
    });

    setSearchTerm("");
    setPage(1);
  };

  const handleRefresh = () => {
    console.log("Refresh products from API");
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleEditDone = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );

    setSelectedProduct(null);
  };

  const handleEditCancel = () => {
    setSelectedProduct(null);
  };

  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (selectedProduct) {
    return (
      <EditProductForm
        product={selectedProduct}
        onDone={handleEditDone}
        onCancel={handleEditCancel}
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <IconPackage size={24} stroke={2} className="text-white" />

            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Products Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-white">
            Manage your store products, pricing and availability.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <IconRefresh size={18} stroke={2} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={IconShoppingBag}
          label="Total Products"
          value={totalProducts}
        />

        <StatCard
          icon={IconCheck}
          label="Active Products"
          value={activeProducts}
          iconClassName="text-emerald-600"
          iconBackgroundClassName="bg-emerald-50"
        />

        <StatCard
          icon={IconArchive}
          label="Inactive Products"
          value={inactiveProducts}
          iconClassName="text-amber-600"
          iconBackgroundClassName="bg-amber-50"
        />

        <StatCard
          icon={IconPackage}
          label="Product Variants"
          value={totalProductVariants}
          iconClassName="text-blue-600"
          iconBackgroundClassName="bg-blue-50"
        />
      </div>

      {/* Product Management Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search / Filter Header */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <IconSearch
                size={19}
                stroke={2}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setPage(1);
                }}
                placeholder="Search products, category..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 ${
                showFilters || activeFilterCount > 0
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <IconFilter size={18} stroke={2} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-slate-900">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <FilterSelect
                  label="Category"
                  icon={IconPackage}
                  value={filters.category}
                  options={FILTER_OPTIONS.category}
                  onChange={(value) => handleFilterChange("category", value)}
                />

                <FilterSelect
                  label="Subcategory"
                  icon={IconTag}
                  value={filters.subcategory}
                  options={FILTER_OPTIONS.subcategory}
                  onChange={(value) => handleFilterChange("subcategory", value)}
                />

                <FilterSelect
                  label="Status"
                  icon={IconCheck}
                  value={filters.status}
                  options={FILTER_OPTIONS.status}
                  onChange={(value) => handleFilterChange("status", value)}
                />

                <FilterSelect
                  label="Badge"
                  icon={IconTag}
                  value={filters.badge}
                  options={FILTER_OPTIONS.badge}
                  onChange={(value) => handleFilterChange("badge", value)}
                />
              </div>

              {activeFilterCount > 0 && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                  <p className="text-xs text-slate-500">
                    {activeFilterCount} filter
                    {activeFilterCount > 1 ? "s" : ""} applied
                  </p>

                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-950"
                  >
                    <IconX size={14} />
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Product
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Price
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Discount
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Offer Price
                </th>

                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visibleProducts.length > 0 ? (
                visibleProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    formatPrice={formatPrice}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <IconAlertCircle size={23} className="text-slate-400" />
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-800">
                        No products found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>

                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="mt-4 text-sm font-semibold text-slate-900 underline underline-offset-4"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs text-slate-500 sm:text-sm">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredProducts.length === 0
                ? 0
                : (page - 1) * productsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(page * productsPerPage, filteredProducts.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconChevronLeft size={18} />
            </button>

            <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-2 text-xs font-semibold text-white">
              {page}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  iconClassName = "text-slate-600",
  iconBackgroundClassName = "bg-slate-100",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            {label}
          </p>

          <p className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {value.toLocaleString("en-IN")}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBackgroundClassName}`}
        >
          <Icon size={20} stroke={2} className={iconClassName} />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, icon: Icon, value, options, onChange }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <Icon size={14} stroke={2} />
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <IconChevronDown
          size={16}
          stroke={2}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

function ProductRow({ product, formatPrice, onEdit, onDelete }) {
  const isActive = product.status === "Active";

  return (
    <tr className="group transition-colors hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <img
              src={product.imageOne}
              alt={product.name}
              className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0">
            <p className="max-w-[230px] truncate text-sm font-semibold text-slate-800">
              {product.name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {product.stock} units in stock
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <p className="text-sm font-medium text-slate-700">{product.category}</p>

        <p className="mt-0.5 text-xs text-slate-400">{product.subcategory}</p>
      </td>

      <td className="px-4 py-4">
        <span className="text-sm font-semibold text-slate-800">
          {formatPrice(product.price)}
        </span>
      </td>

      <td className="px-4 py-4">
        {product.discount > 0 ? (
          <span className="inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            {product.discount}% OFF
          </span>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        )}
      </td>

      <td className="px-4 py-4">
        <span className="text-sm font-bold text-slate-900">
          {formatPrice(product.offerPrice)}
        </span>
      </td>

      <td className="px-4 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />

          {product.status}
        </span>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(product)}
            aria-label={`Edit ${product.name}`}
            title="Edit product"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <IconEdit size={17} stroke={2} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
            aria-label={`Delete ${product.name}`}
            title="Delete product"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            <IconTrash size={17} stroke={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}
