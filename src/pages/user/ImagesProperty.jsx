import { useEffect, useState } from "react";
import { getImagesProperty } from "../../utils/api";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImagesProperty.scss";

const ImagesProperty = ({ propertyId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImagesForProperty = async (propertyId) => {
    if (!propertyId) return;
    setLoading(true);
    try {
      const res = await getImagesProperty(propertyId);
      if (res.errCode === 0) {
        // chuyển data API -> format của react-image-gallery
        const galleryImages = res.data.map((img) => ({
          original: img.url,    // ảnh chính
          thumbnail: img.url,   // thumbnail
        }));
        setImages(galleryImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesForProperty(propertyId);
  }, [propertyId]);

  if (loading) {
    return (
      <div className="images-loading">
        <div className="loading-skeleton">
          <div className="skeleton-main"></div>
          <div className="skeleton-thumbnails">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton-thumb"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="images-property-container">
      {images.length > 0 ? (
        <div className="image-gallery-wrapper">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={true}
            slideInterval={3000}
            showThumbnails={true}
            thumbnailPosition="bottom"
            useBrowserFullscreen={true}
          />
          <div className="image-count">
            <i className="fa-solid fa-images"></i>
            <span>{images.length} ảnh</span>
          </div>
        </div>
      ) : (
        <div className="no-images">
          <div className="no-images-icon">
            <i className="fa-solid fa-image"></i>
          </div>
          <p>Không có ảnh cho khách sạn này</p>
        </div>
      )}
    </div>
  );
};

export default ImagesProperty;