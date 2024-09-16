import { Img, OpenModal } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  imgs: Img[];
  openModal: OpenModal;
}

const ImageGallery = function ({ imgs, openModal }: ImageGalleryProps) {
  return (
    <ul className={css.galleryList}>
      {imgs.map((image) => (
        <ImageCard key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;