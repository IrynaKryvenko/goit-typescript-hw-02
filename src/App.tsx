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
  const [error, setError] = useState<unknown>(null); // maybe other type
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isShowBtnLoadMore, setIsShowBtnLoadMore] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageCard, setImageCard] = useState<Img | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetchImgs = async () => {
      setLoading(true);
      try {
        const { results, total_pages } = await getImgs(query, page);

        if (!results.length) {
          return setIsEmpty(true);
        }
        setImgs((prevImgs) => [...prevImgs, ...results]);
        setIsShowBtnLoadMore(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImgs();
  }, [page, query]);

  const handleSubmitSearchBar: SubmitSearchBar = (querySearchBar) => {
    if (!querySearchBar.trim()) return;

    setQuery(querySearchBar);
    setImgs([]);
    setPage(1);
    setError(null);
    setIsShowBtnLoadMore(false);
    setIsEmpty(false);
  };

  const handleClickLoadMoreBtn: ClickLoadMoreBtn = (heightForScroll) => {
    setTimeout(() => {
      window.scrollBy({
        top: heightForScroll,
        behavior: "smooth",
      });
    }, 1300);
    return setPage((prevPage) => prevPage + 1);
  };

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

      {imgs.length > 0 && <ImageGallery imgs={imgs} openModal={openModal} />}

      {loading && <Loader />}

      {error !== null && <ErrorMessage text={"❌ Something went wrong"} />}
      {isEmpty && <ErrorMessage text={"Sorry. There are no images ... 😭"} />}

      {isShowBtnLoadMore && (
        <LoadMoreBtn onClick={handleClickLoadMoreBtn} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </LoadMoreBtn>
      )}

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