"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebouncedSearch } from "@/hooks/useHelpers";
import { useGetAllProductsSettings, useDeleteProductByIdSettings } from "@/features/useProducts";
import { ProductEntity } from "@/types/models";
import Product from "./Product";
import Loading from "./Loading";
import Contents from "../Contents";
import CustomButton from "@/libraries/forms/components/Button";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { ID } from "@/types/global";

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { showWarning } = useAppContext();

  const { search, setSearch, debouncedSearch } = useDebouncedSearch();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, refetch, } = useGetAllProductsSettings(20, debouncedSearch);

  const { mutate: deleteProduct, isPending: isDeletePending } = useDeleteProductByIdSettings();
  const products = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data.items ?? []) ?? [];
  }, [data]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const goToAdd = () => router.push("products/add");
  const goToEdit = (id: ID) => router.push(`products/edit/${id}`);
  const goToView = (id: ID) => router.push(`products/${id}`)

  const executeDelete = (product: ProductEntity) => {
    showWarning({
      message: `هل أنت متأكد من حذف المنتج "${product.title}" نهائياً من المخازن؟`,
      btn1: "إغلاق",
      btn2: "حذف نهائي",
      handleBtn2: () => deleteProduct(product.id),
    });
  };

  useEffect(() => {
    if (!loadMoreRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        rootMargin: "250px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="flex flex-col space-y-4 w-full h-full">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 max-w-[350px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن اسم قطعة، كود، أو خامة معينة..."
            className="h-10 w-full rounded-lg border border-background2 bg-card pl-3 pr-10 text-sm outline-none transition focus:border-accent font-sans text-text placeholder:text-text/40"
          />
          <Search className="w-4 h-4 text-text/40 absolute top-3 right-3" />
        </div>

        <CustomButton
          label="إضافة منتج جديد"
          icon={Plus}
          className="w-fit rounded-md "
          iconClassName="w-4 h-4 text-accent"
          onClick={goToAdd}
        />
      </div>

      <Contents
        Skeletons={<Loading />}
        isEmpty={products.length === 0}
        emptyTitle="لا توجد منتجات مطابقة للبحث"
        emptyDesc="يمكنك البدء بإضافة قطع أزياء أو خامات أقمشة وتخصيص أسعارها لفئات الجملة والمفرق."
        isError={isError}
        errorTitle="خطأ من خادم المنتجات"
        errorDesc="حدثت مشكلة أثناء تحميل المنتجات المعروضة. يرجى المحاولة لاحقاً."
        errorActionTitle="إعادة المحاولة"
        errorAction={refetch}
        isLoading={isLoading}
      >
        <div ref={containerRef} className="flex-1 overflow-y-auto px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-4 gap-5 max-h-[calc(100vh-185px)]">
            {products.map((productItem: ProductEntity) => (
              <Product
                key={`product-${productItem.id}`}
                product={productItem}
                onDelete={() => executeDelete(productItem)}
                isDeleting={isDeletePending}
                onEdit={() => goToEdit(productItem.id)}
                onView={() => goToView(productItem.id)}
              />
            ))}
          </div>

          <div ref={loadMoreRef} className="w-full py-6 flex items-center justify-center">
            {isFetching && hasNextPage && (
              <div className="flex items-center gap-2 text-xs font-sans text-accent">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري كشف المزيد من الأزياء الفاخرة...</span>
              </div>
            )}
          </div>
        </div>
      </Contents>
    </div>
  );
};

export default ProductsPage;