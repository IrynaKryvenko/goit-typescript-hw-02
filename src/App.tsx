import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { getImgs } from "./js/unsplash-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import {
  ClickLoadMoreBtn,
  CloseModal,
  Img,
  OpenModal,
  SubmitSearchBar,
} from "./types";

const App = function () {
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [imgs, setImgs] = useState<Img[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isShowBtnLoadMore, setIsShowBtnLoadMore] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageCard, setImageCard] = useState<Img | null>(null);

  // Fetch images when query or page changes
  useEffect(() => {
    if (!query) return;
    const fetchImgs = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      try {
        const { results, total_pages } = await getImgs(query, page);

        if (!results.length) {
          setIsEmpty(true);
          return;
        }

        setImgs((prevImgs) => [...prevImgs, ...results]);
        setIsShowBtnLoadMore(page < total_pages);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImgs();
  }, [page, query]);

  // Handle search bar submission
  const handleSubmitSearchBar: SubmitSearchBar = (querySearchBar) => {
    if (!querySearchBar.trim()) return;
    setQuery(querySearchBar);
    setImgs([]); // Clear images for new search
    setPage(1);
    setError(null);
    setIsShowBtnLoadMore(false);
    setIsEmpty(false);
  };

  // Handle "load more" button click
  const handleClickLoadMoreBtn: ClickLoadMoreBtn = (heightForScroll) => {
    setTimeout(() => {
      window.scrollBy({
        top: heightForScroll,
        behavior: "smooth",
      });
    }, 1300);
    setPage((prevPage) => prevPage + 1);
  };

  // Open and close modal
  const openModal: OpenModal = (image) => {
    setImageCard(image);
    setShowModal(true);
    document.body.classList.add("modalIsOpen");
  };

  const closeModal: CloseModal = () => {
    setImageCard(null);
    setShowModal(false);
    document.body.classList.remove("modalIsOpen");
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmitSearchBar} />

      {/* Render image gallery */}
      {imgs.length > 0 && <ImageGallery imgs={imgs} openModal={openModal} />}

      {/* Render loader while fetching */}
      {loading && <Loader />}

      {/* Render error message if any */}
      {error && <ErrorMessage text="❌ Something went wrong" />}
      
      {/* Render empty message if no images found */}
      {isEmpty && <ErrorMessage text="Sorry. There are no images ... 😭" />}

      {/* Render "Load More" button */}
      {isShowBtnLoadMore && (
        <LoadMoreBtn onClick={handleClickLoadMoreBtn} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </LoadMoreBtn>
      )}

      {/* Render modal */}
      {showModal && imageCard && (
        <ImageModal
          showModal={showModal}
          closeModal={closeModal}
          image={imageCard}
        />
      )}
    </>
  );
};

export default App;
