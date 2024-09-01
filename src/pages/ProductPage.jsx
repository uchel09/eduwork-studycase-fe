import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import HeaderC from "../components/Layouts/HeaderC";
import styles from "../styles/style";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Layouts/Footer";
import Pagination from "../components/paginate-button/myPaginationButton";
import { getProductsTest } from "../store/actions/productAct";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loadingProducts, totalPages } = useSelector(
    (state) => state.product
  );

  const [selectedTags, setSelectedTags] = useState(
    searchParams.getAll("tags[]") || []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.getAll("categories[]") || []
  );
  const [skip, setSkip] = useState(parseInt(searchParams.get("page")) || 0);
  const [q, setQ] = useState(searchParams.get("q") || "");

  // Update searchParams when state changes
  useEffect(() => {
    const params = {
      q,
      page: skip,
      "tags[]": selectedTags,
      "categories[]": selectedCategories,
    };
    setSearchParams(params);
  }, [q, skip, selectedTags, selectedCategories]);

  useEffect(() => {
    dispatch(
      getProductsTest({
        tags: selectedTags,
        category: selectedCategories,
        skip: skip,
        limit: 3,
        q: q,
      })
    );
  }, [dispatch, selectedTags, selectedCategories, skip, q]);

  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    setSkip(0);
    setQ("");
  };

  const handleCategoryClick = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    setSkip(0);
    setQ("");
  };

  const isCtgInCategories = (ctg) => selectedCategories.includes(ctg);
  const isTagInTags = (tag) => selectedTags.includes(tag);

  return (
    <main className="h-[100vh]">
      <div className="h-[100vh] overflow-y-auto">
        <HeaderC
          handleCategoryClick={handleCategoryClick}
          handleTagClick={handleTagClick}
          isCtgInCategories={isCtgInCategories}
          isTagInTags={isTagInTags}
          setQ={setQ}
        />

        <br />
        <br />
        <section className={`${styles.section}`}>
          {loadingProducts && (
            <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12">
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
              <ProductCard.Skeleton />
            </div>
          )}
          {!loadingProducts && (
            <>
              <div className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12">
                {products &&
                  products.length > 0 &&
                  products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
              </div>
              {products && products.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>
              ) : null}
            </>
          )}
        </section>

        {products.length > 0 && !loadingProducts && totalPages && (
          <Pagination
            totalPages={totalPages}
            currentPage={skip}
            onPageChange={(page) => setSkip(page)}
            showPrevButton={true}
            showNextButton={true}
          />
        )}
        <Footer />
      </div>
    </main>
  );
};

export default ProductPage;
